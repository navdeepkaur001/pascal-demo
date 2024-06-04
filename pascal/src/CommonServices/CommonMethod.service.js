import { ContractInstanceHandler } from "../CommonServices/Instance.service";
import Web3 from "web3";
import { REDMARS_CONTRACT_ADDRESS, RPC_URL } from "../constant";
import BigNumber from "big-number";
import DYNAMIC_ABI from "../Abis/DynamicAbi.json";
import { provider } from "../redux/action/wallectConnectProvider";
import { TOKENS_TYPE } from "../constant";

const check_interval = async (transactionHash) => {
  let web3Instance = new Web3(provider);
  let self = this;
  let price_checker;
  await clearInterval(price_checker);
  price_checker = setInterval(async function myTimer() {
    var receipt = await web3Instance.eth.getTransactionReceipt(transactionHash);
    if (receipt && receipt.status) {
      await clearInterval(price_checker);
    }
  }, 2000);
};
//get decimals methods

export const getDecimals = async (walletType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsDynamicInstanceHandler(walletType);
      let getDecimals = await contract.methods.decimals().call();
      getDecimals = 10 ** getDecimals;
      resolve(getDecimals);
    } catch (error) {
      console.error("Error on getDecimals", error);
      reject(error);
    }
  });
};

// get balance method

export const getBalance = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      var balance;
      let web3 = new Web3(window.ethereum);
      balance = await web3.eth.getBalance(data.metamaskAddress);
      resolve(balance);
    } catch (error) {
      console.error("Error on getBalance", error);
      reject(error);
    }
  });
};

//allowance method
export const getAllowanceInfo = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contractAddress, web3Instance;
      if (data && data.type === "createIco") {
        let instance;

        if (walletType === "WALLETCONNECT") {
          instance = new Web3(provider);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        } else if (walletType === "METAMASK") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        } else if (walletType === "BINANCE") {
          instance = new Web3(RPC_URL);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        } else if (walletType === "TRUSTWALLET") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        }
        contractAddress = REDMARS_CONTRACT_ADDRESS;
      } else {
        web3Instance =
          await ContractInstanceHandler.redmarsDynamicInstanceHandler(
            walletType
          );
        contractAddress = REDMARS_CONTRACT_ADDRESS;
      }

      let allowance = await web3Instance.methods
        .allowance(data.walletAddress, contractAddress)
        .call();
      resolve(allowance);
    } catch (error) {
      console.error("Error on getAllowanceInfo", error);
      reject(error);
    }
  });
};

//allowance Approval method
export const getAllowanceApproval = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let maxlimit, limit, approval;
      maxlimit = BigNumber(10).power(40);
      limit = maxlimit.toString();

      let contractAddress, web3Instance;
      if (data && data.type === "createIco") {
        let instance;

        if (walletType === "WALLETCONNECT") {
          instance = new Web3(provider);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        } else if (walletType === "METAMASK") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        } else if (walletType === "BINANCE") {
          instance = new Web3(window.BinanceChain);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        } else if (walletType === "TRUSTWALLET") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            data.address
          );
        }
        contractAddress = REDMARS_CONTRACT_ADDRESS;
      } else {
        web3Instance =
          await ContractInstanceHandler.redmarsDynamicInstanceHandler(
            walletType
          );
        contractAddress = REDMARS_CONTRACT_ADDRESS;
      }
      let gas = await web3Instance.methods
        .approve(contractAddress, limit)
        .estimateGas({ from: data.walletAddress });

      approval = await web3Instance.methods
        .approve(contractAddress, limit)
        .send({ from: data.walletAddress, gas: gas });
      resolve(approval);
    } catch (error) {
      console.error("Error on getAllowanceApproval", error);
      reject(error);
    }
  });
};




/**
 * Starting
 * Service to check alowance and approval of dynamic token addresses
 * @param {*} walletType 
 * @returns 
 */


//allowance method
export const getAllowanceInfoForBuyToken = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tokenAddress;
      if (data.tokenType == 1) {
        tokenAddress = TOKENS_TYPE.LOVELYINU;
      } else if (data.tokenType == 2) {
        tokenAddress = TOKENS_TYPE.SHIBAINU;
      } else if (data.tokenType == 3) {
        tokenAddress = TOKENS_TYPE.FLOKI;
      } else if (data.tokenType == 4) {
        tokenAddress = TOKENS_TYPE.SAFEMOON;
      }
      let contractAddress, web3Instance;
        let instance;

        if (walletType === "WALLETCONNECT") {
          instance = new Web3(provider);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "METAMASK") {
          instance = new Web3(RPC_URL);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "BINANCE") {
          instance = new Web3(RPC_URL);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "TRUSTWALLET") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        }
        contractAddress = REDMARS_CONTRACT_ADDRESS;
      
      

      let allowance = await web3Instance.methods
        .allowance(data.walletAddress, contractAddress)
        .call();
      resolve(allowance);
    } catch (error) {
      console.error("Error on getAllowanceInfo for buy tokens", error);
      reject(error);
    }
  });
};

