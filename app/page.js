import { defaultMetadata } from './lib/metadata';
import HomeClient from './HomeClient';

export const metadata = {
  ...defaultMetadata,
  title: "Pay 10",
};

export default function Home() {
  return <HomeClient />;
}
