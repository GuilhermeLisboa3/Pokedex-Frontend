import { Container } from "reactstrap";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import styles from "./styles.module.scss";
import stylesCardPokemon from "../../../styles/cardPokemon.module.scss"

export type PokedexPokemon = {
    id: string;
    name: string;
    sprites: { front_default: string };
    types: [
      {
        type: {
          name: string;
        };
      }
    ];
}
interface props {
  Pokemon: PokedexPokemon
}
const CardPokemon = ({ Pokemon }: props) => {
  const typePokemon = Pokemon.types.map((type) => type.type.name);

  const typeOne = typePokemon[0];
  const typeTwo = typePokemon[1];

  function ClassTypePokemon(typePokemon:string){
    if(typePokemon === 'normal') return stylesCardPokemon.normal
    if(typePokemon === 'fighting') return stylesCardPokemon.fighting
    if(typePokemon === 'flying') return stylesCardPokemon.flying
    if(typePokemon === 'poison') return stylesCardPokemon.poison
    if(typePokemon === 'ground') return stylesCardPokemon.ground
    if(typePokemon === 'rock') return stylesCardPokemon.rock
    if(typePokemon === 'bug') return stylesCardPokemon.bug
    if(typePokemon === 'ghost') return stylesCardPokemon.ghost
    if(typePokemon === 'steel') return stylesCardPokemon.steel
    if(typePokemon === 'fire') return stylesCardPokemon.fire
    if(typePokemon === 'water') return stylesCardPokemon.water
    if(typePokemon === 'grass') return stylesCardPokemon.grass
    if(typePokemon === 'electric') return stylesCardPokemon.electric
    if(typePokemon === 'psychic') return stylesCardPokemon.psychic
    if(typePokemon === 'ice') return stylesCardPokemon.ice
    if(typePokemon === 'dragon') return stylesCardPokemon.dragon
    if(typePokemon === 'dark') return stylesCardPokemon.dark
    if(typePokemon === 'fairy') return stylesCardPokemon.fairy
  }
  return (
    <>
      <Container>
        <div className={styles.cardPokemon} >
          <img
            className={styles.imgPokemon}
            src={Pokemon.sprites.front_default}
            alt={Pokemon.name}
          />
          <span><FaRegHeart className={styles.favorite} /></span>
          <p className={styles.idPokemon}>N°{Pokemon.id}</p>
          <p className={styles.namePokemon}>{Pokemon.name}</p>
          {typePokemon.length > 1 ? (
            <p className={styles.twoTypes}>
              <span className={ClassTypePokemon(typeOne)}>{typePokemon[0]}</span>
              <span className={ClassTypePokemon(typeTwo)}>{typePokemon[1]}</span>
            </p>
          ) : (
            <p className={styles.oneTypes}>
              <span className={ClassTypePokemon(typeOne)}>{typePokemon[0]}</span>
            </p>
          )}
        </div>
      </Container>
    </>
  );
};

export default CardPokemon;
