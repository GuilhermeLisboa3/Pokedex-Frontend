export type PokemonType = {
  id: number;
  name: string;
  photoUrl: string;
  type: string[];
};

const ApiPokemon = {
  searchPokemon: async (idPokemon: string | number) => {
    try {
      if (idPokemon === "" || idPokemon === 0) {
        return;
      }
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`
      );
      const dataPokemon = await response.json();
      return dataPokemon;
    } catch (error) {
      console.log(error);
    }
  },
  getPokemons: async (limit: number = 50, offset: number = 0) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      const dataPokemon = await response.json();
      return dataPokemon;
    } catch (error) {
      console.log(error);
    }
  },
  getPokemonsData: async (urlPokemon: string) => {
    try {
      const response = await fetch(`${urlPokemon}`);
      const dataPokemon = await response.json();
      return dataPokemon;
    } catch (error) {
      console.log(error);
    }
  },
  SpeciesPokemonData: async(url:string)=>{
    try {
      const response = await fetch(`${url}`);
      const dataPokemon = await response.json();
      return dataPokemon;
    } catch (error) {
      console.log(error);
    }
  }
};

export default ApiPokemon;
