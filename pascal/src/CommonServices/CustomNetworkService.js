import {
	CHAIN_ID,
	CHAIN_NAME,
	RPC_URL,
	BLOCK_EXPLORE_URL,
	ICON_URL,
	CURRENCY_DECIMAL,
	CURRENCY_NAME,
	CURRENCY_SYMBOL,
} from "../constant";

export const switchNetwork = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: CHAIN_ID }],
			});
		} catch (switchError) {
			if (switchError.code === 4902) {
				try {
					const result = await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: CHAIN_ID, // A 0x-prefixed hexadecimal string
								chainName: CHAIN_NAME,
								rpcUrls: [RPC_URL],
								blockExplorerUrls: [BLOCK_EXPLORE_URL],
								iconUrls: [ICON_URL],
								nativeCurrency: {
									name: CURRENCY_NAME,
									symbol: CURRENCY_SYMBOL, // 2-6 characters long
									decimals: parseInt(CURRENCY_DECIMAL),
								},
							},
						],
					});
					return result;
				} catch (addError) {
					reject(addError);
				}
			}
			reject(switchError);
		}
	});
};
