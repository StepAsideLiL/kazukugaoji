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
        {step && <step.FormComponent />}
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

  return (
    <RadioGroup className="gap-2" defaultValue="1">
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
          <h2 className="text-xl"> Yes, I will attend 😀</h2>
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
          <h2 className="text-xl">No, I cannot attend 😟</h2>
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
  return <div>Contact</div>;
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
