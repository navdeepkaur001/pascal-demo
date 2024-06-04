const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const contractSource = fs.readFileSync(inboxPath, "utf8");


let jsonContractSource = {
	language: "Solidity",
	sources: {
		"lottery.sol": {
			content: contractSource,
		},
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};


// let solcResult = solc.compile(jsonContractSource);
const solcResult = JSON.parse(solc.compile(JSON.stringify(jsonContractSource)));

const interface = solcResult.contracts["lottery.sol"].Lottery.abi;
const bytecode = solcResult.contracts["lottery.sol"].Lottery.evm.bytecode.object;

console.log(JSON.stringify(interface));
module.exports = {
	interface,
	bytecode,
};


