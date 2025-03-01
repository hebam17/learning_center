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
