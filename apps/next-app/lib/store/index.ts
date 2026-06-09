import { create } from "zustand";

export type Relation =
  | "Husband"
  | "Wife"
  | "Son"
  | "dughter"
  | "Father"
  | "Mother"
  | "Brother"
  | "Sister"
  | "Uncle"
  | "Aunt"
  | "Grand-Father"
  | "Grand-Mother"
  | "Friend";

export type Guest = {
  name: string;
  relation: Relation;
};

export type TShirt = {
  quantity: number;
  size: "S" | "M" | "L" | "XL" | "XXL";
};

export type FormState = {
  attand: boolean;
  name: string;
  email: string;
  phone: string;
  guests: Guest[];
  tshirt: TShirt[];
  spadesTeam: boolean;
};

export type Actions = {
  setAttand: (attand: FormState["attand"]) => void;
  setName: (name: FormState["name"]) => void;
  setEmail: (email: FormState["email"]) => void;
  setPhone: (phone: FormState["phone"]) => void;
  setGuests: (guests: FormState["guests"]) => void;
  setTshirt: (tshirt: FormState["tshirt"]) => void;
  setSpadesTeam: (spadesTeam: FormState["spadesTeam"]) => void;
};

export const initialFormState: FormState = {
  attand: false,
  name: "",
  email: "",
  phone: "",
  guests: [],
  tshirt: [{ quantity: 0, size: "M" }],
  spadesTeam: false,
};

export const useFormStore = create<FormState & Actions>((set) => ({
  ...initialFormState,
  setAttand: (attand) => set({ attand }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  setGuests: (guests) => set({ guests }),
  setTshirt: (tshirt) => set({ tshirt }),
  setSpadesTeam: (spadesTeam) => set({ spadesTeam }),
}));
