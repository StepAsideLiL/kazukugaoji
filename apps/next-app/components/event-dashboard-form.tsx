"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, Form, useForm } from "@formisch/react";
import * as v from "valibot";

const eventRegistrationSchema = v.object({
  idSlug: v.pipe(v.string(), v.trim(), v.minLength(1, "ID/Slug is required")),
  title: v.pipe(v.string(), v.trim(), v.minLength(1, "Title is required")),
  subtitle: v.string(),
  description: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Description is required")
  ),
  requiredFields: v.object({
    name: v.boolean(),
    email: v.boolean(),
    phone: v.boolean(),
  }),
  maxGuestsAllowed: v.pipe(
    v.number(),
    v.minValue(1, "Must allow at least 1 guest")
  ),
  tshirtPrice: v.pipe(v.number(), v.minValue(0, "Price cannot be negative")),
  vipAccessPrice: v.pipe(v.number(), v.minValue(0, "Price cannot be negative")),
  bbqDonationType: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Please select a donation type")
  ),
  bbqDonationAmount: v.pipe(
    v.number(),
    v.minValue(0, "Amount cannot be negative")
  ),
  sponsorTierPrice: v.pipe(
    v.number(),
    v.minValue(0, "Price cannot be negative")
  ),
  sponsorKeyPoints: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Key points are required")
  ),
  maxSpadesTeams: v.pipe(
    v.number(),
    v.minValue(1, "Must allow at least 1 team")
  ),
});

type EventFormValues = v.InferInput<typeof eventRegistrationSchema>;

