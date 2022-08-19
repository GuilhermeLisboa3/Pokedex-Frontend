import styles from "./styles.module.scss";
import { TbPokeball } from "react-icons/tb";
import { Container } from "reactstrap";
import Link from "next/link";

const HeaderNoAuth = () => {
  return (
    <Container className={styles.header}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type="search"
          placeholder="Search your Pokemon"
        />
        <button className={styles.btn} type="button">
          <TbPokeball className={styles.iconPokemon} />
        </button>
      </div>
      <div className={styles.register}>
        <Link href="/login">
          <button type="button" className={styles.itensNav}>
            Login
          </button>
        </Link>
        <Link href="/login">
          <button type="button" className={styles.itensNav}>
            Register
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default HeaderNoAuth;
