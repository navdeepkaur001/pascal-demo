export const actionTypes = {
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
};

export function startLoading() {
	return {
		type: actionTypes.START_LOADING,
	};
}

export function stopLoading() {
  return {
    type: actionTypes.STOP_LOADING,
  };
}
