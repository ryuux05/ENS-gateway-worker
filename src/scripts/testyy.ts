import { ethers } from 'ethers';

const name: string = 'sub1.alice.eth';
const encodedName: Uint8Array = ethers.utils.toUtf8Bytes(name);
const data: string = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes'], [encodedName, '0x']);

console.log('Encoded data:', data);
