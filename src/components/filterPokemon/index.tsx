import { Container } from "reactstrap"
import styles from "./styles.module.scss"
import { RiGradienterLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

const FilterPokemon = ()=>{
    const [isOpen, setIsOpen] = useState(false)
    function show(){
        setIsOpen(true)
        if(isOpen === true){
            setIsOpen(false)
        }
    }
    return(
        <Container className={styles.filter}>
            <div>
                <label htmlFor="type" onClick={()=>show()}>
                    <RiGradienterLine/><RiArrowDownSLine/>
                </label>
                <ul id="type" className={isOpen ? styles.ativo : styles.nAtivo} >
                    <li>Grass</li>
                    <li>Ground</li>
                    <li>Fire</li>
                    <li>Fighting</li>
                    <li>Water</li>
                    <li>Ice</li>
                    <li>Psychic</li>
                    <li>Electric</li>
                    <li>Ghost</li>
                    <li>Fairy</li>
                    <li>Bug</li>
                    <li>Stell</li>
                    <li>Dark</li>
                    <li>Poison</li>
                    <li>Rock</li>
                    <li>Normal</li>
                </ul>
            </div>
            <div>
                <label htmlFor="type" onClick={()=>show()}>
                    <RiGradienterLine/><RiArrowDownSLine/>
                </label>
                <ul id="type" className={isOpen ? styles.ativo : styles.nAtivo} >
                    <li>Grass</li>
                    <li>Ground</li>
                    <li>Fire</li>
                    <li>Fighting</li>
                    <li>Water</li>
                    <li>Ice</li>
                    <li>Psychic</li>
                    <li>Electric</li>
                    <li>Ghost</li>
                    <li>Fairy</li>
                    <li>Bug</li>
                    <li>Stell</li>
                    <li>Dark</li>
                    <li>Poison</li>
                    <li>Rock</li>
                    <li>Normal</li>
                </ul>
            </div>
        </Container>
    )
}
export default FilterPokemon