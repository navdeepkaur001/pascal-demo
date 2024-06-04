import { ContractInstanceHandler } from "../CommonServices/Instance.service";
import Web3 from "web3";
import { provider } from "../redux/action/wallectConnectProvider";

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
/**
 * Function to get admin address
 * @param walletType
 */
export const getOwnerAsAdmin = async (walletType) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contract =
				await ContractInstanceHandler.redmarsContractInstanceHandler(
					walletType
				);
			let ownerAddress = await contract.methods.owner().call();

			resolve(ownerAddress);
		} catch (error) {
			console.error("Error on getOwnerAsAdmin", error);
			reject(error);
		}
	});
};

//Approve ICO request method
export const approveIcoRequest = async (walletType, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contract =
				await ContractInstanceHandler.redmarsContractInstanceHandler(
					walletType
				);

			let gas = await contract.methods
				.approveICO(data.projectId)
				.estimateGas({ from: data.walletAddress });
			let details = await contract.methods.approveICO(data.projectId).send({
				from: data.walletAddress,
				gas: gas,
			});
			resolve(details);
		} catch (error) {
			console.error("Error on approveIcoRequest", error);
			reject(error);
		}
	});
};

//Claim money for user/Owner
export const claimMoney = async (walletType, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contract =
				await ContractInstanceHandler.redmarsContractInstanceHandler(
					walletType
				);

			let gas = await contract.methods
				.claimMoney(data.projectId)
				.estimateGas({ from: data.walletAddress });
			let details = await contract.methods.claimMoney(data.projectId).send({
				from: data.walletAddress,
				gas: gas,
			});
			resolve(details);
		} catch (error) {
			console.error("Error on claimMoney", error);
			reject(error);
		}
	});
};
export const updateRedmarsMinAmountService = async (walletType, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contract =
				await ContractInstanceHandler.redmarsContractInstanceHandler(
					walletType
				);
			let gas = await contract.methods
				.updateMinRedmarsAmount(data.minAmount)
				.estimateGas({ from: data.walletAddress });
			let redmarsMinLatestAmount = await contract.methods
				.updateMinRedmarsAmount(data.minAmount)
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
			resolve(redmarsMinLatestAmount);
		} catch (error) {
			console.error("Error on updateRedmarsMinAmountService", error);
			reject(error);
		}
	});
};

export const updateRedmarsAddressService = async (walletType, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contract =
				await ContractInstanceHandler.redmarsContractInstanceHandler(
					walletType
				);
			let gas = await contract.methods
				.updateRedmars(data.redmarsAddress)
				.estimateGas({ from: data.walletAddress });

			let redmarsAddress = await contract.methods
				.updateRedmars(data.redmarsAddress)
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

			resolve(redmarsAddress);
		} catch (error) {
			console.error("Error on updateRedmarsAddressService", error);
			reject(error);
		}
	});
};
/**
 * Method to update admin address
 * @param {*} walletType
 * @param {*} data
 * @returns
 */

export const updateRedmarsAdminAddress = async (walletType, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contract =
				await ContractInstanceHandler.redmarsContractInstanceHandler(
					walletType
				);
			let gas = await contract.methods
				.updateAdminAddress(data.adminAddress)
				.estimateGas({ from: data.walletAddress });

			let adminAddress = await contract.methods
				.updateAdminAddress(data.adminAddress)
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

			resolve(adminAddress);
		} catch (error) {
			console.error("Error on updateRedmarsAdminAddress", error);
			reject(error);
		}
	});
};

/**
 * update admin share percentage method
 * @param {*} walletType
 * @param {*} data
 * @returns
 */
export const updateAdminSharePercentage = async (walletType, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contract =
				await ContractInstanceHandler.redmarsContractInstanceHandler(
					walletType
				);
			let gas = await contract.methods
				.updateAdminSharePercentage(data.adminSharePercentage)
				.estimateGas({ from: data.walletAddress });

			let updateSharePercentage = await contract.methods
				.updateAdminSharePercentage(data.adminSharePercentage)
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

			resolve(updateSharePercentage);
		} catch (error) {
			console.error("Error on updateAdminSharePercentage", error);
			reject(error);
		}
	});
};


/**
 * Fetch admin address method
 * @param {*} walletType
 * @returns
 */
export const fetchAdminAddress = async (walletType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let data = await contract.methods.adminAddress().call();
      resolve(data);
    } catch (error) {
      console.error("Error on fetchAdminAddress", error);
      reject(error);
    }
  });
};

/**
 * Fetch admin share percentage
 * @param {*} walletType
 * @returns
 */
export const fetchAdminSharePercentage = async (walletType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.redmarsContractInstanceHandler(
          walletType
        );
      let data = await contract.methods.adminSharePercentage().call();
      resolve(data);
    } catch (error) {
      console.error("Error on fetchAdminSharePercentage", error);
      reject(error);
    }
  });
};