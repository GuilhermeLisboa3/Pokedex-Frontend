export type PokemonType = {
  id: number;
  name: string;
  photoUrl: string;
  type: string[];
};

const ApiPokemon = {
  searchPokemon: async (idPokemon: string | number) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`
      );
      const dataPokemon = await response.json();
      return dataPokemon;
    } catch (error) {
      console.log(error);
    }
  },
  dataPokemon: async (pokemon:PokemonType)=>{
    const dataPokemon = await pokemon
    return dataPokemon
  }
};

export default ApiPokemon;
