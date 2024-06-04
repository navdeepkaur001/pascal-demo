import Web3 from "web3";
import { REDMARS_CONTRACT_ADDRESS, RPC_URL } from "../constant";
import redmarsDynamicAbi from "../Abis/DynamicAbi.json";
import redmarsAbi from "../Abis/RedmarsAbi.json";
import { provider } from "../redux/action/wallectConnectProvider";

/**
 * Variable declarations
 */
let web3Instance, redmarsDynamicInstance, redmarsContractInstance;



//Create web3 instace
const globalGetInstanceHandler = async () => {
  const { ethereum } = window;
  web3Instance = new Web3(ethereum);

  redmarsDynamicInstance = new web3Instance.eth.Contract(
    redmarsDynamicAbi,
    REDMARS_CONTRACT_ADDRESS
  );

  redmarsContractInstance = new web3Instance.eth.Contract(
    redmarsAbi,
    REDMARS_CONTRACT_ADDRESS
  );
};

globalGetInstanceHandler();

//dynamic abi instance for redmars
const redmarsDynamicInstanceHandler = async (walletType) => {
  try {
    if (walletType === "METAMASK") {
      let initInstance = await new Web3(window.ethereum);
      return await new initInstance.eth.Contract(
        redmarsDynamicAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else if (walletType === "BINANCE") {
      let initInstance = await new Web3(RPC_URL);
      return await new initInstance.eth.Contract(
        redmarsDynamicAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else if (walletType === "WALLETCONNECT") {
      let initInstance = await new Web3(provider);
      return await new initInstance.eth.Contract(
        redmarsDynamicAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else if (walletType === "TRUSTWALLET") {
      let initInstance = await new Web3(window.ethereum);
      return await new initInstance.eth.Contract(
        redmarsDynamicAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else {
      if (redmarsDynamicInstance) {
        return redmarsDynamicInstance;
      }
    }
  } catch (err) {
    console.log("Error on redmarsDynamicInstanceHandler", err);
    throw new Error("Error on redmarsDynamicInstanceHandler");
  }
};

//Instance for redmars contract
const redmarsContractInstanceHandler = async (walletType) => {
  try {
    if (walletType === "METAMASK") {
      let initInstance = await new Web3(window.ethereum);
      return await new initInstance.eth.Contract(
        redmarsAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else if (walletType === "BINANCE") {
      let initInstance = await new Web3(window.BinanceChain);
      return await new initInstance.eth.Contract(
        redmarsAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else if (walletType === "WALLETCONNECT") {
      let initInstance = await new Web3(provider);
      return await new initInstance.eth.Contract(
        redmarsAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else if (walletType === "TRUSTWALLET") {
      let initInstance = await new Web3(window.ethereum);
      return await new initInstance.eth.Contract(
        redmarsAbi,
        REDMARS_CONTRACT_ADDRESS
      );
    } else {
      if (redmarsContractInstance) {
        return redmarsContractInstance;
      }
    }
  } catch (err) {
    console.log("Error on redmarsContractInstanceHandler", err);
    throw new Error("Error on redmarsContractInstanceHandler");
  }
};



export const ContractInstanceHandler = {
	redmarsContractInstanceHandler,
	redmarsDynamicInstanceHandler,
};

