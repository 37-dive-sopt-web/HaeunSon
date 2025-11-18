import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 15,
});

export const messages = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
});

export const smallMsg = style({
  color: "#333",
});

export const buttons = style({
  display: "flex",
  gap: 4,
});

export const button = recipe({
  base: {
    borderRadius: 8,
    boxSizing: "border-box",
    padding: "0.5rem 2.5rem",
    fontWeight: "bold",
    fontSize: 12,
  },
  variants: {
    btn: {
      exit: {
        border: "1px solid #dadada",
      },
      delete: {
        color: "#ffffff",
        backgroundColor: "#f42d3aff",
      },
    },
  },
});
