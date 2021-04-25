import styles from "./styles.module.scss";

export default function Header(props) {
  return (
    <div className={styles.headerContainer}>
      <img src="logo.svg" alt="vitrola de vozes" />
      <p>Vitrola de Vozes</p>
    </div>
  );
}
