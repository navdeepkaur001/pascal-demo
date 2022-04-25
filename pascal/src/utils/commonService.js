import BigNumber from "big-number";
import moment from "moment";
const convertWithDecimal = (value, decimal) => {
  if (value > 0) {
    if (isInt(value)) {
      value = parseInt(value);
      value = BigNumber(value).multiply(decimal);
    } else {
      value = value * decimal;
      value = toFixed(value);
      value = parseInt(value.toString().split(".")[0]);
      value = toFixed(value);
      value = BigNumber(value);
    }
    return value.toString();
  } else {
    return 0;
  }
};

const toFixed = (x) => {
  let e;
  if (Math.abs(x) < 1.0) {
    e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

const fixedToDecimal = (value) => {
  value = value ? value.toString().match(/^-?\d+(?:\.\d{0,8})?/)[0] : 0;
  return value;
};

const isInt = (n) => {
  return n % 1 === 0;
};

const custmizeAddress = (address) => {
  let firstFive = address.substring(0, 5);
  let lastFour = address.substr(address.length - 4);
  return firstFive + "..." + lastFour;
};

const convertToInt = (value) => {
  if (value > 0) {
    if (isInt(value)) {
      value = parseInt(value);
      value = BigNumber(value);
    } else {
      value = toFixed(value);
      value = parseInt(value.toString().split(".")[0]);
      value = toFixed(value);
      value = BigNumber(value);
    }
    return value.toString();
  } else {
    return 0;
  }
};
const backToNormal = (value, decimal) => {
  let x = BigNumber(value).toString();
  let y = BigNumber(decimal).toString();
  let result = BigNumber(x).divide(y).toString();
  return result;
};

const getDaysFromMilliSecond = (millisec) => {
  // return millisec / 1;
  return millisec / (60 * 60 * 24);
};
const getMilliseconds = (value) => {
  let data = 60 * 60 * 24 * value;
  // let data = 1 * value;

  return parseInt(data);
};

const regex = /^\d*\.?\d{0,18}$/gm;

const allowOnlyNumber = (value) => {
  var re = new RegExp(regex);
  if (re.test(value)) {
    return true;
  } else {
    return false;
  }
};
const getError = (error) => {
  let finalErr;
  let errorMsg =
    error && error.message ? error.message : "Something went wrong";
  if (errorMsg.indexOf("Internal JSON-RPC error") > -1 || 0) {
    let msg = errorMsg.replace("Internal JSON-RPC error.", "");
    msg = JSON.parse(msg);

    if (msg.message.includes("stack limit reached")) {
      finalErr = "Enter less amount.";
    } else {
      finalErr = msg.message.split(":")[1];
    }
    return finalErr;
  } else if (errorMsg.indexOf("execution reverted:") > -1) {
    errorMsg = error.message.split("{")[0].split(":")[1];
    return errorMsg;
  } else if (errorMsg.indexOf("Error: Internal JSON-RPC error") == -1) {
    let errorMsg1 = error.message.split("{");
    return errorMsg1;
  } else {
    return errorMsg;
  }
};

const getLeftTime = (IcoEndTime) => {
  let data = IcoEndTime;
  let timeLeft;
  let endTime = moment.utc(data);
  let leftDays = moment.duration(endTime.diff(moment()));
  let days = parseInt(leftDays.asDays()) < 0 ? 0 : parseInt(leftDays.asDays());
  let hrs =
    parseInt(leftDays.asHours() % 24) < 0
      ? 0
      : parseInt(leftDays.asHours() % 24);
  let min =
    parseInt(leftDays.asMinutes()) % 60 < 0
      ? 0
      : parseInt(leftDays.asMinutes()) % 60;
  let sec =
    parseInt(leftDays.asSeconds()) % 60 < 0
      ? 0
      : parseInt(leftDays.asSeconds()) % 60;
  timeLeft = { days: days, hrs: hrs, min: min, sec: sec };
  return timeLeft;
};
export const CommonService = {
  convertWithDecimal,
  toFixed,
  fixedToDecimal,
  custmizeAddress,
  convertToInt,
  backToNormal,
  getDaysFromMilliSecond,
  getMilliseconds,
  allowOnlyNumber,
  getError,
  getLeftTime,
};
