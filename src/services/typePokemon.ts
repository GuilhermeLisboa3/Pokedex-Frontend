import styles from '../../styles/bordeAbilityPokemon.module.scss'
export interface TypePokemon{
    id: string;
    name: string;
    sprites: { front_default: string };
    types: [
      {
        type: {
          name: string;
        };
      }
    ];
    height: number;
    weight:number;
    base_experience:number;
    abilities:[
        {
            ability:{
                name:string
            }
        }
    ]
    species:{
        url:string
    }
    stats:[
        {
            base_stat:number
        }
    ]
}


export interface SpeciesPokemon{
    flavor_text_entries:[
        {
            flavor_text:string;
            language:{
                name:string
            }
        }
    ]
}


export function verfiyAbilityPokemon(typePokemon:string){
    if(typePokemon === 'normal') return styles.normal
    if(typePokemon === 'fighting') return styles.fighting
    if(typePokemon === 'flying') return styles.flying
    if(typePokemon === 'poison') return styles.poison
    if(typePokemon === 'ground') return styles.ground
    if(typePokemon === 'rock') return styles.rock
    if(typePokemon === 'bug') return styles.bug
    if(typePokemon === 'ghost') return styles.ghost
    if(typePokemon === 'steel') return styles.steel
    if(typePokemon === 'fire') return styles.fire
    if(typePokemon === 'water') return styles.water
    if(typePokemon === 'grass') return styles.grass
    if(typePokemon === 'electric') return styles.electric
    if(typePokemon === 'psychic') return styles.psychic
    if(typePokemon === 'ice') return styles.ice
    if(typePokemon === 'dragon') return styles.dragon
    if(typePokemon === 'dark') return styles.dark
    if(typePokemon === 'fairy') return styles.fairy
}