import Web3 from "web3";
import { toast } from "../Components/Toast/Toast";
import { provider } from "../redux/action/wallectConnectProvider";

/**
 * @function: callWeb3
 * @returns
 */

const callWeb3 = async (type) => {
	try {
		const { BinanceChain, ethereum } = window;
		let web3Object;

		if (type === "BINANCE") {
			if (BinanceChain && (await BinanceChain.isConnected())) {
				web3Object = new Web3(BinanceChain);
			} else {
				toast.info("Please install Binance Chain extention");
			}
		} else if (type === "METAMASK") {
			if (ethereum && ethereum.isMetaMask) {
				web3Object = new Web3(ethereum);
			} else {
				toast.info("Please install metamask extention");
			}
		} else if (ethereum) {
			web3Object = new Web3(ethereum);
		} else if (Web3) {
			web3Object = new Web3(window.web3.currentProvider);
		} else {
			web3Object = new Web3(ethereum);
		}

		return web3Object;
	} catch (error) {
		return error;
	}
};

/**=
 * @function: CallContract
 * @param {JSON Object} abi
 * @param {String} contractAddress
 * @returns
 */

const CallContract = async (walletType, abi, contractAddress) => {
	try {
		let contractObject;
		const web3Object = await callWeb3(walletType);
		contractObject = new web3Object.eth.Contract(abi, contractAddress);
		return contractObject;
	} catch (error) {
		return error;
	}
};

/**
 * @function: web3
 * @returns: web3Oject
 */
const web3 = async () => {
	return await callWeb3();
};

/**
 * @function: isBnbInsstalled
 * @returns  BINANCE_WALLET, TRUST_WALLET, NONE
 */
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

	return "NULL";
};

/*
 * @function: getAccount
 * @returns: account
 */
const getAccount = async (type) => {
	const { BinanceChain, ethereum } = window;
	const result = Boolean((ethereum && ethereum.isMetaMask) || BinanceChain);

	let account;

	if (type === "BINANCE") {
		account = await BinanceChain.enable();
	} else if (!result && type === "TRUST_WALLET") {
		const web3 = await new Web3(window.web3.currentProvider);
		const accounts = await web3.eth.getAccounts();
		let account = accounts[0];
	} else if (type === "WALLETCONNECT") {
		await provider.enable().then((result) => {
			provider.on("accountsChanged", async (accounts) => {
				setTimeout(function () {
					window.location.reload();
				}, 500);
				account = accounts[0];
				return account;
			});
		});

		const accounts = await provider.accounts[0];

		return accounts;
	} else {
		await ethereum.on("accountsChanged", async function (accounts) {
			account = accounts[0];
		});

		account = await ethereum.request({ method: "eth_requestAccounts" });
	}

	return account[0];
};

export const Web3Service = {
	callWeb3,
	CallContract,
	isWalletInstalled,
	getAccount,
	web3,
};
