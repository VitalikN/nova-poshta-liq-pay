import { ErrorMessage } from "formik";
import s from "@/sass/layouts/order.module.scss";

export interface ErrorFeedbackProps {
  name: string;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(errorMessage) => <span className={`${s.error} `}>{errorMessage}</span>}
    </ErrorMessage>
  );
};
export default ErrorFeedback;
