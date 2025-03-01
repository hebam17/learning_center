// register validation
const specialCharsRegexp = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegexp = /[A-Z !@#$%.^&*()/><-]*\S{6,15}/;

interface Errors {
  [key: string]: string;
}

type UserData = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type ResetPassword = {
  password: string;
  confirmPassword: string;
};

export const validation = (userData: UserData) => {
  const errors: Errors = {};
  const data: [string, string][] = Object.entries(userData);

  for (const [key, value] of data) {
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
      ((key === "firstname" || key === "lastname") && value.length < 3) ||
      value.length > 30
    ) {
      errors[key] =
        "Username cannot be less than 3 or more than 30 characters long";
    } else if (key === "password" && !passwordRegexp.test(value)) {
      errors[key] =
        "password cannot be less than 6 or more than 15 charachters long";
    }
  }

  // password validation - make sure both password and confirm password identical
  if (
    userData["confirmPassword"] &&
    userData["password"] !== userData["confirmPassword"]
  ) {
    errors["confirmPassword"] = "Password and confirm password should match!";
  }
  return errors;
};

// // Login validation
// export const loginValidation = (userData: UserData) => {
//   const errors: Errors = {};
//   const data: [string, string][] = Object.entries(userData);

//   const specialCharsRegexp = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

//   for (const [key, value] of data) {
//     if (!value.trim()) {
//       errors[key] = `${key} required!`;
//     } else if (value.trim().includes(" ")) {
//       errors[key] = `You can't have a space in ${key}`;
//     } else if (key === "email" && !emailRegexp.test(value)) {
//       errors[key] = "This email format is not supported!";
//     }
//     // else if (key === "username" && specialCharsRegexp.test(value)) {
//     //   errors[key] = "No special characters allowed";
//     // }
//   }

//   return errors;
// };

// Reset password validation
export const ResetPasswordValidation = (resetData: ResetPassword) => {
  const errors: Errors = {};
  if (resetData["password"] !== resetData["confirmPassword"]) {
    errors["confirmPassword"] = "Password and confirm password should match!";
  }
  return errors;
};

// Email validation
export const EmailValidation = (email: string) => {
  if (emailRegexp.test(email)) {
    return true;
  } else {
    return false;
  }
};
