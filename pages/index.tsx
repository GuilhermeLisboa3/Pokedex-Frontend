import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../src/components/common/footer";
import HeaderAuth from "../src/components/common/headerAuth";
import HeaderNoAuth from "../src/components/common/headerNoAuth";
import Pokedex, { pokemonPokedex } from "../src/components/Pokedex";
import ApiPokemon from "../src/services/apiPokemon";
import { TypePokemon } from "../src/services/typePokemon";

const Home: NextPage = () => {
  const [token, setToken] = useState(false);
  const [pokemon, setPokemon] = useState<TypePokemon>();
  const [pokemonPokedex, setPokemonPokedex] = useState<TypePokemon[]>([]);
  const [page, setPage] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const itensPerPage = 25;

  useEffect(() => {
    fecthPokedex();
    if (sessionStorage.getItem("pokemon-token")) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [page]);

  useEffect(()=>{
    onSearchHandler
  },[pokemon])
  const onSearchHandler = async (pokemon: string | number) => {
    if (typeof pokemon === "string") {
      const result = await ApiPokemon.searchPokemon(pokemon.toLowerCase());
      setPokemon(result);
    } else {
      const result = await ApiPokemon.searchPokemon(pokemon);
      setPokemon(result);
    }
  };

  const fecthPokedex = async () => {
    try {
      const data = await ApiPokemon.getPokemons(
        itensPerPage,
        itensPerPage * page
      );
      setAllPages(Math.ceil(data.count / itensPerPage));
      const promises = data.results.map(async (pokemon: pokemonPokedex) => {
        return await ApiPokemon.getPokemonsData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemonPokedex(result);
    } catch (error) {
      console.log("fecthPokedex: ", error);
    }
  };

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link
          rel="shortcut icon"
          href="/pokemon-icon.svg"
          type="image/x-icon"
        />
        <meta property="og:title" content="Pokemon" key="title" />
        <meta name="description" content="Tenha acesso aos pokemons" />
      </Head>
      <div>
        {token ? (
          <HeaderAuth onSearch={onSearchHandler} />
        ) : (
          <HeaderNoAuth onSearch={onSearchHandler} />
        )}
      </div>
      <div className="mb-5">
        <Pokedex
          pokemon={pokemon ? pokemon : null}
          pokemonsPokedex={pokemonPokedex}
          page={page}
          allPages={allPages}
          setPages={setPage}
        />
      </div>
      <Footer/>
    </>
  );
};

export default Home;
