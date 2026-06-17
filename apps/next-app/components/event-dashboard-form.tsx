"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  // FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Field as FormischField,
  FieldArray,
  Form,
  insert,
  remove,
  useForm,
} from "@formisch/react";
import { Plus, Trash2 } from "lucide-react";
import * as v from "valibot";

const bbqDonationItemSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "Item name is required")),
  price: v.pipe(v.number(), v.minValue(0, "Price cannot be negative")),
});

const sponsorTierSchema = v.object({
  title: v.pipe(v.string(), v.trim(), v.minLength(1, "Tier title is required")),
  price: v.pipe(v.number(), v.minValue(0, "Price cannot be negative")),
  description: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Description is required")
  ),
  points: v.array(
    v.pipe(v.string(), v.trim(), v.minLength(1, "Point is required"))
  ),
});

const eventRegistrationSchema = v.object({
  idSlug: v.pipe(v.string(), v.trim(), v.minLength(1, "ID/Slug is required")),
  title: v.pipe(v.string(), v.trim(), v.minLength(1, "Title is required")),
  subtitle: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Subtitle is required")
  ),
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
  bbqDonationItems: v.array(bbqDonationItemSchema),
  sponsorTiers: v.array(sponsorTierSchema),
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
      bbqDonationItems: [
        { name: "Chicken skewers", price: 12 },
        { name: "Veggie skewers", price: 10 },
      ],
      sponsorTiers: [
        {
          title: "Gold",
          price: 500,
          description: "Premium visibility and lounge access.",
          points: [
            "Logo placement on all event materials",
            "Social media mention",
          ],
        },
        {
          title: "Silver",
          price: 250,
          description: "Great brand placement for community partners.",
          points: ["Booth space", "Event program recognition"],
        },
        {
          title: "Bronze",
          price: 100,
          description: "Supporter spotlight at the venue.",
          points: [
            "Name listed on sponsor wall",
            "Thank-you mention during announcements",
          ],
        },
      ],
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
          <FormischField of={form} path={["idSlug"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2"
              >
                <FieldLabel htmlFor="idSlug">ID / Slug</FieldLabel>
                <Input
                  id="idSlug"
                  placeholder="summer-festival-2026"
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                <FieldDescription>
                  Provide a form id/slug. It will be the form url path.
                </FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={["title"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2"
              >
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="Summer Festival"
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                <FieldDescription>
                  Provide form name. It will appear in the form.
                </FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={["subtitle"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2 md:col-span-2"
              >
                <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
                <Input
                  id="subtitle"
                  placeholder="A community celebration with music and food"
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                <FieldDescription>
                  Provide form subtitle. It will appear in the form.
                </FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={["description"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2 md:col-span-2"
              >
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Describe the event experience, activities, and theme."
                  {...field.props}
                  value={field.input ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                <FieldDescription>
                  Provide form description. It will appear in the form.
                </FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5">
          <div>
            <h2 className="text-lg font-semibold">Required fields</h2>
            <p className="text-sm text-muted-foreground">
              Choose which attendee fields should be mandatory.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <FormischField of={form} path={["requiredFields", "name"]}>
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
            </FormischField>

            <FormischField of={form} path={["requiredFields", "email"]}>
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
            </FormischField>

            <FormischField of={form} path={["requiredFields", "phone"]}>
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
            </FormischField>
          </div>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5">
          <FormischField of={form} path={["maxGuestsAllowed"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2"
              >
                <FieldLabel htmlFor="maxGuestsAllowed">
                  Max guests allowed
                </FieldLabel>
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
                <FieldDescription>
                  Set maximum allowed number of guests.
                </FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5">
          <FormischField of={form} path={["tshirtPrice"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2"
              >
                <FieldLabel htmlFor="tshirtPrice">T-shirt price</FieldLabel>
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
                <FieldDescription>Set price for T-shirt.</FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5">
          <FormischField of={form} path={["vipAccessPrice"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2"
              >
                <FieldLabel htmlFor="vipAccessPrice">
                  VIP access price
                </FieldLabel>
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
                <FieldDescription>Set price for VIP access.</FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">BBQ donation options</h2>
              <p className="text-sm text-muted-foreground">
                Add menu items and their pricing for the BBQ donation section.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                insert(form, {
                  path: ["bbqDonationItems"],
                  initialInput: {
                    name: "New BBQ item",
                    price: 0,
                  },
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add item
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <FormischField of={form} path={["bbqDonationType"]}>
              {(field) => (
                <div className="grid gap-2">
                  <FieldLabel>BBQ donation option</FieldLabel>
                  <Select
                    value={field.input ?? "one-time"}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a donation option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">
                        One-time donation
                      </SelectItem>
                      <SelectItem value="monthly">Monthly donation</SelectItem>
                      <SelectItem value="sponsor">Sponsor package</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.errors?.[0] ? (
                    <p className="text-xs text-destructive">
                      {field.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </FormischField>

            <FormischField of={form} path={["bbqDonationAmount"]}>
              {(field) => (
                <Field
                  data-invalid={field.errors !== null}
                  className="grid gap-2"
                >
                  <FieldLabel htmlFor="bbqDonationAmount">
                    BBQ donation amount
                  </FieldLabel>
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
                    <p className="text-xs text-destructive">
                      {field.errors[0]}
                    </p>
                  ) : null}
                </Field>
              )}
            </FormischField>
          </div>

          <FieldArray of={form} path={["bbqDonationItems"]}>
            {(array) => (
              <div className="space-y-3">
                {array.items.map((itemId, index) => (
                  <div
                    key={itemId}
                    className="grid gap-3 rounded-xl border bg-background p-4 md:grid-cols-[1.2fr_0.8fr_auto]"
                  >
                    <FormischField
                      of={form}
                      path={["bbqDonationItems", index, "name"]}
                    >
                      {(field) => (
                        <Field
                          data-invalid={field.errors !== null}
                          className="grid gap-2"
                        >
                          <FieldLabel htmlFor={`bbq-item-name-${index}`}>
                            Item name
                          </FieldLabel>
                          <Input
                            id={`bbq-item-name-${index}`}
                            placeholder="e.g. Pulled pork sandwich"
                            {...field.props}
                            value={field.input ?? ""}
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                          />
                          {field.errors?.[0] ? (
                            <p className="text-xs text-destructive">
                              {field.errors[0]}
                            </p>
                          ) : null}
                        </Field>
                      )}
                    </FormischField>

                    <FormischField
                      of={form}
                      path={["bbqDonationItems", index, "price"]}
                    >
                      {(field) => (
                        <Field
                          data-invalid={field.errors !== null}
                          className="grid gap-2"
                        >
                          <FieldLabel htmlFor={`bbq-item-price-${index}`}>
                            Price
                          </FieldLabel>
                          <Input
                            id={`bbq-item-price-${index}`}
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
                        </Field>
                      )}
                    </FormischField>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="self-end"
                      onClick={() =>
                        remove(form, {
                          path: ["bbqDonationItems"],
                          at: index,
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5">
          <div>
            <h2 className="text-lg font-semibold">Sponsor tiers</h2>
            <p className="text-sm text-muted-foreground">
              Configure the three available sponsor packages and their benefits.
            </p>
          </div>

          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, tierIndex) => (
              <div
                key={tierIndex}
                className="grid gap-4 rounded-xl border bg-background p-5"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_0.6fr]">
                  <FormischField
                    of={form}
                    path={["sponsorTiers", tierIndex, "title"]}
                  >
                    {(field) => (
                      <Field
                        data-invalid={field.errors !== null}
                        className="grid gap-2"
                      >
                        <FieldLabel htmlFor={`sponsor-tier-title-${tierIndex}`}>
                          Tier title
                        </FieldLabel>
                        <Input
                          id={`sponsor-tier-title-${tierIndex}`}
                          placeholder="Gold"
                          {...field.props}
                          value={field.input ?? ""}
                          onChange={(event) =>
                            field.onChange(event.target.value)
                          }
                        />
                        {field.errors?.[0] ? (
                          <p className="text-xs text-destructive">
                            {field.errors[0]}
                          </p>
                        ) : null}
                      </Field>
                    )}
                  </FormischField>

                  <FormischField
                    of={form}
                    path={["sponsorTiers", tierIndex, "price"]}
                  >
                    {(field) => (
                      <Field
                        data-invalid={field.errors !== null}
                        className="grid gap-2"
                      >
                        <FieldLabel htmlFor={`sponsor-tier-price-${tierIndex}`}>
                          Tier price
                        </FieldLabel>
                        <Input
                          id={`sponsor-tier-price-${tierIndex}`}
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
                      </Field>
                    )}
                  </FormischField>
                </div>

                <FormischField
                  of={form}
                  path={["sponsorTiers", tierIndex, "description"]}
                >
                  {(field) => (
                    <Field
                      data-invalid={field.errors !== null}
                      className="grid gap-2"
                    >
                      <FieldLabel
                        htmlFor={`sponsor-tier-description-${tierIndex}`}
                      >
                        Description
                      </FieldLabel>
                      <Textarea
                        id={`sponsor-tier-description-${tierIndex}`}
                        rows={3}
                        placeholder="Describe what the tier includes."
                        {...field.props}
                        value={field.input ?? ""}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                      {field.errors?.[0] ? (
                        <p className="text-xs text-destructive">
                          {field.errors[0]}
                        </p>
                      ) : null}
                    </Field>
                  )}
                </FormischField>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel>Key points</FieldLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        insert(form, {
                          path: ["sponsorTiers", tierIndex, "points"],
                          initialInput: "",
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add point
                    </Button>
                  </div>

                  <FieldArray
                    of={form}
                    path={["sponsorTiers", tierIndex, "points"]}
                  >
                    {(array) => (
                      <div className="space-y-3">
                        {array.items.map((itemId, pointIndex) => (
                          <div
                            key={itemId}
                            className="flex items-start gap-3 rounded-lg border bg-background p-3"
                          >
                            <FormischField
                              of={form}
                              path={[
                                "sponsorTiers",
                                tierIndex,
                                "points",
                                pointIndex,
                              ]}
                            >
                              {(field) => (
                                <Field className="grid flex-1 gap-2">
                                  <FieldLabel
                                    htmlFor={`sponsor-point-${tierIndex}-${pointIndex}`}
                                  >
                                    Point
                                  </FieldLabel>
                                  <Input
                                    id={`sponsor-point-${tierIndex}-${pointIndex}`}
                                    placeholder="Add a key point"
                                    {...field.props}
                                    value={field.input ?? ""}
                                    onChange={(event) =>
                                      field.onChange(event.target.value)
                                    }
                                  />
                                  {field.errors?.[0] ? (
                                    <p className="text-xs text-destructive">
                                      {field.errors[0]}
                                    </p>
                                  ) : null}
                                </Field>
                              )}
                            </FormischField>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                remove(form, {
                                  path: ["sponsorTiers", tierIndex, "points"],
                                  at: pointIndex,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 rounded-xl border bg-background/70 p-5">
          <FormischField of={form} path={["maxSpadesTeams"]}>
            {(field) => (
              <Field
                data-invalid={field.errors !== null}
                className="grid gap-2"
              >
                <FieldLabel htmlFor="maxSpadesTeams">
                  Max spades teams
                </FieldLabel>
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
                <FieldDescription>
                  Set the maximum number of teams allowed to participate in
                  the Spades game.
                </FieldDescription>
                {field.errors && (
                  <FieldError
                    errors={field.errors.map((message) => ({ message }))}
                  />
                )}
              </Field>
            )}
          </FormischField>
        </div>

        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Button type="submit">Save event settings</Button>
        </div>
      </Form>
    </section>
  );
}
