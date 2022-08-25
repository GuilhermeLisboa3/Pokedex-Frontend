import { PokedexPokemon } from "../../cardPokemon";
import styles from "./styles.module.scss";
import stylesCardPokemon from "../../../../styles/cardPokemon.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import PokemonService from "../../../services/pokemonService";
import ToastComponent from "../../common/toas";

interface props {
  pokemonsPokedex: PokedexPokemon;
}
const Pokemon = ({ pokemonsPokedex }: props) => {
  const [verifyPokemonFavorite, setVerifyPokemonFavorite ] = useState(false)
  const [toastColor, setToastColor ] = useState('')
  const [toastIsOpen, setToastIsOpen ] = useState(false)
  const [toastMessage, setToastMessage ] = useState("")
  const typePokemon = pokemonsPokedex.types.map((type) => type.type.name);

  const typeOne = typePokemon[0];
  const typeTwo = typePokemon[1];

  function ClassTypePokemon(typePokemon: string) {
    if (typePokemon === "normal") return stylesCardPokemon.normal;
    if (typePokemon === "fighting") return stylesCardPokemon.fighting;
    if (typePokemon === "flying") return stylesCardPokemon.flying;
    if (typePokemon === "poison") return stylesCardPokemon.poison;
    if (typePokemon === "ground") return stylesCardPokemon.ground;
    if (typePokemon === "rock") return stylesCardPokemon.rock;
    if (typePokemon === "bug") return stylesCardPokemon.bug;
    if (typePokemon === "ghost") return stylesCardPokemon.ghost;
    if (typePokemon === "steel") return stylesCardPokemon.steel;
    if (typePokemon === "fire") return stylesCardPokemon.fire;
    if (typePokemon === "water") return stylesCardPokemon.water;
    if (typePokemon === "grass") return stylesCardPokemon.grass;
    if (typePokemon === "electric") return stylesCardPokemon.electric;
    if (typePokemon === "psychic") return stylesCardPokemon.psychic;
    if (typePokemon === "ice") return stylesCardPokemon.ice;
    if (typePokemon === "dragon") return stylesCardPokemon.dragon;
    if (typePokemon === "dark") return stylesCardPokemon.dark;
    if (typePokemon === "fairy") return stylesCardPokemon.fairy;
  }

  async function addFavorite(){
    if(verifyPokemonFavorite === false){
      const params = {
        idPokemon: Number(pokemonsPokedex.id),
        namePokemon: pokemonsPokedex.name,
        photoUrl:pokemonsPokedex.sprites.front_default,
        typePokemon:[typeOne,typeTwo]
      }
      const {data, status} = await PokemonService.addFavoritePokemon(params)
      if(status === 200){
        setToastColor("bg-sucess");
        setToastIsOpen(true);
        setTimeout(() => {
          setToastIsOpen(false);
        }, 1000 * 3);
        setToastMessage("Pokemon adicionado aos favoritos");
        setVerifyPokemonFavorite(true)
      }
      console.log(params)
    }else if(verifyPokemonFavorite === true){
      const params = {idPokemon: pokemonsPokedex.id,}
      const {data, status} = await PokemonService.removePokemon(Number(params))
      if(status === 200){
        setToastColor("bg-sucess");
        setToastIsOpen(true);
        setTimeout(() => {
          setToastIsOpen(false);
        }, 1000 * 3);
        setToastMessage("Pokemon removido dos favoritos");
        setVerifyPokemonFavorite(false)
      }
      console.log(params)
    }
  }
    const pokemonFvorite = verifyPokemonFavorite ? <FaHeart className={styles.favorite}/> : <FaRegHeart className={styles.favorite}/>
  return (
    <>
      <div className={styles.cardPokemon}>
        <img
          className={styles.imgPokemon}
          src={pokemonsPokedex.sprites.front_default}
          alt={pokemonsPokedex.name}
        />
        <span onClick={addFavorite}>
          {
            pokemonFvorite
          }
        </span>
        <p className={styles.idPokemon}>N°{pokemonsPokedex.id}</p>
        <p className={styles.namePokemon}>{pokemonsPokedex.name}</p>
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
      <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
    </>
  );
};

export default Pokemon;
