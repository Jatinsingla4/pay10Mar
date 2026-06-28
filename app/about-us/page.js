import { defaultMetadata } from "../lib/metadata";
import AboutClient from "./AboutClient";

export const metadata = {
  ...defaultMetadata,
  title: "About Us | Pay 10",
};

export default function About() {
  return <AboutClient />;
}
