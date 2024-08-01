import { historyDto } from "../dtos/history.dto";
import { userHistory } from "../models/userHistory";
import { HistoryRepository } from "../repositories/historyRepository";

export class HistoryService {
  private historyRepository: HistoryRepository;

  constructor() {
    this.historyRepository = new HistoryRepository();
  }

  async getUserHistory(
    walletAddress: string,
    anken: string
  ): Promise<userHistory[]> {
    return await this.historyRepository.getUserHistory(walletAddress, anken);
  }

  async registerUserHistory(historyDto: historyDto): Promise<void> {
    //Add validation logic
    return await this.historyRepository.registerUserHistory(historyDto);
  }
}
