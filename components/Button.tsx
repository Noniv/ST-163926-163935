import styles from "../styles/Button.module.css";

export type ButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({onClick}: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>Oblicz i pokaż wykres</button>
    );
  };
  
  export default Button;