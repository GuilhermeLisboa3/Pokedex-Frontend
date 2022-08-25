import Head from "next/head";

const Favorite = () => {
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
        <p>Olá mundo</p>
      </div>
    </>
  );
};

export default Favorite;
