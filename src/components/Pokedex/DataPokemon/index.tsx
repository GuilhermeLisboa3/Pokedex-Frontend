import { useState } from "react";
import ApiPokemon from "../../../services/apiPokemon";
import { SpeciesPokemon, TypePokemon, verfiyAbilityPokemon } from "../../../services/typePokemon";
import { ClassTypePokemon } from "../../cardPokemon";
import styles from "./styles.module.scss";

interface props {
  pokemon: TypePokemon;
  speciesPokemon: SpeciesPokemon;
}

const DataPokemon = ({ pokemon, speciesPokemon }: props) => {
  const descriptionPokemon = speciesPokemon.flavor_text_entries.map(
    (description) => {
      const teste = description.language.name;
      if (teste === "en") {
        return description.flavor_text;
      }
    }
  );
  const description = () => {
    for (let d = 0; d < descriptionPokemon.length; d++) {
      if (descriptionPokemon[d] != undefined) {
        return descriptionPokemon[d];
      }
    }
  };
  const verifyAbilitym = pokemon.abilities.map(
    (ability) => ability.ability.name
  );
  const statsPokemon = pokemon.stats.map((habilidades) =>(habilidades.base_stat))

  const typePokemon = pokemon.types.map((type) => type.type.name);
  const typeOne = typePokemon[0];
  const typeTwo = typePokemon[1];
  const verifyTypePokemon = (type: string) => {
    return ClassTypePokemon(type);
  };
  const verfiyAbilityPokemons = (ability:string)=>{
    return verfiyAbilityPokemon(ability)
  }
  return (
    <>
      <div className={styles.containerDataPokemon}>
        <div className={styles.containerImg}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.imgPokemon}/>
        </div>
        <p className={styles.idPokemon}>#{pokemon.id}</p>
        <p className={styles.namePokemon}>{pokemon.name}</p>
        {typePokemon.length > 1 ? (
          <p className={styles.twoTypes}>
            <span className={verifyTypePokemon(typeOne)}>{typePokemon[0]}</span>
            <span className={verifyTypePokemon(typeTwo)}>{typePokemon[1]}</span>
          </p>
        ) : (
          <p className={styles.oneTypes}>
            <span className={verifyTypePokemon(typeOne)}>{typePokemon[0]}</span>
          </p>
        )}
        <p className={styles.descriptionTitle}>POKÉDEX ENTRY</p>
        <p className={styles.description}>{description()}</p>
        <p className={styles.descriptionTitle}>ABILITIES</p>
        {verifyAbilitym.length > 1 ? (
          <div className={styles.twoVerifyAbilitym}>
            <span className={verfiyAbilityPokemons(typeOne)}>
              {verifyAbilitym[0]}
              </span>
            <span  className={verfiyAbilityPokemons(typeTwo ? typeTwo : typeOne)}>
              {verifyAbilitym[1]}
              </span>
          </div>
        ) : (
          <div className={styles.oneVerifyAbilitym}>
            <span  className={verfiyAbilityPokemons(typeOne)}>
               {verifyAbilitym[0]}
            </span>
          </div>
        )}
        <div className={styles.dataBodyPokemon}>
          <p className={styles.dataPokemon}>
            <span className={styles.dataPokemonTitle}>HEIGHT</span>
            <span className={styles.valuePokemon}>{pokemon.height}m</span>
          </p>
          <p className={styles.dataPokemon}>
            <span className={styles.dataPokemonTitle}>WEIGHT</span>
            <span className={styles.valuePokemon}>{pokemon.weight}kg</span>
          </p>
        </div>
        <div className={styles.baseExp}>
          <p className={styles.dataBaseExp}>
            <span className={styles.dataPokemonTitle}>BASE EXP</span>
            <span className={styles.valuePokemon}>{pokemon.base_experience}</span>
          </p>
        </div>

        <p className={styles.descriptionTitle}>STATS</p>
        <div className={styles.stats}>
          <p className={styles.statsPokemon}>
            <span className={styles.hpPokemon}>HP</span>
            <span className={styles.data}>{statsPokemon[0]}</span>
          </p>
          <p className={styles.statsPokemon}>
            <span  className={styles.atkPokemon}>ATK</span>
            <span className={styles.data}>{statsPokemon[1]}</span>
          </p>
          <p className={styles.statsPokemon}>
            <span  className={styles.defPokemon}>DEF</span>
            <span className={styles.data}>{statsPokemon[2]}</span>
          </p>
          <p className={styles.statsPokemon}>
            <span  className={styles.spaPokemon}>SPA</span>
            <span className={styles.data}>{statsPokemon[3]}</span>
          </p>
          <p className={styles.statsPokemon}>
            <span  className={styles.spoPokemon}>SPO</span>
            <span className={styles.data}>{statsPokemon[4]}</span>
          </p>
          <p className={styles.statsPokemon}>
            <span  className={styles.spdPokemon}>SPD</span>
            <span className={styles.data}>{statsPokemon[5]}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DataPokemon;
