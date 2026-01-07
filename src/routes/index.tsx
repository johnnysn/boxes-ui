import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { UserContext } from "../lib/providers/user-context";
import MyBoxes from "./-components/MyBoxes";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user } = useContext(UserContext);

  return (
    <div className="p-2">{user ? <MyBoxes /> : <p>Please, login!</p>}</div>
  );
}
