import Form from "@/components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Form />
    </main>
  );
}
