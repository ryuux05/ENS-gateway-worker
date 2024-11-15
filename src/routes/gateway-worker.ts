import express, { Request, Response } from 'express';
import { Redis } from '@upstash/redis/cloudflare';
import dotenv from 'dotenv';
import logging from "../config/logging";
import { decodeDnsName } from '../utils';
import { ethers } from 'ethers';
import {dataStore} from "../dataStore"

dotenv.config(); // Load environment variables

const router = express.Router();

interface Message {
    sender: string;
    amount: number;
    expired: Date;
    nonce: number;
}

interface DataValue {
    signature: string;
    message: Message;
}


// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

router.post("/register", async(req: Request, res: Response) => {
    try {
        const { key, value } = await req.body;

        // Validate key and value
        if (!key || !value) {
            return res.status(400).json({
            success: false,
            error: 'Key and value are required',
            });
        }
    
         // Ensure that value has the correct structure
        const dataValue: DataValue = value;

        if (!dataValue.signature || !dataValue.message) {
        return res.status(400).json({
            success: false,
            error: 'Value must contain signature and message',
        });
        }

        // Save the value in Redis
        await redis.set(encodeURI(key), JSON.stringify(dataValue));

    
        res.json({
            success: true,
            key,
            value: dataValue,
          });
    } catch (error) {
          res.status(500).json({
            success: false,
            error: String(error),
          });    
    }
})

// Get route
router.get('/get/:key', async (req: Request, res: Response) => {
    try {
      const key = req.params.key;

      const value = await redis.get<string>(encodeURI(key));

      console.log(value);
  
      if (value) {
        // Parse the value back to the DataValue type
        console.log(value);
        res.json({
          success: true,
          key,
          value: value,
        });
      } else {
        res.status(404).json({
          success: false,
          error: 'Key not found',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: String(error),
      });
    }
  });

  router.get('/gateway/:sender/:data', async (req: Request, res: Response) => {
    try {
      const sender = req.params.sender;
      const data = req.params.data;

      console.log("Sender: ", sender);
      console.log("Data: ", data);

      const name = decodeDnsName(Buffer.from(data.slice(2), 'hex'));

      console.log("name: ",name);

    } catch (error) {
      res.status(500).json({
        success: false,
        error: String(error),
      });
    }
  });
  router.post('/gateway/:sender', async (req, res) => {
    try {
      const { sender, data, to } = req.body;
  
      // Validate input
      if (!sender || !data || !to) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      // Decode the callData to extract the name
      // Use ethers.js Interface to decode the data
      const resolverInterface = new ethers.utils.Interface([
        'function resolve(bytes calldata name, bytes calldata data) external view returns (bytes memory)',
      ]);
  
      const decodedData = resolverInterface.decodeFunctionData('resolve', data);
  
      const name = ethers.utils.toUtf8String(decodedData.name);
  
      // Lookup the data in the data store
      const record = dataStore[name];
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      // Return the stored signature and message
      res.json({
        signature: record.signature,
        message: record.message,
      });
    } catch (error) {
      console.error('Error handling resolve request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  

export = router;