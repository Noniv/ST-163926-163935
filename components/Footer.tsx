import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        Strona została wykonana jako projekt z przedmiotu Systemy Teleinformatyczne.
        <br />
        EF3/TT-DI L04
      </div>
      <div className={styles.right}>
        Twórcy:
        <br />
        Mateusz Aliyev
        <br />
        Maksymilian Dendura
      </div>
    </footer>
  );
};

export default Footer;
