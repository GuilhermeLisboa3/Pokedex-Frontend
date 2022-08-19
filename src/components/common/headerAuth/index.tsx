import styles from "./styles.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";
import { Container } from "reactstrap";
import Link from "next/link";
import Modal from "react-modal";
import { useState } from "react";
import { useRouter } from "next/router";

Modal.setAppElement("#__next")

const HeaderAuth = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };
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
      <div className={styles.icons}>
        <button className={styles.iconNavegate} onClick={handleOpenModal}>
          <FaUserAlt className={styles.icon} />
        </button>

        <button className={styles.iconNavegate}>
          <Link href="/pokemons">
            <FaHeart className={styles.icon} />
          </Link>
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnEsc={true}
        className={styles.modal}
        overlayClassName={styles.overlayModal}
      >
        <Link href="/user">
          <p className={styles.modalLink}>Meus Dados</p>
        </Link>
        <p className={styles.modalLink} onClick={handleLogout}>
          Sair
        </p>
      </Modal>
    </Container>
  );
};

export default HeaderAuth;
