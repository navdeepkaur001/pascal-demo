import { METAMASK_ADDRESS, IS_LOGIN } from "../action/connect.action";

const initialState = {
  metamaskAddress: "",
};

export default function connect(state = initialState, action = {}) {
  switch (action.type) {
    case METAMASK_ADDRESS:
      return { ...state, metamaskAddress: action.payload };
    case IS_LOGIN:
       return { ...state, isLogin: action.payload };

    default:
      return state;
  }
}
