import Head from "next/head";
import { FormGroup, Input, Label, Form } from "reactstrap";
import styles from "../styles/login.module.scss";
import { IoIosLock } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ToastComponent from "../src/components/common/toas";
import authService from "../src/services/authService";

const Login = function () {
  const router = useRouter();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(()=>{
    if(sessionStorage.getItem("pokemon-token")){
      router.push("/")
    }
  },[])

  useEffect(() => {
    const registerSucess = router.query.registred;
    if (registerSucess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Cadastro feito com sucesso!");
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push("/");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Email ou senha incorretos!");
    }
  };

  return (
    <>
      <Head>
        <title>Pokedex - Registro</title>
        <link
          rel="shortcut icon"
          href="/pokemon-icon.svg"
          type="image/x-icon"
        />
        <meta property="og:title" content="Pokedex" key="title" />
        <meta
          name="description"
          content="Tenha acesso a toda as descrição dos pokemons"
        />
      </Head>
      <main className={styles.main}>
        <Form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.imagens}>
            <img
              className={styles.imgPokemon}
              src="/greninja.png"
              alt="greninja"
            />
            <Link href={"/"}>
              <img
                className={styles.imgLogo}
                src="/pokedexLogo.png"
                alt="pokedexLogo"
              />
            </Link>
            <img
              className={styles.imgPokemon}
              src="/charizard.png"
              alt="charizard"
            />
          </div>
          <FormGroup className={styles.formGroup}>
            <Label for="email" className={styles.label}>
              <IoIosMail className={styles.icon} />
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              required
              className={styles.inputName}
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label for="password" className={styles.label}>
              <IoIosLock className={styles.icon} />
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              required
              className={styles.inputName}
            />
          </FormGroup>
          <button type="submit" className={styles.btn}>ENTRAR</button>
        </Form>
        <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
};

export default Login;
