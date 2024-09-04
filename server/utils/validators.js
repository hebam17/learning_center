const specialCharsRegexp = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegexp = /[A-Z !@#$%.^&*()/><-]*\S{6,15}/;

const validation = (data) => {
  const errors = {};

  for (let [key, value] of data) {
    if (!value.trim()) {
      errors[key] = `${key} required!`;
    } else if (value.trim().includes(" ")) {
      errors[key] = `You can't have a space in ${key}`;
    } else if (key === "email" && !emailRegexp.test(value)) {
      errors[key] = "This email format is not supported!";
    } else if (
      (key === "firstname" || key === "lastname") &&
      specialCharsRegexp.test(value)
    ) {
      errors[key] = "No special characters allowed";
    } else if (
      ((key === "firstname" || key === "lastname") && value.length < 2) ||
      value.length > 30
    ) {
      errors[key] =
        "Username cannot be less than 3 or more than 30 characters long";
    } else if (key === "password" && !passwordRegexp.test(value)) {
      errors[key] =
        "password cannot be less than 6 or more than 15 charachters long";
    }
  }

  return errors;
};

exports.validation = validation;
