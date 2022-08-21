import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CardPokemon from "../src/components/cardPokemon";
import HeaderAuth from "../src/components/common/headerAuth";
import HeaderNoAuth from "../src/components/common/headerNoAuth";
import ApiPokemon from "../src/services/apiPokemon";

const Home: NextPage = () => {
  interface objectPokemon   {
    id:string,
    name:string,
    sprites:{front_default: string},
    types:[
        {
            type:{
            name:string
        }
    }
    ]
  };
  const [token, setToken] = useState(false);
  const [pokemon, setPokemon] = useState<objectPokemon>();

  useEffect(() => {
    if (sessionStorage.getItem("pokemon-token")) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, []);

  const onSearchHandler = async (pokemon: string | number) => {
    if (typeof pokemon === "string") {
      const result = await ApiPokemon.searchPokemon(pokemon.toLowerCase());
      setPokemon(result)
    } else {
      const result = await ApiPokemon.searchPokemon(pokemon);
      setPokemon(result)
    }
  };



  return (
    <>
      <Head>
        <title>Pokemon</title>
        <link
          rel="shortcut icon"
          href="/pokemon-icon.svg"
          type="image/x-icon"
        />
        <meta property="og:title" content="Pokemon" key="title" />
        <meta name="description" content="Tenha acesso aos pokemons" />
      </Head>
      <div>{token ? <HeaderAuth /> : <HeaderNoAuth onSearch={onSearchHandler} />}</div>
      {!pokemon ? null : <CardPokemon Pokemon={pokemon}/>}
    </>
  );
};

export default Home;
