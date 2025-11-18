import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/token.css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.s24,
});

export const error = style({
  color: vars.color.etc.red,
  marginBottom: vars.space.s8,
});
