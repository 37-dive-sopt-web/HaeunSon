import { style } from "@vanilla-extract/css";

export const overlay = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

export const content = style({
  backgroundColor: "#ffffff",
  width: "30rem",
  padding: "2rem 0",
  borderRadius: "1rem",
});
