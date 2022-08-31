import { Container } from 'reactstrap';
import styles from './styles.module.scss';
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import Link from 'next/link';



const Footer = ()=>{
    return(
        <>
            <Container className={styles.footerContainer}>
                <p className={styles.name}><FaRegCopyright/> Guilherme Gonçalves Lisboa</p>
                <div className={styles.icons}>
                    <Link href="https://www.linkedin.com/in/guilherme-gon%C3%A7alves-lisboa-abb8b0227/">
                        <a target="_blank" className={styles.linkIcon}>
                            <FaLinkedinIn className={styles.icon}/>
                        </a>
                    </Link>
                    <Link href="https://github.com/GuilhermeLisboa3">
                        <a target="_blank" className={styles.linkIcon}>
                            <FaGithub className={styles.icon}/>
                        </a>
                    </Link>
                    <Link href="https://www.instagram.com/guime.lisboa/">
                        <a target="_blank" className={styles.linkIcon}>
                            <FaInstagram className={styles.icon}/>
                        </a>
                    </Link>
                    
                </div>
            </Container>
        </>
    )
}

export default Footer;