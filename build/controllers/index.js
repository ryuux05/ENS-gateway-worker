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
const history_service_1 = require("../service/history.service");
const unWallet_1 = require("../utils/unWallet");
let service = new history_service_1.HistoryService();
const serverHealthCheck = (req, res, next) => {
    return res.status(200).json({
        message: "server running ok",
    });
};
const registerSuccesfullTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historyDto = req.body;
        console.log(historyDto);
        yield service.registerUserHistory(historyDto);
        return res.status(201).json({
            message: "Transaction registered successfully",
        });
    }
    catch (error) {
        console.error("Error registering transaction:", error);
        return res.status(500).json({
            message: "Error registering transaction",
            error: error.message,
        });
    }
});
const getUserPaymentHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const walletAddress = req.query.walletAddress;
        const anken = req.query.anken;
        console.log(walletAddress);
        // if (!walletAddress || !anken) {
        //     return res.status(404).send("No history found")
        // }
        const history = yield service.getUserHistory(walletAddress, anken);
        console.log(history);
        return res.status(201).send(history);
    }
    catch (error) {
        console.error("Error getting transaction:", error);
        return res.status(500).json({
            message: "Error getting transaction",
            error: error.message,
        });
    }
});
const getUserPaymentHistoryWithSignature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const walletAddress = req.query.walletAddress;
        const anken = req.query.anken;
        const dto = req.body;
        console.log(walletAddress);
        // if (!walletAddress || !anken) {
        //     return res.status(404).send("No history found")
        // }
        const valid = yield (0, unWallet_1.verifySignature)(dto);
        if (!valid) {
            return res.status(500).json({
                message: "Signature is not valid",
            });
        }
        const history = yield service.getUserHistory(walletAddress, anken);
        console.log(history);
        return res.status(201).send(history);
    }
    catch (error) {
        console.error("Error getting transaction:", error);
        return res.status(500).json({
            message: "Error getting transaction",
            error: error.message,
        });
    }
});
exports.default = {
    serverHealthCheck,
    registerSuccesfullTransaction,
    getUserPaymentHistory,
    getUserPaymentHistoryWithSignature,
};
