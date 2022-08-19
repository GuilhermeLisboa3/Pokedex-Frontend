import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import HeaderAuth from "../src/components/common/headerAuth";
import HeaderNoAuth from "../src/components/common/headerNoAuth";
import FilterPokemon from "../src/components/filterPokemon";

const Home: NextPage = () => {
  const [token, setToken] = useState(false)

    useEffect(()=>{
      if(sessionStorage.getItem("pokemon-token")){
        setToken(true)
      }else{
        setToken(false)
      }
    },[])

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
      <div>  
        {token ?  <HeaderAuth/> : <HeaderNoAuth/>}
        <FilterPokemon/>
      </div>
    </>
  );
};

export default Home;
