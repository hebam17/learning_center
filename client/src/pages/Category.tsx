import { useQuery } from "@apollo/client";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_CATEGORY } from "../graphql/queries/CategoryQueries";

type CategoryParams = {
  categoryId: string;
};

export default function Category() {
  console.log("Hey lesson!!!!!!!!!!!!!!!");
  const { categoryId } = useParams<CategoryParams>();

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id: categoryId as string },
  });

  useEffect(() => {
    console.log("Category State:", { loading, error, data });
  }, [loading, error, data]);

  return (
    <div>
      <h1>My Category</h1>
      {/* <button onClick={handleCreateCategory}>Create Category</button> */}
    </div>
  );
}
