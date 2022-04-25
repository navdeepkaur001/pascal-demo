import * as request from "../utils/requests";
import * as endpoint from "../utils/endPoints";
import { NOMICS_KEY, NOMICS_BASE_URL } from "../constant";
import * as req from "../utils/http";


/**
 * Service to get user all transactions
 */
const fetchUserAllTransactionService = (data) => {
  return request.getReq(
    endpoint.allUserTransactions +
      `/${data.address}?page=${data.page}&limit=${data.limit}`
  );
};

/**
 * Service to send contact details
 */
const sendContactDetailService = (data) => {
   return request.PostReq(endpoint.sendContactDetails ,data)
 }
const fetchCurrenciesTickerService = async (data) => {
  try {
    const requestUrl =
      endpoint.currenciesTicker +
      `?key=${NOMICS_KEY}&ids=${data.ids}&interval=${data.interval}`;
    const response = await req.getInstance.get(requestUrl);
    if (response?.status == 200) {
      return response?.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Error in fetchCurrenciesTinkerService", err);
  }
};

const fetchNomicsTokenPriceService = () => {
  return request.getReq(endpoint.nomicApidetails);
};
export const BackendServices = {
  fetchUserAllTransactionService,
  sendContactDetailService,
  fetchCurrenciesTickerService,
  fetchNomicsTokenPriceService,
};
