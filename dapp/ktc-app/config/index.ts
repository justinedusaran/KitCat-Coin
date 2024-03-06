import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x7247EdDBB2591C9E12cd238F8492FFeBA04f2fd1",
        abi as any,
        signer
    );
}