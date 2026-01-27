import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/token.css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.s20,
  marginTop: vars.space.s56,
});

export const backbtn = recipe({
  base: {
    marginBottom: vars.space.s8,
    width: "2rem",
    height: "2rem",
  },
  variants: {
    cursor: {
      default: {
        cursor: "inherit",
      },
      pointer: {
        cursor: "pointer",
      },
    },
  },
});
