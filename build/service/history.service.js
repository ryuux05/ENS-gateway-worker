"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const historyRepository_1 = require("../repositories/historyRepository");
class HistoryService {
    constructor() {
        this.historyRepository = new historyRepository_1.HistoryRepository();
    }
    getUserHistory(walletAddress, anken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.historyRepository.getUserHistory(walletAddress, anken);
        });
    }
    registerUserHistory(historyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            //Add validation logic
            return yield this.historyRepository.registerUserHistory(historyDto);
        });
    }
}
exports.HistoryService = HistoryService;
