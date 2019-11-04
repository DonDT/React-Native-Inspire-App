const validation = (value, rules, form) => {
  let valid = true;

  for (let rule in rules) {
    switch (rule) {
      case "isRequired":
        valid = valid && validateRequired(value);
        break;
      case "isValidEmail":
        valid = valid && validateIsEmail(value);
        break;
      case "minLength":
        valid = valid && validatePasswordMinLength(value, rules[rule]);
        break;
      case "confirmPW":
        valid =
          valid && validateConfirmPassword(value, form[rules.confirmPW].value);
        break;
      default:
        return (valid = true);
    }
  }

  return valid;
};

const validateRequired = value => {
  if (value !== "") {
    return true;
  }
  return false;
};

const validateIsEmail = email => {
  const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(email).toLocaleLowerCase());
};

const validatePasswordMinLength = (value, limit) => {
  if (value.length >= limit) {
    return true;
  }
  return false;
};

const validateConfirmPassword = (secondEntry, firstEntry) => {
  return secondEntry === firstEntry;
};

export default validation;
