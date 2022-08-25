import styles from "./styles.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Container } from "reactstrap";
import Link from "next/link";
import Modal from "react-modal";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchPokemon from "../searchPokemon";
import ApiPokemon from "../../../services/apiPokemon";

Modal.setAppElement("#__next")
interface props{
  onSearch: (pokemon: string | number)=>{},
}

const HeaderAuth = ({onSearch}:props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleLogout = () => {
    sessionStorage.clear()
    location.reload()
  };
  const onSearchHandler = async(pokemon: string | number)=>{
    if(pokemon === ''){
    }else{
      onSearch(pokemon)
    }
}
  return (
    <Container className={styles.header}>
      <SearchPokemon onSearch={onSearch}/>
      <div className={styles.icons}>
        <button className={styles.iconNavegate} onClick={handleOpenModal}>
          <FaUserAlt className={styles.icon} />
        </button>

        <button className={styles.iconNavegate}>
          <Link href="/favorites">
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
