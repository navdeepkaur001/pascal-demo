import { ContractInstanceHandler } from "../CommonServices/Instance.service";
import { provider } from "../redux/action/wallectConnectProvider";
import redmarsDynamicAbi from "../Abis/DynamicAbi.json";
import Web3 from "web3";
import { CommonService } from "../utils/commonService";
import { RPC_URL } from "../constant";
/**
 *
 * @common method to check status of txn between interval
 */
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

//create new Ico method
export const createRequestIcoService = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let instance, web3Instance;

      if (walletType === "WALLETCONNECT") {
        instance = new Web3(provider);
        web3Instance = new instance.eth.Contract(
          redmarsDynamicAbi,
          data.address
        );
      } else if (walletType === "METAMASK") {
        instance = new Web3(window.ethereum);
        web3Instance = new instance.eth.Contract(
          redmarsDynamicAbi,
          data.address
        );
      } else if (walletType === "BINANCE") {
        instance = new Web3(RPC_URL);
        web3Instance = new instance.eth.Contract(
          redmarsDynamicAbi,
          data.address
        );
      } else if (walletType === "TRUSTWALLET") {
        instance = new Web3(window.ethereum);
        web3Instance = new instance.eth.Contract(
          redmarsDynamicAbi,
          data.address
        );
      }

      let getRequestedTokenDecimal = await web3Instance.methods
        .decimals()
        .call();
      getRequestedTokenDecimal = 10 ** getRequestedTokenDecimal;
      const numOfToken = CommonService.convertWithDecimal(
        data.noOfToken,
        getRequestedTokenDecimal
      );

      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );

      let gas = await contract.methods
        .requestICO(
          numOfToken,
          Number(data.tokenPrice).toString(),
          data.duration,
          data.vestingTime,
          data.address
        )
        .estimateGas({ from: data.walletAddress });

      await contract.methods
        .requestICO(
          numOfToken,
          Number(data.tokenPrice).toString(),
          data.duration,
          data.vestingTime,
          data.address
        )
        .send({ from: data.walletAddress, gas: gas })
        .on("transactionHash", function (transactionHash) {
          check_interval(transactionHash);
          if (transactionHash) {
            setTimeout(function () {
              resolve({
                status: true,
                message: "Your transaction is in processing",
              });
            }, 2000);
          }
        });
    } catch (error) {
      console.error("Error on createRequestIcoService", error);
      reject(error);
    }
  });
};

//create new Ico method
export const investTokens = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let gas;
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      //if bnb selected
      if (data.tokenType == 0) {
        data.bnbAmount = data.bnb;
        gas = await contract.methods
          .invest(data.projectId, data.tokenType, Number(data.bnb).toString())
          .estimateGas({
            from: data.walletAddress,
            value: Number(data.bnbAmount.toString()),
          });
      } else {
        //Other tokens selected
        data.bnbAmount = 0;
        gas = await contract.methods
          .invest(data.projectId, data.tokenType, Number(data.bnb).toString())
          .estimateGas({
            from: data.walletAddress,
          });
      }
       
      await contract.methods
        .invest(data.projectId, data.tokenType, Number(data.bnb).toString())
        .send({
          from: data.walletAddress,
          gas: gas,
          value: Number(data.bnbAmount.toString()),
        })
        .on("transactionHash", function (transactionHash) {
          check_interval(transactionHash);
          if (transactionHash) {
            setTimeout(function () {
              resolve({
                status: true,
                message: "Your transaction is in processing",
              });
            }, 2000);
          }
        });
    } catch (error) {
      console.error("Error on invest service", error);
      reject(error);
    }
  });
};

//Get common details using request token address
export const claimUserTokenService = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let gas = await contract.methods
        .claimUserTokens(data.projectId)
        .estimateGas({ from: data.walletAddress });

      let userClaimInfo = contract.methods
        .claimUserTokens(data.projectId)
        .send({ from: data.walletAddress, gas: gas })
        .on("transactionHash", function (transactionHash) {
          check_interval(transactionHash);
          if (transactionHash) {
            setTimeout(function () {
              resolve({
                status: true,
                message: "Your transaction is in processing",
              });
            }, 2000);
          }
        });

      resolve(userClaimInfo);
    } catch (error) {
      console.error("Error on calculateTokenService", error);
      reject(error);
    }
  });
};

//Get common details using request token address
export const userInfoService = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let userInfo = contract.methods
        .userInfoMapping(data.walletAddress, data.projectId)
        .call();
      resolve(userInfo);
    } catch (error) {
      console.error("Error on calculateTokenService", error);
      reject(error);
    }
  });
};

/**
 * Function to get amount raised mapping
 * params
 * projectId and tokenType
 */
export const getAmountRaisedMapping = async (walletType, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let amountRaised = contract.methods
        .amountRaisedMapping(data.projectId, data.tokenType)
        .call();
      resolve(amountRaised);
    } catch (error) {
      console.error("Error on calculateTokenService", error);
      reject(error);
    }
  });
};
/**
 * Function to get vested time of an ico
 * @param {*} walletType
 * @param {*} data
 * @returns
 */
export const getVestedTime = async (walletType, projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let vestedTime = contract.methods.vestedTime(projectId).call();
      resolve(vestedTime);
    } catch (error) {
      console.error("Error on calculateTokenService", error);
      reject(error);
    }
  });
};
