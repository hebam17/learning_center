import { gql } from "../../__generated__";

export const REFRESH_QUERY = gql(`
  query RefreshQuery{
    refresh{
      accessToken
    }
  }
`);
