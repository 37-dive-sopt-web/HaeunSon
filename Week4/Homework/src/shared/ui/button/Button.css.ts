import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/shared/styles/token.css";

export const button = recipe({
  base: {
    width: "100%",
    borderRadius: vars.radius.r6,
    padding: vars.space.s8,
    fontWeight: vars.font.weight.bold,
    fontSize: vars.font.size.s12,
  },
  variants: {
    color: {
      default: {
        backgroundColor: vars.color.primary[300],
        color: vars.color.grayscale.white,
        transition: "background-color 0.25s ease",
        ":disabled": {
          backgroundColor: vars.color.primary[100],
          cursor: "inherit",
          pointerEvents: "none",
        },
        ":hover": {
          backgroundColor: vars.color.primary[200],
        },
      },
      navigate: {
        backgroundColor: vars.color.grayscale.white,
        color: vars.color.primary[300],
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});
