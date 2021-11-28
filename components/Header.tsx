import styles from "../styles/Header.module.css"

const Header = () => {
    return(
    <header className={styles.header}>
        <h1 className={styles.h1}>ST - Projekt</h1>
        <p className={styles.p}>Wklej link do dowolnej strony, a my obliczymy liczbę wystąpień każdej litery oraz wykażemy, że prawo potęgowe rządzi światem!</p>
    </header>
    )
}

export default Header;