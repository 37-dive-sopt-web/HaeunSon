import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/token.css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.s20,
  marginTop: "15rem",
});

export const idLayout = style({
  display: "flex",
  justifyContent: "space-between",
});

export const id = style({
  fontSize: vars.font.size.s12,
  fontWeight: vars.font.weight.bold,
});
