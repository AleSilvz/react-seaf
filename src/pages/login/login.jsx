import ButtonBack from "../../components/buttonBack/buttonBack";
import InputS from "../../components/input/inputs";
import { IoPerson, IoMedicalSharp } from "react-icons/io5";
import "./style.css";
import ButtonNav from "../../components/button";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sucess from "../../components/sucess/sucess";
import { motion } from "motion/react";

function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const users = "users";

  const navigate = useNavigate();

  function validate() {
    const newErros = {};

    if (!nickname) newErros.nickname = "Porfavor, digite seu name!";
    if (!password) newErros.password = "Porfavor, digite sua senha!";

    setErrors(newErros);

    return Object.keys(newErros).length === 0;
  }

  async function checkUser() {
    const docRef = collection(db, users);
    const q = query(docRef, where("name", "==", nickname.toLowerCase()));
    const querySnapShot = await getDocs(q);
    return !querySnapShot.empty;
  }

  async function userEmail() {
    const existe = await checkUser();
    if (existe) {
      const docColletion = collection(db, users);
      const q = query(
        docColletion,
        where("name", "==", nickname.toLowerCase())
      );
      const querySnapShot = await getDocs(q);
      return await querySnapShot.docs[0].data().email;
    }
  }

  async function handleLogin() {
    if (!validate()) return;
    const exist = await checkUser();
    if (!exist) {
      alert("Usúario não encontrado!");
      return;
    }
    const email = await userEmail();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (err) {
      alert("Nome ou senha incorreta!");
      console.error(err);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/account");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <Sucess>Welcome, back!</Sucess>;
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="container-login"
    >
      <ButtonBack className="container-btnBk" to="/">
        <h2>Welcome</h2>
        <h2>Back</h2>
      </ButtonBack>

      <div className="container-input">
        <InputS
          type="text"
          placeholder="Name"
          value={nickname}
          icon={IoPerson}
          onChange={(e) => setNickname(e.target.value)}
        />
        {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
        <InputS
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern="[0-9]*"
          maxLength={4}
          inputMode="numeric"
          style={{ WebkitTextSecurity: "disc" }}
          type="password"
          placeholder="Password"
          icon={IoMedicalSharp}
          numericPassword
          i
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <h3>Forgot password?</h3>

      <div
        className="container-btns-login-singup"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <ButtonNav className="btn" onClick={handleLogin}>
          Login
        </ButtonNav>
        <div
          style={{
            display: "flex",
            width: "70%",
            gap: "5%",
            justifyContent: "center",
            alignItems: "center",
            margin: "2%",
          }}
        >
          <hr
            style={{
              border: "none",
              width: "110px",
              height: "1px",
              backgroundColor: "black",
            }}
          />
          OR
          <hr
            style={{
              border: "none",
              width: "110px",
              height: "1px",
              backgroundColor: "black",
            }}
          />
        </div>

        <ButtonNav className="btn sing-up" to={"/singup"}>
          Sing up
        </ButtonNav>
      </div>
    </motion.div>
  );
}

export default Login;
