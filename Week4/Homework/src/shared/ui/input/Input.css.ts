import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/token.css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
});

export const input = style({
  outline: "none",
  border: `1px solid ${vars.color.primary[50]}`,
  borderRadius: vars.radius.r6,
  padding: vars.space.s8,
  fontSize: vars.font.size.s12,
  ":focus": {
    border: `1px solid ${vars.color.primary[100]}`,
  },
});
