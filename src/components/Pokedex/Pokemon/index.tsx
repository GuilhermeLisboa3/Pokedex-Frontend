import { ClassTypePokemon } from "../../cardPokemon";
import styles from "../../../../styles/cardPokemon.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import PokemonService, {
  PokemonParams,
} from "../../../services/pokemonService";
import ToastComponent from "../../common/toas";
import DataPokemon from "../DataPokemon";
import Modal from "react-modal";
import stylesModal from "./modal.module.scss";
import ApiPokemon from "../../../services/apiPokemon";
import { SpeciesPokemon, TypePokemon } from "../../../services/typePokemon";
import { AiOutlineClose } from "react-icons/ai";


interface props {
  pokemonsPokedex: TypePokemon;
}

const Pokemon = ({ pokemonsPokedex }: props) => {
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [favorite, setFavorite] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDataPokemon, setShowDataPokemon] = useState<TypePokemon>();
  const [speciesPokemon, setSpeciesPokemon] = useState<SpeciesPokemon>();

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const typePokemon = pokemonsPokedex.types.map((type) => type.type.name);
  const typeOne = typePokemon[0];
  const typeTwo = typePokemon[1];

  useEffect(() => {
    pokemonsInFavorites();
  }, []);

  const verifyTypePokemon = (type: string) => {
    return ClassTypePokemon(type);
  };

  const pokemonsInFavorites = async () => {
    if (sessionStorage.getItem("pokemon-token")) {
      const { data } = await PokemonService.getAddPokemon();
      if(data.length >= 0){
        const addPokemonListFavorite = data.forEach((pokemon: PokemonParams) => {
          if (pokemon.namePokemon === pokemonsPokedex.name) {
            const ListPokemon = [...favorite];
            ListPokemon.push(pokemon.namePokemon);
            setFavorite(ListPokemon);
          }
        });
      }
    }
  };
 
  async function addFavorite() {
    if (!sessionStorage.getItem("pokemon-token")) {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(
        "Log in or create an account, before trying to favorite a pokemon"
      );
      return;
    }
    const updateFavorite = [...favorite];
    const verifyPokemonFavorite = favorite.indexOf(pokemonsPokedex.name);
    if (verifyPokemonFavorite >= 0) {
      const { data, status } = await PokemonService.removePokemon(
        pokemonsPokedex.id
      );
      if (status === 200) {
        setToastColor("bg-danger");
        setToastIsOpen(true);
        setTimeout(() => {
          setToastIsOpen(false);
        }, 1000 * 3);
        setToastMessage("Pokemon removed from favorite list");
      }
      updateFavorite.splice(verifyPokemonFavorite, 1);
    } else {
      const params = {
        idPokemon: Number(pokemonsPokedex.id),
        namePokemon: pokemonsPokedex.name,
        photoPokemon: pokemonsPokedex.sprites.front_default,
        types:
          pokemonsPokedex.types.length > 1 ? [typeOne, typeTwo] : [typeOne],
        urlSpecies:pokemonsPokedex.species.url
      };
      const { data, status } = await PokemonService.addFavoritePokemon(params);
      if (status === 200) {
        setToastColor("bg-success");
        setToastIsOpen(true);
        setTimeout(() => {
          setToastIsOpen(false);
        }, 1000 * 3);
        setToastMessage("Pokemon added to favorites");
      }
      updateFavorite.push(pokemonsPokedex.name);
    }
    setFavorite(updateFavorite);
  }

  async function getNamePokemon() {
    const showDataPokemon = await ApiPokemon.searchPokemon(pokemonsPokedex.id);
    const speciesPokemon = await ApiPokemon.SpeciesPokemonData(pokemonsPokedex.species.url)
    setShowDataPokemon(showDataPokemon);
    setSpeciesPokemon(speciesPokemon)
    handleOpenModal();
  };
  const pokemonFavorite = favorite.includes(pokemonsPokedex.name) ? (
    <FaHeart className={styles.favoriteRed} />
  ) : (
    <FaRegHeart className={styles.favorite} />
  );
  return (
    <>
      <div
        className={styles.cardPokemon}
        onClick={() => getNamePokemon()}
      >
        <img
          className={styles.imgPokemon}
          src={pokemonsPokedex.sprites.front_default}
          alt={pokemonsPokedex.name}
        />
        <button className={styles.buttonFavorite} onMouseDown={addFavorite}>{pokemonFavorite}</button>
        <p className={styles.idPokemon}>N°{pokemonsPokedex.id}</p>
        <p className={styles.namePokemon}>{pokemonsPokedex.name}</p>
        {typePokemon.length > 1 ? (
          <p className={styles.twoTypes}>
            <span className={verifyTypePokemon(typeOne)}>{typePokemon[0]}</span>
            <span className={verifyTypePokemon(typeTwo)}>{typePokemon[1]}</span>
          </p>
        ) : (
          <p className={styles.oneTypes}>
            <span className={verifyTypePokemon(typeOne)}>{typePokemon[0]}</span>
          </p>
        )}
      </div>
      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
      {modalOpen ? (
        <Modal
          isOpen={modalOpen}
          className={stylesModal.modal}
          shouldCloseOnEsc={true}
        >
            <AiOutlineClose onClick={handleCloseModal} className={stylesModal.icon}/>
            <button className={stylesModal.buttonFavorite} onMouseDown={addFavorite}>{pokemonFavorite}</button>
            <DataPokemon pokemon={showDataPokemon!} speciesPokemon={speciesPokemon!} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Pokemon;
