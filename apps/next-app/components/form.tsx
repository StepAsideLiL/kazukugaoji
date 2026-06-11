"use client";

import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Guest, Relation, TShirt, useFormStore } from "@/lib/store";
import { useState, useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Plus,
  Minus,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Check,
  Trophy,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const SPONSORSHIP_TIERS = [
  {
    id: "silver",
    value: "500",
    name: "Silver Supporter",
    price: "$500",
    icon: Shield,
    color: "text-slate-400 border-slate-200 bg-slate-50/50",
    description:
      "Perfect for local businesses or individual patrons wanting to support the cause.",
    features: [
      "Logo placement on website",
      "Mention in opening remarks",
      "2 General Admission tickets",
    ],
  },
  {
    id: "gold",
    value: "1500",
    name: "Gold Partner",
    price: "$1,500",
    icon: ShieldCheck,
    color: "text-amber-500 border-amber-200 bg-amber-50/50",
    description:
      "Our most popular tier. Significant brand visibility before and during the main event.",
    features: [
      "Prominent logo on main stage banner",
      "Dedicated social media shoutout",
      "4 VIP Access tickets",
      "Shared logo on event t-shirts",
    ],
    popular: true,
  },
  {
    id: "platinum",
    value: "3000",
    name: "Platinum Elite",
    price: "$3,000",
    icon: ShieldAlert,
    color: "text-violet-500 border-violet-200 bg-violet-50/50",
    description:
      "Ultimate exposure. Maximize your presence as a headline presenter across all assets.",
    features: [
      "Exclusive 'Presented By' naming rights",
      "Dedicated promotional booth space",
      "10 VIP Access tickets",
      "Standalone logo on event t-shirts",
    ],
  },
];

export default function Form() {
  const [currentStep, setCurrentStep] = useState(1);

  // 1. Listen to global state to dynamically modify step behavior
  const attand = useFormStore((state) => state.attand);

  const formSteps = [
    {
      step: 1,
      title: "Will You Attend?",
      description: "Let us know if you can make it to our annual cookout.",
      FormComponent: Attend,
      required: true,
    },
    {
      step: 2,
      title: "Please! Fill Out Your Contact.",
      description:
        "Provide your basic contact information so we can stay in touch.",
      FormComponent: Contact,
      required: true,
    },
    {
      step: 3,
      title: "Add your guest.",
      description: "Bringing companions? Register them ahead of time.",
      FormComponent: Guests,
      required: true,
    },
    {
      step: 4,
      title: "Buy T-shirt!",
      description:
        "Support our theme and match with everyone at the gathering.",
      FormComponent: TShirts,
      required: false,
    },
    {
      step: 5,
      title: "Buy VIP access and BBQ Contribution.",
      description:
        "Upgrade your pass features or help sponsor the meat and grills.",
      FormComponent: VIPandBBQ,
      required: false,
    },
    {
      step: 6,
      title: "Sponsor our event!",
      description:
        "Promote your brand or back our organization as a lead supporter.",
      FormComponent: Sponsorship,
      required: false,
    },
    {
      step: 7,
      title: "Want to play spades.",
      description:
        "Reserve your spot inside the highly competitive tournament brackets.",
      FormComponent: SpadeGame,
      required: false,
    },
  ];

  const currentStepData =
    formSteps.find((s) => s.step === currentStep) || formSteps[0];
  const isLastStep = currentStep === formSteps.length;

  // 2. Condition-driven button label evaluations
  const getNextButtonText = () => {
    // If user says No to attending, change step 1 text to "Finish"
    if (currentStep === 1 && !attand) {
      return "Finish Registration";
    }
    if (isLastStep) {
      return "Submit";
    }
    // Optional steps get standard "Skip" text handles
    return currentStepData.required ? "Next" : "Skip step";
  };

  const handleNext = () => {
    // If on Step 1 and user selects 'No' (false), submit early right away!
    if (currentStep === 1 && !attand) {
      alert("Form submitted! Thank you for letting us know.");
      return;
    }

    if (isLastStep) {
      alert("Form submitted completely!");
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, formSteps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col overflow-auto bg-background text-foreground md:flex-row">
      {/* STEPPER PROGRESS SIDEBAR - CLEAN LIGHT THEME */}
      <aside className="flex w-full shrink-0 gap-4 overflow-x-auto border-b border-border bg-card p-6 md:w-80 md:flex-col md:overflow-x-visible md:border-r md:border-b-0">
        <div className="hidden border-b border-border pb-4 md:block">
          <h2 className="text-xl font-bold tracking-tight">Event RSVP</h2>
          <p className="text-xs text-muted-foreground">
            Complete the registration track
          </p>
        </div>

        <nav className="flex w-full min-w-max gap-6 md:min-w-0 md:flex-col md:gap-5 md:pt-4">
          {formSteps.map((s) => {
            const isActive = s.step === currentStep;
            const isCompleted = s.step < currentStep;

            return (
              <div key={s.step} className="flex items-center gap-3 text-left">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all",
                    isActive &&
                      "scale-105 border-primary bg-primary text-primary-foreground shadow-xs",
                    isCompleted &&
                      "border-emerald-500 bg-emerald-500 text-white",
                    !isActive &&
                      !isCompleted &&
                      "border-input bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-3" />
                  ) : (
                    s.step
                  )}
                </div>
                <div className="hidden leading-tight md:block">
                  <p
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground/70"
                    )}
                  >
                    {s.title}
                  </p>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* COMPONENT INTERACTION AREA */}
      <main className="flex h-full min-w-0 flex-1 flex-col bg-background">
        {/* Step Info Banner Header */}
        <header className="shrink-0 space-y-1.5 border-b p-6 md:px-10 md:pt-8 md:pb-4">
          <span className="text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
            Step {currentStep} of {formSteps.length}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {currentStepData.title}
          </h1>
          {currentStepData.description && (
            <p className="text-sm text-muted-foreground">
              {currentStepData.description}
            </p>
          )}
        </header>

        {/* Core Inner Content Grid */}
        <div className="flex-1 overflow-auto p-6 md:p-10">
          <div className="mx-auto w-full max-w-3xl">
            <currentStepData.FormComponent />
          </div>
        </div>

        {/* Global Action Fixed Control Block */}
        <footer className="flex shrink-0 items-center justify-between border-t bg-card p-6 md:px-10">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-5 font-medium disabled:opacity-20"
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            variant={
              !currentStepData.required && currentStep !== 1
                ? "outline"
                : "default"
            }
            className={cn(
              "h-10 min-w-35 font-semibold shadow-xs transition-all",
              !currentStepData.required &&
                currentStep !== 1 &&
                "border-dashed border-input hover:bg-accent"
            )}
          >
            {getNextButtonText()}
          </Button>
        </footer>
      </main>
    </div>
  );
}

function Attend() {
  const id = useId();
  const attand = useFormStore((state) => state.attand);
  const setAttand = useFormStore((state) => state.setAttand);

  return (
    <RadioGroup
      className="w-full gap-2"
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
    <div className="w-full space-y-4">
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
    <div className="w-full space-y-4">
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
    <div className="w-full space-y-4">
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
  const vipId = useId();
  const bbqId = useId();

  // Extract states and setters atomically from your Zustand store
  // const spadesTeam = useFormStore((state) => state.spadesTeam);
  // const setSpadesTeam = useFormStore((state) => state.setSpadesTeam);

  return (
    <div className="w-full space-y-6">
      {/* SECTION 1: VIP ACCESS TICKETING */}
      <div className="space-y-2">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Ticket Upgrades
          </h3>
          <p className="text-xs text-muted-foreground">
            Elevate your overall event experience.
          </p>
        </div>

        <Label
          htmlFor={vipId}
          className="relative flex w-full cursor-pointer items-start gap-3 rounded-md border border-input p-4 shadow-xs transition-colors outline-none has-data-[state=checked]:border-primary has-data-[state=checked]:bg-accent/30"
        >
          <Checkbox
            id={vipId}
            aria-describedby={`${vipId}-description`}
            className="order-1 mt-1 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            // checked={spadesTeam}
            // onCheckedChange={(checked) => setSpadesTeam(!!checked)}
          />

          <div className="grid grow gap-1">
            <span className="text-base leading-none font-semibold">
              Buy VIP Access
            </span>
            <p
              className="text-xs text-muted-foreground"
              id={`${vipId}-description`}
            >
              Get premium front-row seating, fast-track entry lines, and
              exclusive event merchandise.
            </p>
          </div>
        </Label>
      </div>

      {/* SECTION 2: BACKYARD BBQ DONATION */}
      <div className="space-y-2">
        <div>
          <h3 className="text-sm font-medium text-foreground">Event Support</h3>
          <p className="text-xs text-muted-foreground">
            Help fund the cookout provisions.
          </p>
        </div>

        <div className="space-y-3 rounded-md border border-input bg-card p-4 shadow-xs">
          <div className="grid gap-1">
            <Label htmlFor={bbqId} className="text-base font-semibold">
              BBQ Fund Donation
            </Label>
            <p className="text-xs text-muted-foreground">
              All contributions go straight towards funding the cuts of meat,
              charcoal, and setups.
            </p>
          </div>

          <Select defaultValue="0">
            <SelectTrigger id={bbqId} className="h-10 w-full bg-background">
              <SelectValue placeholder="Choose donation amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No donation, thank you</SelectItem>
              <SelectItem value="5">
                $5.00 — Sauce & Charcoal Supporter
              </SelectItem>
              <SelectItem value="10">$10.00 — Grillmaster Associate</SelectItem>
              <SelectItem value="25">$25.00 — Smoker Elite Club</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function Sponsorship() {
  const baseId = useId();

  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          Become an Event Sponsor
        </h3>
        <p className="text-sm text-muted-foreground">
          Select a contribution level that matches your organization&apos;s
          goals.
        </p>
      </div>

      <RadioGroup
        className="grid gap-4 sm:grid-cols-3"
        defaultValue="500"
        onValueChange={(value) =>
          console.log("Selected sponsorship tier:", value)
        }
      >
        {SPONSORSHIP_TIERS.map((tier) => {
          const Icon = tier.icon;
          const htmlId = `${baseId}-${tier.id}`;

          return (
            <Label
              key={tier.id}
              htmlFor={htmlId}
              className="relative flex h-full cursor-pointer flex-col justify-between rounded-xl border border-input bg-card p-5 shadow-xs transition-all outline-none hover:bg-accent/20 has-data-[state=checked]:border-primary has-data-[state=checked]:ring-2 has-data-[state=checked]:ring-primary/10"
            >
              {/* Radio Input (Hidden structurally but available via Label fallback overlay) */}
              <RadioGroupItem
                id={htmlId}
                value={tier.value}
                className="absolute top-4 right-4 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />

              {/* Card Body Header Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-lg border p-2 ${tier.color.split(" ")[1]} ${tier.color.split(" ")[2]}`}
                  >
                    <Icon className={`h-5 w-5 ${tier.color.split(" ")[0]}`} />
                  </div>
                  {tier.popular && (
                    <Badge
                      variant="secondary"
                      className="ml-auto border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-600 uppercase"
                    >
                      Most Popular
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-base leading-tight font-bold">
                    {tier.name}
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      / flat rate
                    </span>
                  </div>
                  <p className="pt-1 text-xs leading-relaxed font-normal text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                {/* Features Divider & Checkmarks */}
                <ul className="space-y-2 border-t border-dashed pt-4 text-xs font-normal text-muted-foreground">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}

function SpadeGame() {
  const id = useId();

  // 1. Extract state and setter atomically from your Zustand store
  const spadesTeam = useFormStore((state) => state.spadesTeam);
  const setSpadesTeam = useFormStore((state) => state.setSpadesTeam);

  return (
    <div className="w-full space-y-3">
      <div>
        <h3 className="text-lg font-medium text-foreground">
          Tournament Sign-up
        </h3>
        <p className="text-sm text-muted-foreground">
          Let us know if you want to enter competitive brackets.
        </p>
      </div>

      {/* Interactive Card Group */}
      <Label
        htmlFor={id}
        className="relative flex w-full cursor-pointer items-start gap-4 rounded-xl border border-input p-4 shadow-xs transition-colors outline-none hover:bg-accent/10 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-accent/30"
      >
        {/* Shadcn Checkbox */}
        <Checkbox
          id={id}
          aria-describedby={`${id}-description`}
          className="order-1 mt-1 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
          checked={spadesTeam}
          onCheckedChange={(checked) => setSpadesTeam(!!checked)}
        />

        {/* Card Graphics & Copy Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-md border bg-background p-1.5 text-primary">
              <Trophy className="h-4 w-4" />
            </div>
            <span className="text-base leading-none font-semibold">
              Register Spades Team
            </span>
          </div>

          <p
            className="text-xs leading-relaxed text-muted-foreground"
            id={`${id}-description`}
          >
            Yes, sign me up for the official Spades Tournament brackets! Teams
            consist of 2 players. If you are entering solo, we will match you
            with a partner on arrival.
          </p>

          {/* Quick Context Highlights */}
          {spadesTeam && (
            <div className="flex animate-in items-center gap-1.5 pt-1.5 text-[11px] font-medium text-primary duration-200 fade-in">
              <Users className="h-3.5 w-3.5" />
              <span>Bracket slot reserved under your registration</span>
            </div>
          )}
        </div>
      </Label>
    </div>
  );
}