export default function EventDashboardForm() {
  const form = useForm({
    schema: eventRegistrationSchema,
    initialInput: {
      idSlug: "summer-festival-2026",
      title: "Summer Festival",
      subtitle: "A community celebration with music and food",
      description: "Create your event details in one place.",
      requiredFields: { name: true, email: true, phone: false },
      maxGuestsAllowed: 150,
      tshirtPrice: 25,
      vipAccessPrice: 75,
      bbqDonationType: "one-time",
      bbqDonationAmount: 50,
      sponsorTierPrice: 500,
      sponsorKeyPoints: "Logo placement, social shoutout, VIP perks",
      maxSpadesTeams: 8,
    } satisfies EventFormValues,
  });

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6 md:p-10">
      <header className="space-y-2 rounded-2xl border bg-card p-6 shadow-sm">
        <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
          Event dashboard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Create event settings
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Configure the event slug, identity, guest limits, pricing, and sponsor
          details with Valibot-backed validation.
        </p>
      </header>

      <Form
        of={form}
        onSubmit={(output) => {
          console.info("Event settings saved", output);
          alert("Event settings saved successfully.");
        }}
        className="grid gap-6 rounded-2xl border bg-card p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Field of={form} path={["idSlug"]}>
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="idSlug">ID / Slug</Label>
                <Input
                  id="idSlug"
                  placeholder="summer-festival-2026"
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>

          <Field of={form} path={["title"]}>
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Summer Festival"
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>

          <Field of={form} path={["subtitle"]}>
            {(field) => (
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  placeholder="A community celebration with music and food"
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
              </div>
            )}
          </Field>

          <Field of={form} path={["description"]}>
            {(field) => (
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Describe the event experience, activities, and theme."
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5 md:grid-cols-2">
          <div className="grid gap-3">
            <div>
              <h2 className="text-lg font-semibold">Required fields</h2>
              <p className="text-sm text-muted-foreground">
                Choose which attendee fields should be mandatory.
              </p>
            </div>

            <Field of={form} path={["requiredFields", "name"]}>
              {(field) => (
                <label className="flex items-start gap-3 rounded-lg border p-3">
                  <Checkbox
                    checked={Boolean(field.input)}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  <span className="grid gap-1 text-sm">
                    <span className="font-medium">Name</span>
                    <span className="text-muted-foreground">
                      Require attendee names.
                    </span>
                  </span>
                </label>
              )}
            </Field>

            <Field of={form} path={["requiredFields", "email"]}>
              {(field) => (
                <label className="flex items-start gap-3 rounded-lg border p-3">
                  <Checkbox
                    checked={Boolean(field.input)}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  <span className="grid gap-1 text-sm">
                    <span className="font-medium">Email</span>
                    <span className="text-muted-foreground">
                      Require an email address.
                    </span>
                  </span>
                </label>
              )}
            </Field>

            <Field of={form} path={["requiredFields", "phone"]}>
              {(field) => (
                <label className="flex items-start gap-3 rounded-lg border p-3">
                  <Checkbox
                    checked={Boolean(field.input)}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  <span className="grid gap-1 text-sm">
                    <span className="font-medium">Phone</span>
                    <span className="text-muted-foreground">
                      Require a phone number.
                    </span>
                  </span>
                </label>
              )}
            </Field>
          </div>

          <div className="grid gap-5">
            <Field of={form} path={["maxGuestsAllowed"]}>
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="maxGuestsAllowed">Max guests allowed</Label>
                  <Input
                    id="maxGuestsAllowed"
                    type="number"
                    min={1}
                    step={1}
                    {...field.props}
                    value={field.input ?? 1}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value || 0))
                    }
                  />
                  {field.errors?.[0] ? (
                    <p className="text-xs text-destructive">
                      {field.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </Field>

            <Field of={form} path={["tshirtPrice"]}>
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="tshirtPrice">T-shirt price</Label>
                  <Input
                    id="tshirtPrice"
                    type="number"
                    min={0}
                    step={1}
                    {...field.props}
                    value={field.input ?? 0}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value || 0))
                    }
                  />
                  {field.errors?.[0] ? (
                    <p className="text-xs text-destructive">
                      {field.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </Field>

            <Field of={form} path={["vipAccessPrice"]}>
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="vipAccessPrice">VIP access price</Label>
                  <Input
                    id="vipAccessPrice"
                    type="number"
                    min={0}
                    step={1}
                    {...field.props}
                    value={field.input ?? 0}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value || 0))
                    }
                  />
                  {field.errors?.[0] ? (
                    <p className="text-xs text-destructive">
                      {field.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </Field>
          </div>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5 md:grid-cols-[1.1fr_0.9fr]">
          <Field of={form} path={["bbqDonationType"]}>
            {(field) => (
              <div className="grid gap-2">
                <Label>BBQ donation option</Label>
                <Select
                  value={field.input ?? "one-time"}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a donation option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time donation</SelectItem>
                    <SelectItem value="monthly">Monthly donation</SelectItem>
                    <SelectItem value="sponsor">Sponsor package</SelectItem>
                  </SelectContent>
                </Select>
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>

          <Field of={form} path={["bbqDonationAmount"]}>
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="bbqDonationAmount">BBQ donation amount</Label>
                <Input
                  id="bbqDonationAmount"
                  type="number"
                  min={0}
                  step={1}
                  {...field.props}
                  value={field.input ?? 0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value || 0))
                  }
                />
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5 md:grid-cols-[0.9fr_1.1fr]">
          <Field of={form} path={["sponsorTierPrice"]}>
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="sponsorTierPrice">Sponsor tier price</Label>
                <Input
                  id="sponsorTierPrice"
                  type="number"
                  min={0}
                  step={1}
                  {...field.props}
                  value={field.input ?? 0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value || 0))
                  }
                />
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>

          <Field of={form} path={["sponsorKeyPoints"]}>
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="sponsorKeyPoints">Sponsor key points</Label>
                <Textarea
                  id="sponsorKeyPoints"
                  rows={4}
                  placeholder="Logo placement, social media mention, VIP perks, booth access"
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5 md:grid-cols-2">
          <Field of={form} path={["maxSpadesTeams"]}>
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="maxSpadesTeams">Max spades teams</Label>
                <Input
                  id="maxSpadesTeams"
                  type="number"
                  min={1}
                  step={1}
                  {...field.props}
                  value={field.input ?? 1}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value || 0))
                  }
                />
                {field.errors?.[0] ? (
                  <p className="text-xs text-destructive">{field.errors[0]}</p>
                ) : null}
              </div>
            )}
          </Field>

          <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Ready to publish</p>
            <p className="mt-1">
              This screen now captures the requested event configuration fields
              with shadcn UI, Formisch, and Valibot validation.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Button type="submit">Save event settings</Button>
        </div>
      </Form>
    </section>
  );
}
