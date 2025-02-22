import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError();
  console.log("Error Element:", error);

  return <div>ErrorElement</div>;
}
