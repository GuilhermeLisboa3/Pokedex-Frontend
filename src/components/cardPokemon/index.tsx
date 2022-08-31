import { Container } from "reactstrap";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import styles from "../../../styles/cardPokemon.module.scss";
import stylesCardPokemon from "../../../styles/cardColorPokemon.module.scss";
import PokemonService, { PokemonParams } from "../../services/pokemonService";
import { useEffect, useState } from "react";
import ToastComponent from "../common/toas";
import { SpeciesPokemon, TypePokemon } from "../../services/typePokemon";
import Modal from "react-modal";
import stylesModal from "../Pokedex/Pokemon/modal.module.scss";
import ApiPokemon from "../../services/apiPokemon";
import DataPokemon from "../Pokedex/DataPokemon";
import { AiOutlineClose } from "react-icons/ai";

interface props {
  Pokemon: TypePokemon;
}
export function ClassTypePokemon(typePokemon: string) {
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
const CardPokemon = ({ Pokemon }: props) => {
  const [verifyPokemonFavorite, setVerifyPokemonFavorite] = useState(false);
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showDataPokemon, setShowDataPokemon] = useState<TypePokemon>();
  const [speciesPokemon, setSpeciesPokemon] = useState<SpeciesPokemon>();
  const [favorite, setFavorite] = useState<string[]>([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const typePokemon = Pokemon.types.map((type) => type.type.name);

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
  useEffect(() => {
    pokemonsInFavorites();
  }, []);

  const pokemonsInFavorites = async () => {
    if (sessionStorage.getItem("pokemon-token")) {
      const { data, status } = await PokemonService.getAddPokemon();
      let ListPokemon = [...favorite];
      data.forEach((pokemon: PokemonParams) => {
        ListPokemon.push(pokemon.namePokemon);
      });
      setFavorite(ListPokemon);
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
    const verifyPokemonFavorite = favorite.indexOf(Pokemon.name);
    if (verifyPokemonFavorite >= 0) {
      const params = Pokemon.id;
      const { data, status } = await PokemonService.removePokemon(params);
      if (status === 200) {
        setToastColor("bg-danger");
        setToastIsOpen(true);
        setTimeout(() => {
          setToastIsOpen(false);
        }, 1000 * 3);
        setToastMessage("Pokemon removed from favorite list");
        setVerifyPokemonFavorite(false);
      }
      updateFavorite.splice(verifyPokemonFavorite, 1);
    } else {
      const params = {
        idPokemon: Number(Pokemon.id),
        namePokemon: Pokemon.name,
        photoPokemon: Pokemon.sprites.front_default,
        types: Pokemon.types.length > 1 ? [typeOne, typeTwo] : [typeOne],
        urlSpecies: Pokemon.species.url,
      };
      const { data, status } = await PokemonService.addFavoritePokemon(params);

      if (status === 200) {
        setToastColor("bg-success");
        setToastIsOpen(true);
        setTimeout(() => {
          setToastIsOpen(false);
        }, 1000 * 3);
        setToastMessage("Pokemon added to favorites");
        setVerifyPokemonFavorite(true);
      }
      updateFavorite.push(Pokemon.name);
    }
    setFavorite(updateFavorite);
  }
  const pokemonFavorite = favorite.includes(Pokemon.name) ? (
    <FaHeart className={styles.favoriteRed} />
  ) : (
    <FaRegHeart className={styles.favorite} />
  );
  async function getNamePokemon() {
    const showDataPokemon = await ApiPokemon.searchPokemon(Pokemon.id);
    const speciesPokemon = await ApiPokemon.SpeciesPokemonData(
      Pokemon.species.url
    );
    setShowDataPokemon(showDataPokemon);
    setSpeciesPokemon(speciesPokemon);
    handleOpenModal();
  }
  return (
    <>
      <Container>
        <div className={styles.cardPokemon} onClick={() => getNamePokemon()}>
          <img
            className={styles.imgPokemon}
            src={Pokemon.sprites.front_default}
            alt={Pokemon.name}
          />
          <button className={styles.buttonFavorite} onMouseDown={addFavorite}>
            {pokemonFavorite}
          </button>
          <p className={styles.idPokemon}>N°{Pokemon.id}</p>
          <p className={styles.namePokemon}>{Pokemon.name}</p>
          {typePokemon.length > 1 ? (
            <p className={styles.twoTypes}>
              <span className={ClassTypePokemon(typeOne)}>
                {typePokemon[0]}
              </span>
              <span className={ClassTypePokemon(typeTwo)}>
                {typePokemon[1]}
              </span>
            </p>
          ) : (
            <p className={styles.oneTypes}>
              <span className={ClassTypePokemon(typeOne)}>
                {typePokemon[0]}
              </span>
            </p>
          )}
        </div>
      </Container>
      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
      {modalOpen ? (
        <Modal
          isOpen={modalOpen}
          className={stylesModal.modal}
          onRequestClose={handleCloseModal}
          shouldCloseOnEsc={true}
        >
          <AiOutlineClose
            onClick={handleCloseModal}
            className={stylesModal.icon}
          />
          <button
            className={stylesModal.buttonFavorite}
            onMouseDown={addFavorite}
          >
            {pokemonFavorite}
          </button>
          <DataPokemon
            pokemon={showDataPokemon!}
            speciesPokemon={speciesPokemon!}
          />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default CardPokemon;
