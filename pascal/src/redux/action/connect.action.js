import Web3 from "web3";
import { Web3Service } from "../../CommonServices/web3.service";
import { switchNetwork } from "../../CommonServices/CustomNetworkService";
import * as Session from "../../utils/session";
import { provider } from "./wallectConnectProvider";
import {
  NETWORK_CHAIN_ID,
  adminRootName,
  publicAdminRootName,
} from "../../constant";

/**
 * export type here
 */
export const METAMASK_ADDRESS = "METAMASK_ADDRESS";
export const IS_LOGIN = "IS_LOGIN";

export const isMetaMaskInstalled = async () => {
  const { ethereum, web3 } = window;
  const result = Boolean(ethereum && ethereum.isMetaMask);
  if (result) {
    return "metamask";
  } else if (web3) {
    return "trustwallet";
  } else {
    return "none";
  }
};

const isWalletInstalled = async (type) => {
  const { BinanceChain, web3, ethereum } = window;
  let result = false;
  if (type === "METAMASK") {
    const isInstalled = Boolean(ethereum && ethereum.isMetaMask);
    if (isInstalled) {
      result = type;
    }
  } else if (type === "BINANCE") {
    const isInstalled = Boolean(
      BinanceChain && (await BinanceChain.isConnected())
    );

    if (isInstalled) {
      result = type;
    }
  }
  if (result === "BINANCE") {
    return "BINANCE_WALLET";
  } else if ("METAMASK") {
    return "METAMASK_WALLET";
  } else if (ethereum || web3 || BinanceChain) {
    return "TRUST_WALLET";
  }
};

export const connectWithWallet = (type) => async (dispatch) => {
  const isInstalled = await isWalletInstalled(type);
  try {
    const { ethereum, BinanceChain } = window;
    let web3Instance = new Web3(ethereum);
    let chainId = await web3Instance.eth.getChainId();

    if (chainId !== Number(NETWORK_CHAIN_ID)) {
      let res = await switchNetwork();
      if (res) {
        alert("Binance network added successfully.Please connect now.");
        //window.location.reload();
      }
      // window.location.reload();
    } else {
      let address;
      if (isInstalled === "BINANCE_WALLET") {
        address = await Web3Service.getAccount(type);

        await BinanceChain.on("accountsChanged", async function (accounts) {
          address = accounts[0];
          let path = window.location.pathname.indexOf("admin");
          if (path === 1) {
            dispatch({ type: METAMASK_ADDRESS, payload: "" });
            window.location.replace("/admin/login");
          } else {
            dispatch({ type: METAMASK_ADDRESS, payload: address });
          }
          window.location.reload();
        });
      } else if (isInstalled === "METAMASK_WALLET") {
        address = await Web3Service.getAccount(type);
        await ethereum.on("accountsChanged", async function (accounts) {
          address = accounts[0];
          let path = window.location.pathname.indexOf("admin");
          if (path === 1) {
            dispatch({ type: METAMASK_ADDRESS, payload: "" });
            window.location.replace("/admin/login");
          } else {
            dispatch({ type: METAMASK_ADDRESS, payload: address });
          }
          window.location.reload();
        });

        dispatch({ type: METAMASK_ADDRESS, payload: address });
      } else if (isInstalled === "TRUST_WALLET") {
        const result = Boolean(
          (ethereum && ethereum.isMetaMask) || BinanceChain
        );
        if (!result) {
          const web3 = await new Web3(window.web3.currentProvider);
          const accounts = await web3.eth.getAccounts();
          address = accounts[0];
          dispatch({ type: METAMASK_ADDRESS, payload: address });
        }
      } else if (type === "WALLETCONNECT") {
        address = await Web3Service.getAccount(type);
      }
      // console.log("outer address", address);
      dispatch({ type: METAMASK_ADDRESS, payload: address });
      if (address) {
        return address;
      } else {
        return address;
      }
    }
  } catch (error) {
    return error;
  }
};

export const disconnectAddress = () => async (dispatch, getState) => {
  try {
    let type = Session.getLoginSession();
    if (type === "WALLETCONNECT") {
      await provider.disconnect();
    }
    dispatch({ type: METAMASK_ADDRESS, payload: "" });
  } catch (error) {
    ////console.log(error)
    return error;
  }
};

/**
 * to handle the login status
 * @param {*} status
 * @returns
 */

export const setLoginStatus = (status) => async(dispatch) => {
	dispatch({ type: IS_LOGIN, payload: status });
};
