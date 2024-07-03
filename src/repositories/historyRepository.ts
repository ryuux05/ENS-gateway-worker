
import { historyDto } from "../dtos/history.dto";
import { userHistory } from "../models/userHistory";
import prisma from "../utils/Prisma/db";

export class HistoryRepository {
    constructor(
    ){}

    async registerUserHistory(historyDto: historyDto): Promise<void> {
        try{
            const history = await prisma.userHistory.create({
                data:{
                    walletAddress: historyDto.walletAddress,
                    name: historyDto.item_name,
                    price: +historyDto.price,
                    oneShotUrl: historyDto.oneShotUrl
                }
            })   
        } catch(error) {
            console.log("Error when register user history ");
            throw error;
        }
    }
    async getUserHistory(walletAddress: string): Promise<userHistory[]> {
        try {

            const history = await prisma.userHistory.findMany({
                where:{
                    walletAddress: walletAddress
                },
                select:{
                    name: true,
                    price: true,
                    oneShotUrl: true,
                    created_at: true
                }
            });
            console.log(history);
            return history;
        } catch( error ) {
            console.log("Error when getting user history "); 
            throw error;
        }
        
    }
}
