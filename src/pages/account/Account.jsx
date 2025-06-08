import { onAuthStateChanged, signOut } from "firebase/auth";
import "./style.css";
import {
  IoPerson,
  IoChevronForward,
  IoChevronBackOutline,
} from "react-icons/io5";
import { auth, db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonMenu from "../../components/button/buttonMenu";
import { menuCategarias } from "./categorias";

function Account() {
  const [dadosUser, setDadosUser] = useState({});
  const [logOut, setlogOut] = useState(false);
  const [itens, setItem] = useState([]);

  const navigate = useNavigate();

  async function getDateUser() {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const dados = await getDoc(docRef);
          setDadosUser(dados.data());
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogOut() {
    setlogOut(true);
  }

  async function handleSingOut() {
    signOut(auth);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  useEffect(() => {
    getDateUser();
  }, []);

  if (logOut) {
    return (
      <div style={{ padding: "20px" }}>
        <IoChevronBackOutline
          onClick={() => setlogOut(false)}
          style={{ fontSize: "2rem" }}
        />
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="avatar">
            <IoPerson style={{ color: "white", fontSize: "40px" }} />
          </div>

          <h3 style={{ fontWeight: "300" }}>{dadosUser.name?.toUpperCase()}</h3>
        </div>
        <button onClick={handleSingOut}>sair</button>
      </div>
    );
  }

  return (
    <div className="container-account">
      <div className="header">
        <div className="avatar">
          <IoPerson style={{ color: "white", fontSize: "40px" }} />
        </div>
        <div className="container-name">
          <h3>Olá!</h3>
          <h3 style={{ fontSize: "1.3rem" }}>
            {dadosUser.name?.toUpperCase()}
          </h3>
        </div>

        <IoChevronForward className="forward" onClick={handleLogOut} />
      </div>

      <div className="container-menu">
        <p>Menu</p>
        <div className="categorias">
          <div className="menu">
            {menuCategarias.map((e, index) => (
              <ButtonMenu key={index} icon={e.icon} to={e.to}>
                {e.categoria}
              </ButtonMenu>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Account;
