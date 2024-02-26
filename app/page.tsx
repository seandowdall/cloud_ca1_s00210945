import Image from "next/image";
import TheForm from "./_components/pet-form";
import ReceivingData from "./_components/receiving-data";

export default function Home() {
  return (
    <main>
      <TheForm />
      <ReceivingData />
    </main>
  );
}
