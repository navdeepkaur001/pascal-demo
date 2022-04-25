export const API_HOST = process.env.REACT_APP_API_URL;
export const rootName = "";
export const adminRootName = process.env.REACT_APP_ADMIN_ROOT_NAME;
export const publicAdminRootName = process.env.REACT_APP_PUBLIC_ADMIN_ROOT_NAME;
export const NETWORK_CHAIN_ID = process.env.REACT_APP_NETWORK_CHAIN_ID;
export const REDMARS_CONTRACT_ADDRESS =
  process.env.REACT_APP_BINANCE_CONTRACT_ADDRESS;

export const REDMARS_TOKEN_ADDRESS =
  process.env.REACT_APP_BINANCE_REDMARS_TOKEN_ADDRESS;
export const RPC_URL = process.env.REACT_APP_RPC_URL;
export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
export const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME;
export const BLOCK_EXPLORE_URL = process.env.REACT_APP_BLOCK_EXPLORE_URL;
export const ICON_URL = process.env.REACT_APP_ICON_URL;
export const CURRENCY_NAME = process.env.REACT_APP_CURRENCY_NAME;
export const CURRENCY_SYMBOL = process.env.REACT_APP_CURRENCY_SYMBOL;
export const CURRENCY_DECIMAL = process.env.REACT_APP_CURRENCY_DECIMAL;

export const NOMICS_BASE_URL = process.env.REACT_APP_NOMICS_API_URL;
export const NOMICS_KEY = process.env.REACT_APP_NOMICS_API_KEY;
// TOKENS COSTANTS
export const TOKENS_TYPE = {
  BNB: process.env.REACT_APP_BINANCE_REDMARS_TOKEN_ADDRESS,
  LOVELYINU: process.env.REACT_APP_LOVELYINU_ADDRESS,
  SHIBAINU: process.env.REACT_APP_SHIBAINU_ADDRESS,
  FLOKI: process.env.REACT_APP_FLOKI_ADDRESS,
  SAFEMOON: process.env.REACT_APP_SAFEMOON_ADDRESS,
};

export const TOKEN_LIST_ENUM = [
  { value: TOKENS_TYPE.BNB, label: "BNB" },
  { value: TOKENS_TYPE.LOVELYINU, label: "Lovely Inu" },
  { value: TOKENS_TYPE.SHIBAINU, label: "Shiba Inu" },
  { value: TOKENS_TYPE.FLOKI, label: "Floki" },
  { value: TOKENS_TYPE.SAFEMOON, label: "Safe Moon" },
];

export const TOKEN_TYPE_ENUM = [
  { BNB: process.env.REACT_APP_TYPE_BNB },
  { LOVELYINU: process.env.REACT_APP_TYPE_LOVELYINU },
  { SHIBAINU: process.env.REACT_APP_TYPE_SHIBAINU },
  { FLOKI: process.env.REACT_APP_TYPE_FLOKI },
  { SAFEMOON: process.env.REACT_APP_TYPE_SAFEMOON },
];
