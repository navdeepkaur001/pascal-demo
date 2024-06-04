import { addValidator } from "redux-form-validators";

export var matchPassword = addValidator({
  validator: function(options, value, allValues) {
    if (allValues.new_password != value) {
      return {
        defaultMessage: "Password not matched"
      };
    }
  }
});
export var matchPasswords = addValidator({
  validator: function(options, value, allValues) {
    if (allValues.password != value) {
      return {
        defaultMessage: "Password not matched"
      };
    }
  }
});
export var phoneNumber = addValidator({
  validator: function(options, value, allValues) {
    if (!allValues.mobileno.match(/^(0|[1-9][0-9]{9})$/)) {
      return {
        defaultMessage: "Invalid phone number, must be 10 digits"
      };
    }
  }
});
export var passwordValidator = addValidator({
  validator: function(options, value, allValues) {
    if (
      !allValues.password.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$"
      )
    ) {
      return {
        defaultMessage:
          "Password should have one uppercase, one lowercase, one number, one special character, minimum 8 characters"
      };
    }
  }
});
export var resetValidator = addValidator({
  validator: function(options, value, allValues) {
    if (
      !allValues.new_password.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$"
      )
    ) {
      return {
        defaultMessage:
          "Password should have one uppercase, one lowercase, one number, one special character, minimum 8 characters"
      };
    }
  }
});
export var zipcpde = addValidator({
  validator: function(options, value, allValues) {
    if (!allValues.zip.match(/^[\w\-\s]+$/)) {
      return {
        defaultMessage: "Invalid zip code"
      };
    }
  }
});
export var amountCrypto = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

    if (!allValues.crypto.match(regex)) {
      return {
        defaultMessage: "Invalid amount"
      };
    }
  }
});
export var amountUsd = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

    if (!allValues.usd.match(regex)) {
      return {
        defaultMessage: "Invalid amount"
      };
    }
  }
});
export var depositUsd = addValidator({
  validator: function(options, value, allValues) {
    //!mportant
    var regex = /^[0-9]+\.?[0-9]*$/;

    if (!allValues.amount.match(regex)) {
      return {
        defaultMessage: "Invalid amount"
      };
    }
  }
});

export var checkAccountNumber = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[0-9a-zA-Z]{8,29}$/;
    if (!allValues.account_number.match(regex)) {
      if (
        allValues.account_number.length < 9 ||
        allValues.account_number.length > 28
      ) {
        return {
          defaultMessage: "Minimum 9 and maximum 28 characters required"
        };
      } else {
        return {
          defaultMessage: "Invalid account number"
        };
      }
    }
  }
});
export var checkString = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[a-zA-Z ]+$/;
    if (!allValues.type_of_account.match(regex)) {
      return {
        defaultMessage: "Invalid account type"
      };
    }
  }
});
export var checkBankName = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[a-zA-Z ]+$/;

    if (!allValues.bank.match(regex)) {
      return {
        defaultMessage: "Invalid bank name"
      };
    }
  }
});
export var checkBranchName = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[a-zA-Z ]+$/;

    if (!allValues.branch_name.match(regex)) {
      return {
        defaultMessage: "Invalid branch name"
      };
    }
  }
});

export var checkSwiftCode = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[0-9a-zA-Z]{8,11}$/;
    if (!allValues.swift_code.match(regex)) {
      if (allValues.swift_code.length < 8 || allValues.swift_code.length > 11) {
        return {
          defaultMessage: "Minimum 8 and maximum 11 characters required"
        };
      } else {
        return {
          defaultMessage: "Invalid swift code"
        };
      }
    }
  }
});

export var amountValidator = addValidator({
  validator: function(options, value, allValues) {
    var regex = /^[0-9]+\.?[0-9]*$/;

    if (!allValues[options].match(regex)) {
      return {
        defaultMessage: "Invalid amount"
      };
    }
  }
});
