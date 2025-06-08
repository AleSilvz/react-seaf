import { useEffect, useState } from "react";
import ButtonBack from "../../components/buttonBack/buttonBack";
import InputS from "../../components/input/inputs";
import { IoPerson, IoMedicalSharp, IoMail } from "react-icons/io5";
import isEmail from "validator/lib/isEmail";
import ButtonNav from "../../components/button";
import "./style.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { motion } from "motion/react";
import Sucess from "../../components/sucess/sucess";
import { useNavigate } from "react-router-dom";

function SingUp() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isCreate, setIsCreate] = useState(false);

  const exist = isEmail(email);
  const users = "users";

  const navigate = useNavigate();

  function validate() {
    const newErrors = {};

    if (!nickname) newErrors.nickname = "Preencha o nickname!";
    if (!email) newErrors.email = "Preencha o email!";
    if (!password) newErrors.password = "Preencha a senha!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function checkUserExists() {
    const docColletion = collection(db, users);
    const q = query(docColletion, where("name", "==", nickname.toLowerCase()));
    const querySnapShot = (await getDocs(q)).empty;

    return querySnapShot;
  }

  async function handleRegister() {
    if (!validate()) return;

    const userExists = await checkUserExists();
    if (!userExists) {
      alert("Já existe um usuário com esse name!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );
      const user = userCredential.user;
      const uid = user.uid;

      const docRef = doc(db, users, uid);
      await setDoc(docRef, {
        name: nickname,
        email: email.toLowerCase(),
      });
      setIsCreate(true);
    } catch (err) {
      alert('Esse email já existe!')
      console.error(err);
    }
  }

  useEffect(() => {
    if (isCreate) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [isCreate, navigate]);

  if (isCreate) {
    return <Sucess>Welcome!</Sucess>;
  }

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <ButtonBack initial={{ scale: 0 }} animate={{ scale: 1 }} to="/">
        <h2>Create</h2>
        <h2>Account</h2>

        <div className="container-input">
          <InputS
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.trim())}
            placeholder="Name"
            icon={IoPerson}
          />
          {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}

          <InputS
            type="email"
            placeholder={"Email"}
            value={email}
            icon={IoMail}
            onChange={(e) => setEmail(e.target.value)}
            c={exist == true ? true : false}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <InputS
            onChange={(e) => setPassword(e.target.value.trim())}
            pattern="[0-9]*"
            maxLength={6}
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
        <div
          className="container-btns-login-singup"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <ButtonNav className="btn" onClick={handleRegister}>
            Sing up
          </ButtonNav>
          <div
            style={{
              display: "flex",
              width: "70%",
              gap: "5%",
              justifyContent: "center",
              alignItems: "center",
              margin: "2%",
              fontWeight: "400",
              fontSize: "15px",
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

          <ButtonNav className="btn sing-up" to={"/login"}>
            Login
          </ButtonNav>
        </div>
      </ButtonBack>
    </motion.div>
  );
}

export default SingUp;
