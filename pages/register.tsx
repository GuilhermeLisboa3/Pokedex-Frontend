import Head from "next/head";
import { FormGroup, Input, Label, Form } from "reactstrap";
import styles from "../styles/register.module.scss";
import { IoIosLock } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ToastComponent from "../src/components/common/toas";
import authService from "../src/services/authService";

const Register = () => {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("pokemon-token")) {
      router.push("/");
    }
  }, []);
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const confirmPassword = formData.get("confirmPassword")!.toString();

    const params = {
      name,
      email,
      password,
      confirmPassword,
    };

    if (password != confirmPassword) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Different password and confirmation");
      return;
    }
    const { data, status } = await authService.register(params);

    if (status === 200) {
      router.push("/login?registred=true");
    } else {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(data.message);
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
        <Form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.imagens}>
            <img
              className={styles.imgPokemon}
              src="/machoke.png"
              alt="machoke"
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
              src="/lucario.png"
              alt="lucario"
            />
          </div>
          <FormGroup className={styles.formGroup}>
            <Label for="name" className={styles.label}>
              <IoIosPerson className={styles.icon} />
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Qual o seu nome ?"
              required
              className={styles.inputName}
            />
          </FormGroup>
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
          <FormGroup className={styles.formGroup}>
            <Label for="confirmPassword" className={styles.label}>
              <IoIosLock className={styles.icon} />
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              required
              className={styles.inputName}
            />
          </FormGroup>
          <button type="submit" className={styles.btn}>Cadastra</button>
        </Form>
        <ToastComponent
          color="bg-danger"
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
};

export default Register;
