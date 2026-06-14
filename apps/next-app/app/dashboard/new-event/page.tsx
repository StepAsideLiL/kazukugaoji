import EventDashboardForm from "@/components/event-dashboard-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Event",
};

export default function Page() {
  return (
    <main>
      <EventDashboardForm />
    </main>
  );
}

// - input: id/slug
// - input: title, subtile, description
// - checkbox: required fields: name, email, phone
// - number type input: max guest allowed
// - number type input: set tshirt price for
// - number type input: vip access price
// - select options input and number type input:bbq donation options
// - number type input: sponsor tier price and their key points
// - number type input: max spades team
