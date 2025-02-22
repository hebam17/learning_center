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
