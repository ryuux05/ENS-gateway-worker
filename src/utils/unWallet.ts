import ethers from "ethers";
import { verifySignatureDto } from "../dtos/verifySignature.dto";

export const verifySignature = async (
  dto: verifySignatureDto
): Promise<boolean> => {
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
    new ethers.JsonRpcProvider("url")
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
