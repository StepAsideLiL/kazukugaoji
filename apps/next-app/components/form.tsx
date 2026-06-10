"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useFormStore } from "@/lib/store";
import { useState, useId } from "react";

export default function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const formSteps = [
    {
      step: 1,
      title: "Will You Attend?",
      description: "",
      FormComponent: Attend,
      required: true,
    },
    {
      step: 2,
      title: "Please! Fill Out Your Contact.",
      description: "",
      FormComponent: Contact,
      required: true,
    },
    {
      step: 3,
      title: "Add your guest.",
      description: "",
      FormComponent: Guests,
      required: true,
    },
    {
      step: 4,
      title: "Add your guest.",
      description: "",
      FormComponent: Guests,
      required: false,
    },
    {
      step: 5,
      title: "Buy T-shirt!",
      description: "",
      FormComponent: TShirts,
      required: false,
    },
    {
      step: 6,
      title: "Buy VIP access and BBQ Contribution.",
      description: "",
      FormComponent: VIPandBBQ,
      required: false,
    },
    {
      step: 7,
      title: "Sponsor our event!",
      description: "",
      FormComponent: Sponsorship,
      required: false,
    },
    {
      step: 8,
      title: "Want to play spades.",
      description: "",
      FormComponent: SpadeGame,
      required: false,
    },
  ];

  const step = formSteps.find((step) => currentStep === step.step);

  return (
    <Card className="mx-auto h-screen w-full max-w-xl sm:h-auto">
      <CardHeader>
        <CardTitle>Terms of Service</CardTitle>
        <CardDescription>
          Review the terms before accepting the agreement.
        </CardDescription>
      </CardHeader>

      <CardContent className="-mb-(--card-spacing) h-full max-h-96 min-h-96 flex-1 sm:flex-0">
        {step && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold">{step.title}</h1>

              <p>{step.description}</p>
            </div>

            <step.FormComponent />
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            if (currentStep > 1)
              setCurrentStep((currentStep) => currentStep - 1);
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (currentStep < formSteps.length)
              setCurrentStep((currentStep) => currentStep + 1);
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}

function Attend() {
  const id = useId();
  const attand = useFormStore((state) => state.attand);
  const setAttand = useFormStore((state) => state.setAttand);

  return (
    <RadioGroup
      className="gap-2"
      value={attand ? "1" : "2"}
      onValueChange={(value: string) => {
        setAttand(value === "1" ? true : false);
      }}
    >
      {/* Radio card #1 */}
      <Label
        htmlFor={`${id}-1`}
        className="relative flex w-full cursor-pointer items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
      >
        <RadioGroupItem
          aria-describedby={`${id}-1-description`}
          className="order-1 after:absolute after:inset-0"
          id={`${id}-1`}
          value="1"
        />
        <div className="grid grow gap-2">
          <h2 className="text-lg"> Yes, I will attend 😀</h2>
          <p
            className="text-xs text-muted-foreground"
            id={`${id}-1-description`}
          >
            You can use this card with a label and a description.
          </p>
        </div>
      </Label>

      {/* Radio card #2 */}
      <Label
        htmlFor={`${id}-2`}
        className="relative flex w-full cursor-pointer items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
      >
        <RadioGroupItem
          aria-describedby={`${id}-2-description`}
          className="order-1 after:absolute after:inset-0"
          id={`${id}-2`}
          value="2"
        />
        <div className="grid grow gap-2">
          <h2 className="text-lg">No, I cannot attend 😟</h2>
          <p
            className="text-xs text-muted-foreground"
            id={`${id}-2-description`}
          >
            You can use this card with a label and a description.
          </p>
        </div>
      </Label>
    </RadioGroup>
  );
}

function Contact() {
  const baseId = useId();

  const name = useFormStore((state) => state.name);
  const email = useFormStore((state) => state.email);
  const phone = useFormStore((state) => state.phone);

  const setName = useFormStore((state) => state.setName);
  const setEmail = useFormStore((state) => state.setEmail);
  const setPhone = useFormStore((state) => state.setPhone);

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Name Field */}
      <div className="grid gap-1.5">
        <Label htmlFor={`${baseId}-name`}>Full Name</Label>
        <Input
          id={`${baseId}-name`}
          type="text"
          placeholder="John Doe"
          value={name || ""} // Fallback to empty string to prevent React un-controlled warnings
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email Field */}
      <div className="grid gap-1.5">
        <Label htmlFor={`${baseId}-email`}>Email Address</Label>
        <Input
          id={`${baseId}-email`}
          type="email"
          placeholder="john@example.com"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Phone Field */}
      <div className="grid gap-1.5">
        <Label htmlFor={`${baseId}-phone`}>Phone Number</Label>
        <Input
          id={`${baseId}-phone`}
          type="tel"
          placeholder="(555) 000-0000"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
}

function Guests() {
  return <div>Guests</div>;
}

function TShirts() {
  return <div>T-Shirts</div>;
}

function VIPandBBQ() {
  return <div>VIP & BBQ</div>;
}

function Sponsorship() {
  return <div>Sponsorship</div>;
}

function SpadeGame() {
  return <div>Spade Game</div>;
}
