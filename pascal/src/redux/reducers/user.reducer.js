import { NOMICS_DATA } from "../action/user.action";

const initialState = {
  nomicsData: "",
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case NOMICS_DATA:
      return { ...state, nomicsData: action.payload };

    default:
      return state;
  }
}
