import { gql } from "../../__generated__";

export const ADD_CATEGORY = gql(`
  mutation AddCategory($material:types.Material,$title:String,$description:String){
    addCategory(material:$material,title:$title,description:$description){
      id
      material
      title
      description
    }
  }
`);
