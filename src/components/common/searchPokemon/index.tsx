import styles from "./styles.module.scss";
import { TbPokeball } from "react-icons/tb";
import { useEffect, useState } from "react";

interface props{
  onSearch: (pokemon: string | number)=> void,

}

const SearchPokemon = ({onSearch}:props) => {
  const [search, setSearch] = useState('')
  useEffect(()=>{
    if(search === ''){
    }
  },[search])
  const onChangeHandler = (e:any) =>{
      setSearch(e.target.value);
  }
  const onButtonClickHandler = async (e:any)=>{
    onSearchHandler()
  }
  const onSearchHandler = async()=>{
      onSearch(search)
  }
  return (
    <>
    <div className={styles.Container}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type="search"
          placeholder="Search your Pokemon"
          onChange={onChangeHandler}
        />
        <button 
        className={styles.btn} 
        type="button"
        onClick={onButtonClickHandler}>
          <TbPokeball className={styles.iconPokemon} />
        </button>
      </div>
    </div>
    </>
  );
};

export default SearchPokemon