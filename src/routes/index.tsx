import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { UserContext } from "../context";
import MyBoxes from "./-components/MyBoxes";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user } = useContext(UserContext);

  return (
    <div className="p-2">
      <h3>Welcome Home{user && ", " + user.name}!</h3>

      {user && <MyBoxes />}
    </div>
  );
}
