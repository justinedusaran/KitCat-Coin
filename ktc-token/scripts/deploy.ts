import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("KTC", ["0xddae93c5aE62BAf023ACd348662F13c98f8d0731"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});