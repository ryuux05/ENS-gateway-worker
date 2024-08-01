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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const db_1 = __importDefault(require("../utils/Prisma/db"));
class HistoryRepository {
    constructor() { }
    registerUserHistory(historyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const history = yield db_1.default.userHistory.create({
                    data: {
                        walletAddress: historyDto.walletAddress,
                        name: historyDto.name,
                        price: +historyDto.price,
                        oneShotUrl: historyDto.oneShotUrl,
                        project: historyDto.anken,
                    },
                });
            }
            catch (error) {
                console.log("Error when register user history ");
                throw error;
            }
        });
    }
    getUserHistory(walletAddress, anken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const history = yield db_1.default.userHistory.findMany({
                    where: {
                        walletAddress: walletAddress,
                        project: anken,
                    },
                    select: {
                        name: true,
                        price: true,
                        oneShotUrl: true,
                        created_at: true,
                        project: true,
                    },
                });
                console.log(history);
                return history;
            }
            catch (error) {
                console.log("Error when getting user history ");
                throw error;
            }
        });
    }
}
exports.HistoryRepository = HistoryRepository;
