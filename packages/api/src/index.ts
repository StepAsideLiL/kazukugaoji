import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" }).get("/", () => ({
  msg: "hello from local api package",
}));
