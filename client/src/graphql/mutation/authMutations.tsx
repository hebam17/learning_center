/* eslint-disable react-refresh/only-export-components */
import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($input: RegisterInput) {
    register(input: $input) {
      message
      userId
    }
  }
`;

export const REGISTER_VERIFICATION = gql`
  mutation RegisterVerification($input: RegisterVerificationInput) {
    registerVerification(input: $input) {
      accessToken
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String, $password: String, $type: UserType) {
    login(email: $email, password: $password, type: $type) {
      accessToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($userId: ID, $type: UserType) {
    logout(userId: $userId, type: $type) {
      message
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation ForgetPassword($email: String, $type: UserType) {
    forgetPassword(email: $email, type: $type) {
      message
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOTP($email: String, $code: String, $type: UserType) {
    verifyOTP(email: $email, code: $code, type: $type) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $email: String
    $code: String
    $newPassword: String
    $type: UserType
  ) {
    resetPassword(
      email: $email
      code: $code
      newPassword: $newPassword
      type: $type
    ) {
      message
    }
  }
`;
