import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/token.css";

export const header = style({
  display: "flex",
  justifyContent: "space-around",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "10rem",
  padding: `${vars.space.s20} 0`,
  backgroundColor: vars.color.primary[300],
  color: vars.color.grayscale.white,
});

export const message = style({
  fontSize: vars.font.size.s12,
});

export const menuWrap = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.s16,
});

export const menu = style({
  color: vars.color.opacity.white60,
  fontSize: vars.font.size.s14,
  fontWeight: vars.font.weight.bold,
});

export const active = style({
  color: vars.color.grayscale.white,
  fontSize: vars.font.size.s14,
  fontWeight: vars.font.weight.bold,
});
