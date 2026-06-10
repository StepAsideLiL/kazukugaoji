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
import { Guest, Relation, TShirt, useFormStore } from "@/lib/store";
import { useState, useId } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RELATIONS: Relation[] = [
  "Husband",
  "Wife",
  "Son",
  "Dughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Uncle",
  "Aunt",
  "Grand-Father",
  "Grand-Mother",
  "Friend",
];

const SIZES: TShirt["size"][] = ["S", "M", "L", "XL", "XXL"];

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
          <div className="h-full space-y-5 overflow-auto">
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
  const baseId = useId();

  // 1. Get guests state and setter from Zustand atomatically
  const guests = useFormStore((state) => state.guests);
  const setGuests = useFormStore((state) => state.setGuests);

  // 2. Add a new empty guest row
  const addGuest = () => {
    setGuests([...guests, { name: "", relation: "Friend" }]);
  };

  // 3. Update a specific field for a guest at a given index
  const updateGuest = (index: number, field: keyof Guest, value: string) => {
    const updatedGuests = guests.map((guest, i) => {
      if (i === index) {
        return { ...guest, [field]: value };
      }
      return guest;
    });
    setGuests(updatedGuests);
  };

  // 4. Remove a guest row by its index
  const removeGuest = (indexToRemove: number) => {
    setGuests(guests.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Accompanying Guests</h3>
          <p className="text-sm text-muted-foreground">
            Bring your family or friends along! Add their details below.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addGuest}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add Guest
        </Button>
      </div>

      {guests.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No guests added yet. Click &quot;Add Guest&quot; to start adding your
          companions.
        </div>
      ) : (
        <div className="space-y-3">
          {guests.map((guest, index) => (
            <div
              key={`${baseId}-guest-${index}`}
              className="flex items-end gap-3 rounded-lg border bg-card p-4 shadow-xs"
            >
              {/* Guest Name Input */}
              <div className="grid flex-1 gap-1.5">
                <Label htmlFor={`${baseId}-name-${index}`}>Guest Name</Label>
                <Input
                  id={`${baseId}-name-${index}`}
                  type="text"
                  placeholder="Guest's full name"
                  value={guest.name}
                  onChange={(e) => updateGuest(index, "name", e.target.value)}
                />
              </div>

              {/* Guest Relation Dropdown */}
              <div className="grid w-45 gap-1.5">
                <Label htmlFor={`${baseId}-relation-${index}`}>
                  Relationship
                </Label>
                <Select
                  value={guest.relation}
                  onValueChange={(value) =>
                    updateGuest(index, "relation", value)
                  }
                >
                  <SelectTrigger id={`${baseId}-relation-${index}`}>
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONS.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Delete Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => removeGuest(index)}
                aria-label={`Remove guest ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TShirts() {
  const baseId = useId();

  // 1. Extract tshirt state and setter atomically
  const tshirtList = useFormStore((state) => state.tshirt);
  const setTshirt = useFormStore((state) => state.setTshirt);

  // 2. Add a new row for a different size
  const addTshirtRow = () => {
    setTshirt([...tshirtList, { quantity: 1, size: "M" }]);
  };

  // 3. Update fields immutably inside the array
  const updateTshirtRow = (
    index: number,
    field: keyof TShirt,
    value: string | number
  ) => {
    const updated = tshirtList.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setTshirt(updated);
  };

  // 4. Handle quantities (clamping at a minimum of 0)
  const adjustQuantity = (index: number, change: number) => {
    const currentQty = tshirtList[index].quantity;
    const newQty = Math.max(0, currentQty + change);
    updateTshirtRow(index, "quantity", newQty);
  };

  // 5. Remove a specific size row
  const removeTshirtRow = (indexToRemove: number) => {
    setTshirt(tshirtList.filter((_, i) => i !== indexToRemove));
  };

  // Calculate total shirts ordered for visual feedback
  const totalShirts = tshirtList.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Event T-Shirts</h3>
          <p className="text-sm text-muted-foreground">
            Select sizes and quantities for you and your guests.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTshirtRow}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add Size Slot
        </Button>
      </div>

      {tshirtList.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No items added. Click &quot;Add Size Slot&quot; to order event shirts.
        </div>
      ) : (
        <div className="space-y-3">
          {tshirtList.map((item, index) => (
            <div
              key={`${baseId}-tshirt-${index}`}
              className="flex items-end gap-4 rounded-lg border bg-card p-4 shadow-xs"
            >
              {/* Size Selection */}
              <div className="grid w-35 gap-1.5">
                <Label htmlFor={`${baseId}-size-${index}`}>Size</Label>
                <Select
                  value={item.size}
                  onValueChange={(value: TShirt["size"]) =>
                    updateTshirtRow(index, "size", value)
                  }
                >
                  <SelectTrigger id={`${baseId}-size-${index}`}>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity Selector Layout */}
              <div className="grid gap-1.5">
                <Label>Quantity</Label>
                <div className="flex h-10 items-center rounded-md border bg-background px-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => adjustQuantity(index, -1)}
                    disabled={item.quantity <= 0}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-12 text-center text-sm font-medium tabular-nums">
                    {item.quantity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => adjustQuantity(index, 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Spacer & Delete Button */}
              <div className="ml-auto flex h-10 items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-muted-foreground hover:text-destructive"
                  onClick={() => removeTshirtRow(index)}
                  aria-label={`Remove size slot ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Footer Widget */}
      {totalShirts > 0 && (
        <div className="flex justify-end p-2 text-sm font-medium text-muted-foreground">
          Total Shirts Selected:{" "}
          <span className="ml-1 font-bold text-foreground">{totalShirts}</span>
        </div>
      )}
    </div>
  );
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
