import Form from "@/components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Form />
    </div>
  );
}
