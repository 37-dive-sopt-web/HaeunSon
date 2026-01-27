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

export const message = style({
  marginTop: vars.space.s8,
});

export const link = style({
  color: vars.color.primary[300],
  fontWeight: vars.font.weight.bold,
  cursor: "pointer",
});
