import styles from "./styles.module.scss";
import { Container } from "reactstrap";
import Link from "next/link";
import SearchPokemon from "../searchPokemon";
import ApiPokemon, { PokemonType } from "../../../services/apiPokemon";

interface props{
  onSearch: (pokemon: string | number)=>{}
}

const HeaderNoAuth = ({onSearch}:props) => {
  const onSearchHandler = async(pokemon: string | number)=>{
      onSearch(pokemon)
}
  
  return (
    <Container className={styles.header}>
      <SearchPokemon onSearch={onSearchHandler}/>
      <div className={styles.register}>
        <Link href="/login">
          <button type="button" className={styles.itensNav}>
            Login
          </button>
        </Link>
        <Link href="/register">
          <button type="button" className={styles.itensNav}>
            Register
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default HeaderNoAuth;
