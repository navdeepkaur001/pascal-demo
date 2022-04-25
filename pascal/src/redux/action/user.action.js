import { toast } from "../../Components/Toast/Toast";
import { CommonService } from "../../utils/commonService";
import { startLoading, stopLoading } from "../action/loading.action";
import {
  createRequestIcoService,
  investTokens,
  claimUserTokenService,
  userInfoService,
  getVestedTime,
  getAmountRaisedMapping,
} from "../../CommonServices/Method.service";
import {
  getProjectCounter,
  getProjectInfo,
  getAllowanceInfo,
  getAllowanceApproval,
  tokenDetails,
  calculateTokenService,
  redmarsTokenDetailsService,
  redmarsTokenBalanceService,
  getTokenAddressDecimals,
  getAllowanceInfoForBuyToken,
  getAllowanceApprovalForBuyToken,
} from "../../CommonServices/CommonMethod.service";
import { BackendServices } from "../../CommonServices/BackendServices";
import { ToastBody } from "react-bootstrap";

export const NOMICS_DATA = "NOMICS_DATA";


export const toCheckAllowanceAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getAllowanceInfo(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};

export const toApproveAllowanceAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getAllowanceApproval(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};



/**
 * Function to check allowance and approval while buy token
 * @param {*} walletType 
 * @param {*} data 
 * @returns 
 */

export const toCheckAllowanceToBuyTokenAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getAllowanceInfoForBuyToken(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};

export const toApproveAllowanceToBuyTokenAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getAllowanceApprovalForBuyToken(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};
/**
 * End of above functions
 */
export const createIcoRequestAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await createRequestIcoService(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};

//Action to project counter
export const projectCounterAction = (walletType) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getProjectCounter(walletType);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      return false;
      // toast.error(CommonService.getError(error));
    }
  };
};

//Action to get project information
export const projectInfoAction = (walletType, projectId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getProjectInfo(walletType, projectId);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};

//Action to get common details of token
export const tokenDetailsAction = (walletType, tokenAddress) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await tokenDetails(walletType, tokenAddress);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      toast.error(CommonService.getError(error));
    }
  };
};

//Action o  invest bnb to buy token
export const investTokenAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await investTokens(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      toast.error(CommonService.getError(error));
    }
  };
};

/**
 * Action to get transaction history from backend
 */

export const userTransactionHistoryAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());

      let result = await BackendServices.fetchUserAllTransactionService(data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      toast.error(CommonService.getError(error));
    }
  };
};

export const calculateTokensAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await calculateTokenService(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      // toast.error(CommonService.getError)
    }
  };
};

export const redmarsTokenDetailsAction = (walletType) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await redmarsTokenDetailsService(walletType);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      // toast.error(CommonService.getError)
    }
  };
};
//to get redmars token of specific address and itsdecimal
export const redmarsTokenAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await redmarsTokenBalanceService(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      // toast.error(CommonService.getError)
    }
  };
};

//to get user claim info
export const claimUserTokenAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await claimUserTokenService(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
       toast.error(CommonService.getError(error));
    }
  };
};

export const userInfoAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await userInfoService(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      toast.error(CommonService.getError(error));
    }
  };
};

export const contactFormAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await BackendServices.sendContactDetailService(data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      toast.error(CommonService.getError(error));
    }
  };
};
export const getNomicsDetails = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await BackendServices.fetchNomicsTokenPriceService();
      dispatch({ type: NOMICS_DATA, payload: result.data });
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());
      toast.error(CommonService.getError(error));
    }
  };
};

/**
 * Action to get tokens addresses decimals
 * @param {*} walletType
 * @param {*} tokenAddress
 * @returns
 */
export const toGetTokensDecimalsAction = (walletType, tokenAddress) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getTokenAddressDecimals(walletType, tokenAddress);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};

/**
 * Action to get vested time of an ico
 * @param {*} walletType
 * @param {*} data
 * @returns
 */
export const toGetVestedTimeAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getVestedTime(walletType, data);
      dispatch(stopLoading());
      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };
};

/**
 * Action to get amount raised
 * @param {*} walletType
 * @param {*} data
 * @returns
 */
export const toGetAmountRaisedAction = (walletType, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      let result = await getAmountRaisedMapping(walletType, data);
      dispatch(stopLoading());

      return result;
    } catch (error) {
      dispatch(stopLoading());

      toast.error(CommonService.getError(error));
    }
  };

};
