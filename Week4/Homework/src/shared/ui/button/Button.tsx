import type { ChildrenProps } from "@/shared/types/common";
import { button } from "./Button.css";

interface ButtonProps extends ChildrenProps {
  onClick?: () => void;
  disabled?: boolean;
  navigate: boolean;
}

const Button = ({ onClick, disabled, navigate, children }: ButtonProps) => {
  return (
    <button
      className={button({ color: navigate ? "navigate" : "default" })}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
