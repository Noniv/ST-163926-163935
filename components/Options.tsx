import styles from "../styles/Options.module.css";

export type OptionProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: number;
};

const Options = ({ onChange, value }: OptionProps) => {
  return (
    <select className={styles.select} onChange={onChange} value={value}>
      <option value="0">Policz litery</option>
      <option value="1">Policz słowa</option>
    </select>
  );
};

export default Options;
