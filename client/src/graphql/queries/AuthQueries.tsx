import { gql } from "../../__generated__";

export const REFRESH_QUERY = gql(`
  query RefreshQuery{
    refresh{
      message
    }
  }
`);

export const GET_ID = gql(`
  query GetId{
    getId{
      idToken
    }
  }
`);
