import { defaultMetadata } from "../lib/metadata";
import ContactClient from "./ContactClient";

export const metadata = {
  ...defaultMetadata,
  title: "Contact Us | Pay 10",
};

export default function Contact() {
  return <ContactClient />;
}
