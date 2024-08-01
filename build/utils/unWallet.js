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
exports.verifySignature = void 0;
const ethers_1 = __importDefault(require("ethers"));
const verifySignature = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = new ethers_1.default.Contract(dto.walletAddress, [
        {
            inputs: [
                {
                    internalType: "bytes32",
                    name: "hash",
                    type: "bytes32",
                },
                {
                    internalType: "bytes",
                    name: "signature",
                    type: "bytes",
                },
            ],
            name: "isValidSignature",
            outputs: [
                {
                    internalType: "bytes4",
                    name: "",
                    type: "bytes4",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
    ], new ethers_1.default.JsonRpcProvider("url"));
    try {
        yield contract.isValidSignature(dto.digest, dto.signature);
    }
    catch (e) {
        console.log("invalid");
        return false;
    }
    console.log("valid");
    return true;
});
exports.verifySignature = verifySignature;
