import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/cardPokemon.module.scss";
import stylesRegister from "../styles/favorite.module.scss";
import { FaHeart } from "react-icons/fa";
import PokemonService, { PokemonParams } from "../src/services/pokemonService";
import { Container } from "reactstrap";
import { ClassTypePokemon } from "../src/components/cardPokemon";
import Link from "next/link";
import ToastComponent from "../src/components/common/toas";
import Modal from "react-modal";
import stylesModal from "../src/components/Pokedex/Pokemon/modal.module.scss";
import { SpeciesPokemon, TypePokemon } from "../src/services/typePokemon";
import ApiPokemon from "../src/services/apiPokemon";
import { AiOutlineClose } from "react-icons/ai";
import DataPokemon from "../src/components/Pokedex/DataPokemon";

const Favorite = () => {
  const [verifyPokemon, setVerifyPokemon] = useState(false)
  const [pokemons, setPokemons] = useState<PokemonParams[]>([]);
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showDataPokemon, setShowDataPokemon] = useState<TypePokemon>();
  const [speciesPokemon, setSpeciesPokemon] = useState<SpeciesPokemon>();
  const [pokemonId,setPokemonId] = useState<number>()
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    seeFavoritePokemons();
  }, []);
  const seeFavoritePokemons = async () => {
    const { data } = await PokemonService.getAddPokemon();
    if(data.length === 0){
      setVerifyPokemon(false)
    }else{
      setVerifyPokemon(true)
      setPokemons(data);
    }
  };
  const verifyTypePokemon = (type:string)=>{
    return ClassTypePokemon(type)
  }
  const removePokemonFavorites = async()=>{
      const {data, status} = await PokemonService.removePokemon(pokemonId!)
      if(status === 200){
        setToastColor('bg-danger')
        setToastIsOpen(true)
        setToastMessage("Pokemon removed from favorite list");
      }
    location.reload()
}
  async function getNamePokemon(pokemon:PokemonParams){
      const showDataPokemon = await ApiPokemon.searchPokemon(pokemon.namePokemon);
      const speciesPokemon = await ApiPokemon.SpeciesPokemonData(pokemon.urlSpecies)
      setPokemonId(pokemon.idPokemon)
      setShowDataPokemon(showDataPokemon);
      setSpeciesPokemon(speciesPokemon)
      handleOpenModal();
  };
  const noPokemon = "You don't have any favorite pokemons."
  return (
    <>
      <Head>
        <title>Favorite</title>
        <link
          rel="shortcut icon"
          href="/pokemon-icon.svg"
          type="image/x-icon"
        />
        <meta property="og:title" content="Pokemon" key="title" />
        <meta name="description" content="Tenha acesso aos pokemons" />
      </Head>
      <Container>
        <div className={stylesRegister.header}>
            <Link href="/">
              <img src="/pokedexLogo.png" alt="logo pokedex" className={stylesRegister.imgLogo}/>
            </Link>
        </div>
        <div className={stylesRegister.listPokemons}>
          {verifyPokemon ? (
            pokemons.map((pokemon: PokemonParams) => (
              <div key={pokemon.idPokemon} className={styles.cardPokemon}
              onClick={()=>getNamePokemon(pokemon)}>
                <img
                  className={styles.imgPokemon}
                  src={pokemon.photoPokemon}
                  alt={pokemon.namePokemon}
                />
                <p className={styles.idPokemon}>N°{pokemon.idPokemon}</p>
                <p className={styles.namePokemon}>{pokemon.namePokemon}</p>
                {pokemon.types.length > 1 ? (
                  <p className={styles.twoTypes}>
                    <span className={verifyTypePokemon(pokemon.types[0])}>
                      {pokemon.types[0]}
                    </span>
                    <span className={verifyTypePokemon(pokemon.types[1])}>
                      {pokemon.types[1]}
                    </span>
                  </p>
                ) : (
                  <p className={styles.oneTypes}>
                    <span className={verifyTypePokemon(pokemon.types[0])}>
                    {pokemon.types[0]}
                    </span>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className={stylesRegister.noPokemon}>{noPokemon}</p>
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
          shouldCloseOnEsc={true}
        >
            <AiOutlineClose onClick={handleCloseModal} className={stylesModal.icon}/>
            <button className={stylesModal.buttonFavorite} onClick={()=>removePokemonFavorites()}><FaHeart className={styles.favoriteRed}/></button>
            <DataPokemon pokemon={showDataPokemon!} speciesPokemon={speciesPokemon!} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Favorite;
