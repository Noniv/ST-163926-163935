import styles from "../styles/Input.module.css";

export type InputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const Input = ({ onChange, value }: InputProps) => {
  return <input className={styles.input} onChange={onChange} placeholder="Wklej link do dowolnej strony..." value={value} />;
};

export default Input;
