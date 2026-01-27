import { formHeader } from "./FormHeader.css";

interface FormHeaderProps {
  title: string;
}

const FormHeader = ({ title }: FormHeaderProps) => {
  return <header className={formHeader}>{title}</header>;
};

export default FormHeader;
