import { ethers } from 'ethers';
import { verifySignatureDto } from "../dtos/verifySignature.dto";

export const verifySignature = async (
  dto: verifySignatureDto
): Promise<boolean> => {
  console.log(dto);
  const contract = new ethers.Contract(
    dto.walletAddress,
    [
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
    ],
    new ethers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/4d20e55995f54fabb320dec99707071b")
  );

  try {
    await contract.isValidSignature(dto.digest, dto.signature);
  } catch (e) {
    console.log("invalid");
    return false;
  }

  console.log("valid");
  return true;
};