//allowance Approval method
export const getAllowanceApprovalForBuyToken = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
        let tokenAddress;
        if (data.tokenType == 1) {
          tokenAddress = TOKENS_TYPE.LOVELYINU;
        } else if (data.tokenType == 2) {
          tokenAddress = TOKENS_TYPE.SHIBAINU;
        } else if (data.tokenType == 3) {
          tokenAddress = TOKENS_TYPE.FLOKI;
        } else if (data.tokenType == 4) {
          tokenAddress = TOKENS_TYPE.SAFEMOON;
        }
      let maxlimit, limit, approval;
      maxlimit = BigNumber(10).power(40);
      limit = maxlimit.toString();

      let contractAddress, web3Instance;
      
        let instance;

        if (walletType === "WALLETCONNECT") {
          instance = new Web3(provider);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "METAMASK") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "BINANCE") {
          instance = new Web3(window.BinanceChain);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "TRUSTWALLET") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        }
        contractAddress = REDMARS_CONTRACT_ADDRESS;
      
      let gas = await web3Instance.methods
        .approve(contractAddress, limit)
        .estimateGas({ from: data.walletAddress });

      approval = await web3Instance.methods
        .approve(contractAddress, limit)
        .send({ from: data.walletAddress, gas: gas });
      resolve(approval);
    } catch (error) {
      console.error("Error on getAllowanceApprovalFor Buy tokens", error);
      reject(error);
    }
  });
};
/**
 * End of allowance and dynamic approvalFunction
 */
//get project counter method

export const getProjectCounter = async (walletType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let projectCounter = contract.methods.projectCounter().call();
      resolve(projectCounter);
    } catch (error) {
      console.error("Error on getProjectCounter", error);
      reject(error);
    }
  });
};

//Get project info by project ID method
export const getProjectInfo = async (walletType, projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let projectInfo = contract.methods.ProjectInfo(projectId).call();
      resolve(projectInfo);
    } catch (error) {
      console.error("Error on getProjectInfo", error);
      reject(error);
    }
  });
};

//Get common details using request token address
export const tokenDetails = async (walletType, tokenAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let instance, web3Instance;

      if (walletType === "WALLETCONNECT") {
        instance = new Web3(provider);
        web3Instance = new instance.eth.Contract(
          DYNAMIC_ABI,
          tokenAddress
        );
      } else if (walletType === "METAMASK") {
        instance = new Web3(window.ethereum);
        web3Instance = new instance.eth.Contract(
          DYNAMIC_ABI,
          tokenAddress
        );
      } else if (walletType === "BINANCE") {
        instance = new Web3(RPC_URL);
        web3Instance = new instance.eth.Contract(
          DYNAMIC_ABI,
          tokenAddress
        );
      } else if (walletType === "TRUSTWALLET") {
        instance = new Web3(window.ethereum);
        web3Instance = new instance.eth.Contract(
          DYNAMIC_ABI,
          tokenAddress
        );
      }

      let decimal = await web3Instance.methods.decimals().call();
      let symbol = await web3Instance.methods.symbol().call();
            let tokenName = await web3Instance.methods.name().call();

            data.symbol = symbol;
            data.decimal = 10 ** decimal;
            data.tokenName = tokenName;

      resolve(data);
    } catch (error) {
      console.error("Error on tokenDetails", error);
      reject(error);
    }
  });
};

//Get common details using request token address
export const calculateTokenService = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );

       let calculatedToken = await contract.methods
         .calculateToken(
           data.projectId,
           //  Number(data.bnb).toString,
           data.bnb,
           data.tokenType
         )
         .call();

      resolve(calculatedToken);
    } catch (error) {
      console.error("Error on calculateTokenService", error);
      reject(error);
    }
  });
};

export const redmarsTokenDetailsService = async (walletType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let redmarsMinAmount = await contract.methods.minRedmarsAmount().call();

      let redMarsTokenAddress = await contract.methods.redmarsAddress().call();
      let data = { redmarsMinAmount, redMarsTokenAddress };

      resolve(data);
    } catch (error) {
      console.error("Error on redmarsTokenDetailsService", error);
      reject(error);
    }
  });
};

export const redmarsTokenBalanceService = async (walletType, data) => {
  let redmarsTokenDecimal, redmarsTokenBalance;
  return new Promise(async (resolve, reject) => {
    try {
      let instance, contract;

      if (walletType === "WALLETCONNECT") {
        instance = new Web3(provider);
        contract = new instance.eth.Contract(
          DYNAMIC_ABI,
          data.tokenAddress
        );
      } else if (walletType === "METAMASK") {
        instance = new Web3(window.ethereum);
        contract = new instance.eth.Contract(
          DYNAMIC_ABI,
          data.tokenAddress
        );
      } else if (walletType === "BINANCE") {
        instance = new Web3(RPC_URL);
        contract = new instance.eth.Contract(
          DYNAMIC_ABI,
          data.tokenAddress
        );
      } else if (walletType === "TRUSTWALLET") {
        instance = new Web3(window.ethereum);
        contract = new instance.eth.Contract(
          DYNAMIC_ABI,
          data.tokenAddress
        );
      }

      redmarsTokenBalance = await contract.methods
        .balanceOf(data.walletAddress)
        .call();

      redmarsTokenDecimal = await contract.methods.decimals().call();
      redmarsTokenDecimal = 10 ** redmarsTokenDecimal;
      data = { redmarsTokenBalance, redmarsTokenDecimal };
      resolve(data);
    } catch (error) {
      console.error("Error on redmarsTokenBalanceService", error);
      reject(error);
    }
  });
};

/**
 * Method function to get decimals of token address
 * @param {*} walletType
 * @param {*} tokenAddress
 * @returns
 */
export const getTokenAddressDecimals = async (walletType, tokenAddress) => {
	  return new Promise(async (resolve, reject) => {
      try {
        let instance, web3Instance;

        if (walletType === "WALLETCONNECT") {
          instance = new Web3(provider);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "METAMASK") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "BINANCE") {
          instance = new Web3(RPC_URL);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        } else if (walletType === "TRUSTWALLET") {
          instance = new Web3(window.ethereum);
          web3Instance = new instance.eth.Contract(
            DYNAMIC_ABI,
            tokenAddress
          );
        }

        let getDecimals = await web3Instance.methods.decimals().call();

        resolve(getDecimals);
      } catch (error) {
        console.error("Error on getTokenAddressDecimals", error);
        reject(error);
      }
		});
};

