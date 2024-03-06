"use client";
import { BrowserProvider, ethers } from "ethers";
import Image from "next/image";
import cat from "../public/images/cat.png";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };

  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const [mintAmount, setMintAmount] = useState<number>();
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const mintHash = await contract.mint(signer, mintAmount);
      await mintHash.wait();
      setSubmitted(true);
      setTransactionHash(mintHash.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintAmount(0);
    }
  };

  const [stakeAmount, setStakeAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const stakeHash = await contract.stake(stakeAmount);
      await stakeHash.wait();
      setSubmitted(true);
      setTransactionHash(stakeHash.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakeAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakeAmount(0);
    }
  };

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const withdrawHash = await contract.withdraw();
      await withdrawHash.wait();
      setSubmitted(true);
      setTransactionHash(withdrawHash.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Withdraw failed: ${decodedError?.args}`);
    }
  };

  const importToken = async () => {
    const { ethereum } = window as any;
    const ktcAddress = "0x7247EdDBB2591C9E12cd238F8492FFeBA04f2fd1";
    const ktcSymbol = "KTC";
    const ktcDecimal = 18;
    const ktcImage = cat;

    try {
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: ktcAddress,
            symbol: ktcSymbol,
            decimals: ktcDecimal,
            image: ktcImage,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [ktcBalance, setKtcBalance] = useState<number>();
  useEffect(() => {
    const fetchKtcBalance = async () => {
      const { ethereum } = window as any;
      if (ethereum && ethereum.isConnected()) {
        const provider = new BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = getContract(signer);
        const balance = await contract.balanceOf(await signer.getAddress());
        setKtcBalance(balance.toString());
      }
    };

    fetchKtcBalance();
  }, []);

  return (
    <main style={{ paddingBottom: "150px" }}>
      <div id="navbar">
        <header
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={cat.src as string} alt="Cat" width={80} height={80} />
            <p>{"KITCAT"}</p>
            {ktcBalance && (
              <div
                style={{
                  marginLeft: "10px",
                  background: "pink",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <p style={{ fontSize: "12px", margin: 0 }}>
                  Balance: {ktcBalance}
                </p>
              </div>
            )}
          </div>

          <nav>
            <ul
              style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <li
                style={{
                  marginRight: "20px",
                  fontSize: "16px",
                  position: "relative",
                }}
              >
                <a href="#">WALLET SETUP</a>
              </li>
              <li
                style={{
                  marginRight: "20px",
                  fontSize: "16px",
                  position: "relative",
                }}
              >
                <a href="#mint-stake">MINT AND STAKE</a>
              </li>
              <li
                style={{
                  marginRight: "20px",
                  fontSize: "16px",
                  position: "relative",
                }}
              >
                <a href="#withdraw">WITHDRAW</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "170px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "50px",
          }}
        >
          <h2 style={{ fontWeight: "bold", fontSize: "60px" }}>About KitCat</h2>
          <p
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              textAlign: "justify",
            }}
          >
            KitCat: the purrfect blend of blockchain sweetness and feline charm.
            Inspired by the delectable chocolate KitKat and the irresistible
            allure of cats, KitCat is more than just an ERC20 test token. It is
            a playful adventure into the world of decentralized delights.
            Embrace the whisker-twitching joy of digital currencies with a twist
            of chocolatey whimsy and a sprinkle of meowgical charm. Because in
            the world of KitCat, every transaction is a treat and every investor
            is a friend. Unleash the purrfectly delightful world of KitCat
            today!
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid #ffb3c6",
              padding: "50px",
              borderRadius: "8px",
              backgroundColor: "#ffccd5",
              height: "400px",
            }}
          >
            <p
              style={{
                marginBottom: "40px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              WALLET SETUP
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => {
                  connectWallet();
                }}
                className="p-8 bg-rose-500 text-white rounded"
                style={{ marginBottom: "10px", width: "300px" }}
              >
                {walletKey !== "" ? walletKey : "Connect Wallet"}
              </button>
              <button
                onClick={importToken}
                className="p-8 bg-rose-600 text-white rounded"
                style={{ width: "300px" }}
              >
                Import Coin
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mint-stake"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <div
          style={{
            border: "1px solid #ffb3c6",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            width: "650px",
            backgroundColor: "#ffccd5",
            height: "390px",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            MINTING AND STAKING AREA
          </p>

          <div style={{ marginBottom: "10px" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label style={{ marginRight: "150px" }}>Mint</label>
              <input
                type="number"
                value={mintAmount}
                onChange={(e) => mintAmountChange(e)}
                style={{
                  color: "black",
                  marginBottom: "10px",
                  height: "50px",
                  textAlign: "center",
                }}
              />
            </form>
            <button
              onClick={() => {
                mintCoin();
              }}
              className="p-2 bg-rose-700 text-white rounded"
              style={{ fontSize: "14px", width: "150px" }}
            >
              {"Mint Coin"}
            </button>
          </div>

          <div>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label style={{ marginRight: "140px" }}>Stake</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => stakeAmountChange(e)}
                style={{
                  color: "black",
                  marginBottom: "10px",
                  height: "50px",
                  textAlign: "center",
                }}
              />
            </form>
            <button
              onClick={stakeCoin}
              className="p-2 bg-rose-700 text-white rounded"
              style={{ fontSize: "14px", width: "150px" }}
            >
              {"Stake Coin"}
            </button>
          </div>
        </div>
      </div>

      <div
        id="withdraw"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <div
          style={{
            border: "1px solid #ffb3c6",
            padding: "45px",
            borderRadius: "8px",
            textAlign: "center",
            width: "650px",
            backgroundColor: "#ffccd5",
            height: "300px",
          }}
        >
          <p style={{ fontSize: "32px", fontWeight: "bold" }}>WITHDRAW AREA</p>
          <p style={{ marginBottom: "30px" }}>
            Transaction may take a while. Kindly wait...
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={withdrawCoin}
              className="p-8 bg-rose-400 text-white rounded"
              style={{ fontSize: "18px", width: "200px" }}
            >
              {"Withdraw"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
