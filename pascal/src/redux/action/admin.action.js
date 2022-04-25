import { toast } from "../../Components/Toast/Toast";
import { CommonService } from "../../utils/commonService";
import { startLoading, stopLoading } from "./loading.action";
import * as adminMethods from "../../CommonServices/AdminMethod.service";

/**
 * Action to get owner address
 * @param {*} walletType
 * @returns
 */
export const toGetOwnerAddressAction = (walletType) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.getOwnerAsAdmin(walletType);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};

/**
 * Action to approve owner Ico request
 * @param {*} walletType
 * @param {*} data
 * @returns
 */
export const toApproveIcoRequestAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.approveIcoRequest(walletType, data);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};


export const toClaimMoneyAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.claimMoney(walletType, data);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};



export const toUpdateRedmarsAddressAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.updateRedmarsAddressService(walletType, data);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};

export const toUpdateRedmarsMinAmountAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.updateRedmarsMinAmountService(
				walletType,
				data
			);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};



export const toUpdateAdminSharePercentageAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.updateAdminSharePercentage(walletType, data);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};

export const toUpdateAdminAddressAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.updateRedmarsAdminAddress(walletType, data);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};

export const toGetAdminAddressAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.fetchAdminAddress(walletType, data);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};

export const toGetAdminSharePercentageAction = (walletType, data) => {
	return async (dispatch, getState) => {
		try {
			let result;
			dispatch(startLoading());
			result = await adminMethods.fetchAdminSharePercentage(walletType, data);
			dispatch(stopLoading());
			return result;
		} catch (error) {
			dispatch(stopLoading());
			toast.error(CommonService.getError(error));
			return error;
		}
	};
};

