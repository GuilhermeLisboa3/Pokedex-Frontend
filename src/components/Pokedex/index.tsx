import { Container } from "reactstrap";
import { TypePokemon } from "../../services/typePokemon";
import CardPokemon from "../cardPokemon";
import PaginationPokemon from "./PaginationPokemon";
import Pokemon from "./Pokemon";
import styles from "./styles.module.scss";

export type pokemonPokedex = {
  name: string;
  url: string;
};
interface props {
  pokemon: TypePokemon | null;
  pokemonsPokedex: TypePokemon[];
  page: number;
  allPages: number;
  setPages: (page: number) => void;
}
const Pokedex = ({
  pokemonsPokedex,
  page,
  allPages,
  setPages,
  pokemon,
}: props) => {
  const onLeftClick = () => {
    if (page > 0) {
      setPages(page - 1);
    }
  };
  const onRightClick = () => {
    if (page + 1 !== allPages) {
      setPages(page + 1);
    }
  };
  return (
    <>
      <Container>
        <div className={styles.pokedexContainer}>
          <div className={styles.pokedexHeader}>
            <h1>Pokedex</h1>
            <PaginationPokemon
              page={page + 1}
              allPages={allPages}
              onLeftClick={onLeftClick}
              onRightClick={onRightClick}
            />
          </div>
          <div>
            {pokemon ? (
              <CardPokemon Pokemon={pokemon} />
            ) : (
              <div className={styles.pokemons}>
                {pokemonsPokedex.map((pokemon, index) => {
                  if (pokemon.sprites.front_default === null) {
                    return null;
                  }
                  if (pokemon.name.length > 16) {
                    return (pokemon.name = pokemon.name.substr(1, 16));
                  }
                  return <Pokemon key={index} pokemonsPokedex={pokemon} />;
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Pokedex;
