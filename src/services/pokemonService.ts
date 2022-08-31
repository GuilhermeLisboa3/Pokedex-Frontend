import api from "./api";

export interface PokemonParams {
  idPokemon: number;
  namePokemon: string;
  photoPokemon:string;
  types:string[]
  urlSpecies:string
}
const PokemonService = {
  addFavoritePokemon: async (params: PokemonParams) => {
    const token = sessionStorage.getItem('pokemon-token')
    const result = await api.post('/pokemon',params)
        .catch(error =>{
            if(error.response.status === 400){
                return error.response
            }
            return error
        })
        return result
  },
  getAddPokemon: async()=>{
    const result = await api.get('/pokemons')
        .catch(error =>{
            if(error.response.status === 400){
                return error.response
            }
            return error
        })
        return result
  },
  removePokemon: async(id:string | number)=>{
    const result = await api.delete(`/pokemon/${id}`)
        .catch(error =>{
            if(error.response.status === 400){
                return error.response
            }
            return error
        })
        return result
  }
};

export default PokemonService;
