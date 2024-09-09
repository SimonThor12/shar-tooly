import { createFileRoute } from "@tanstack/react-router";
import Hero from "../Components/Hero";

export const Route = createFileRoute("/")({
  component: () => <Hero />,
});
