
const Pokemon ={
    showPokemons: async ()=>{
        const UrlPokemons = (id:number) => `https://pokeapi.co/api/v2/pokemon/${id}`

        const allPokemon = []

        for(let p = 0 ; p <= 905 ; p++){
            const response = await fetch(UrlPokemons(p))
            const data = await response.json()
            allPokemon.push(UrlPokemons(data))
        }

        return allPokemon
    }
} 

export default Pokemon