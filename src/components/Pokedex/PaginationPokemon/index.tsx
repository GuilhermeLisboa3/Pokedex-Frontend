import styles from "./styles.module.scss";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

interface props {
  page: number;
  allPages: number;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const PaginationPokemon = ({
  page,
  allPages,
  onLeftClick,
  onRightClick,
}: props) => {
  return (
    <>
      <div className={styles.pagination}>
        <button 
        className={styles.btnPagination} 
        onClick={onLeftClick}>
          <BsChevronLeft className={styles.iconArrow} />
        </button>
        <div className={styles.pages}>
          {page} de {allPages}
        </div>
        <button 
        className={styles.btnPagination} 
        onClick={onRightClick}>
          <BsChevronRight className={styles.iconArrow} />
        </button>
      </div>
    </>
  );
};

export default PaginationPokemon;
