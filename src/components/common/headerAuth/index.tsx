import styles from "./styles.module.scss"
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";
import { Container } from "reactstrap";
import Link from "next/link";
const HeaderAuth = ()=>{
    return (
            <Container className={styles.header}>
                <div className={styles.search}>
                    <input className={styles.input} type="search" placeholder="Search your Pokemon"/>
                    <button className={styles.btn} type="button"><TbPokeball className={styles.iconPokemon}/></button>
                </div>
                <div className={styles.icons}>
                    <button className={styles.iconNavegate}>
                        <FaUserAlt className={styles.icon}/>
                    </button>

                    <button className={styles.iconNavegate} >
                        <Link href="/pokemons">
                            <FaHeart className={styles.icon}/>
                        </Link>
                    </button>
                </div>
            </Container>
    )
}

export default HeaderAuth