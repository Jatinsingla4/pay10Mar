import { defaultMetadata } from "../lib/metadata";
import VisionMissionClient from "./VisionMissionClient";

export const metadata = {
  ...defaultMetadata,
  title: "Vision & Mission - Pay 10",
};

export default function VisionMission() {
  return <VisionMissionClient />;
}
