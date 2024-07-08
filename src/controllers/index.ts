
import { NextFunction, Request, Response } from 'express';
import { historyDto } from '../dtos/history.dto';
import  { HistoryService }  from '../service/history.service';

let service = new HistoryService()
const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'server running ok'
    });
};

const registerSuccesfullTransaction = async (req: Request, res: Response,) => {
   try {
        const historyDto: historyDto = req.body;
        console.log(historyDto);
        await service.registerUserHistory(historyDto);
        return res.status(201).json({
            message: 'Transaction registered successfully',
        });
    } catch (error) {
        console.error('Error registering transaction:', error);
        return res.status(500).json({
            message: 'Error registering transaction',
            error: error.message,
        });
    }
}

const getUserPaymentHistory = async (req: Request, res: Response) => {
    try{
        const walletAddress: string = req.query.walletAddress as string;
        console.log(walletAddress);
        const history = await service.getUserHistory(walletAddress);
        console.log(history);
        return res.status(201).send(history);
    } catch(error) {
        console.error('Error getting transaction:', error);
        return res.status(500).json({
            message: 'Error getting transaction',
            error: error.message,
        });
    }

}


export default { 
    serverHealthCheck,
    registerSuccesfullTransaction,
    getUserPaymentHistory
};