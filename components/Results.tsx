import styles from "../styles/Results.module.css";

const Results = () => {
  return (
    <div className={styles.results}>
      <h2>Wyniki dla strony nextjs.org: </h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Litera</th>
            <th className={styles.th}>Liczba wystąpień</th>
          </tr>
        </thead>
        <tbody>
          {Array(100)
            .fill(1)
            .map((el, i) => {
              return (
                  <tr className={styles.tr} key={i}>
                    <td className={styles.td}>a</td>
                    <td className={styles.td}>47</td>
                  </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
