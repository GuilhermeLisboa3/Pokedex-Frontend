import api from "./api";

export interface Pokemon {
  idPokemon: number;
  namePokemon: string;
  photoUrl: string;
  typePokemon: string[];
}
const PokemonService = {
  addFavoritePokemon: async (params: Pokemon) => {
    const token = sessionStorage.getItem('pokemon-token')
    console.log(token)
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
    const result = await api.get('/pokemon')
        .catch(error =>{
            if(error.response.status === 400){
                return error.response
            }
            return error
        })
        return result
  },
  removePokemon: async(id:number)=>{
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
