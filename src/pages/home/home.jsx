import ButtonNav from "../../components/button";
import "./style.css";
import { motion } from "motion/react";
import { signOut, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../services/firebaseConfig'

function Home() {

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="container"
    >
      <div className="logoApp">
        <h2>SEAF</h2>
        <h2>17</h2>
      </div>

      <div className="title">
        <h1>Simple</h1>
        <h1>Easy</h1>
        <h1>And</h1>
        <h1>Fast</h1>
        <p>Simples, fácil e rápido!</p>
      </div>

      <div className="container-buttons">
        <ButtonNav to={"/login"} className="btn">
          Login
        </ButtonNav>
        <ButtonNav to={"/singup"} className="btn sing-up">
          Sign up
        </ButtonNav>
      </div>
    </motion.div>
  );
}

export default Home;
