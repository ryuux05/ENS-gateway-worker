import { NextFunction, Request, Response } from "express";
import { historyDto } from "../dtos/history.dto";
import { HistoryService } from "../service/history.service";
import { walletSignature } from "../dtos/walletSignature.dto";
import { verifySignature } from "../utils/unWallet";
import { verifySignatureDto } from "../dtos/verifySignature.dto";

let service = new HistoryService();
const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "server running ok",
  });
};

const registerSuccesfullTransaction = async (req: Request, res: Response) => {
  try {
    const historyDto: historyDto = req.body;
    console.log(historyDto);
    await service.registerUserHistory(historyDto);
    return res.status(201).json({
      message: "Transaction registered successfully",
    });
  } catch (error) {
    console.error("Error registering transaction:", error);
    return res.status(500).json({
      message: "Error registering transaction",
      error: error.message,
    });
  }
};

const getUserPaymentHistory = async (req: Request, res: Response) => {
  try {
    const walletAddress: string = req.query.walletAddress as string;
    const anken: string = req.query.anken as string;
    console.log(walletAddress);
    // if (!walletAddress || !anken) {
    //     return res.status(404).send("No history found")
    // }

    const history = await service.getUserHistory(walletAddress, anken);
    console.log(history);
    return res.status(201).send(history);
  } catch (error) {
    console.error("Error getting transaction:", error);
    return res.status(500).json({
      message: "Error getting transaction",
      error: error.message,
    });
  }
};

const getUserPaymentHistoryWithSignature = async (
  req: Request,
  res: Response
) => {
  try {
    const walletAddress: string = req.query.walletAddress as string;
    const anken: string = req.query.anken as string;
    const dto: verifySignatureDto = req.body;
    console.log(walletAddress);
    // if (!walletAddress || !anken) {
    //     return res.status(404).send("No history found")
    // }
    const valid = await verifySignature(dto);
    if (!valid) {
      return res.status(500).json({
        message: "Signature is not valid",
      });
    }
    const history = await service.getUserHistory(walletAddress, anken);
    console.log(history);
    return res.status(201).send(history);
  } catch (error) {
    console.error("Error getting transaction:", error);
    return res.status(500).json({
      message: "Error getting transaction",
      error: error.message,
    });
  }
};

export default {
  serverHealthCheck,
  registerSuccesfullTransaction,
  getUserPaymentHistory,
  getUserPaymentHistoryWithSignature,
};
