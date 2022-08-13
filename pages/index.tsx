import type { NextPage } from 'next'
import Head from 'next/head'
import HeaderNoAuth from '../src/components/common/headerAuth'

const Home: NextPage = () => {
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
        <meta
          name="description"
          content="Tenha acesso aos pokemons"
        />
      </Head>
      <div>
        <HeaderNoAuth/>
      </div>
    </>
  )
}

export default Home
