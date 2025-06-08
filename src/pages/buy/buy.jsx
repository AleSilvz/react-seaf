import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import "./style.css";
import Item from "../../components/item/item";
import ButtonBack from "../../components/buttonBack/buttonBack";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../services/firebaseConfig";

function Buy() {
  const [showModal, setShowModal] = useState(false);

  const [compras, setCompras] = useState([]);

  const [name, setName] = useState("");
  const [valor, setValor] = useState("");

  const [saldoD, setSaldoDiv] = useState(0);

  const navigate = useNavigate();

  async function enviar() {
    const uid = auth.currentUser.uid;

    try {
      const docRef = doc(db, "users", uid, "buy", name);
      await setDoc(docRef, {
        value: valor,
        und: 1,
      });
      setName("");
      setValor("");
      console.log("Item enviado!");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function getItensFirebase() {
      try {
        const uid = auth.currentUser.uid;
        const docRef = collection(db, "users", uid, "buy");
        const get = await getDocs(docRef);

        const list = get.docs.map((e) => ({
          name: e.id,
          value: e.data().value,
          und: e.data().und,
        }));
        setCompras(list);

        const total = list.reduce((acc, e) => acc + e.und * e.value, 0);
        setSaldoDiv(total);
      } catch (err) {
        console.error(err);
      }
    }
    getItensFirebase();
  }, [compras, auth, db]);

  async function increment(item) {
    try {
      const uid = auth.currentUser.uid;
      const docUpdate = doc(db, "users", uid, "buy", item);
      const data = await getDoc(docUpdate);
      const undAtual = data.data().und || 0;
      console.log(undAtual);
      updateDoc(docUpdate, {
        und: undAtual + 1,
      });
      console.log(docUpdate.id);
    } catch (err) {
      console.error(err);
    }
  }

  async function decrement(item) {
    try {
      const uid = auth.currentUser.uid;

      const docRef = doc(db, "users", uid, "buy", item);
      const undAtual = (await getDoc(docRef)).data().und;

      if (undAtual > 1) {
        updateDoc(docRef, {
          und: undAtual - 1,
        });
      } else if (undAtual === 1) {
        deleteDoc(docRef);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (compras) {
      function saldo() {
        let total = 0;
        compras.forEach((e) => {
          total += e.und * Number(e.value);
        });
        console.log(total);
        setSaldoDiv(total);
      }

      saldo();
    }
  }, []);

  return (
    <div className="container-buy">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          background: "green",
        }}
      >
        <ButtonBack onClick={() => navigate("/account")} />
        <h1>list itens</h1>
      </div>

      <h2>R$ {saldoD.toFixed(2)}</h2>

      {showModal ? (
        <div className="modal" style={{ position: "absolute", top: "50%" }}>
          <button
            style={{ fontSize: "5rem" }}
            onClick={() => setShowModal(false)}
          >
            X
          </button>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            placeholder="Name"
          />
          <input
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="input"
            type="number"
            placeholder="Valor"
          />
          <button onClick={enviar}>Enviar</button>
        </div>
      ) : undefined}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {compras.map((e, index) => (
          <Item
            onDoubleClick={(event) => {
              const largura = event.currentTarget.clientWidth;
              const cliqueX = event.nativeEvent.offsetX;

              if (cliqueX < largura / 2) {
                decrement(e.name); // lado esquerdo → decrementa
              } else {
                increment(e.name); // lado direito → incrementa
              }
            }}
            key={index}
            name={e.name}
            total={(e.und * e.value).toFixed(2)}
            value={e.value}
            und={e.und}
          />
        ))}
      </div>

      <div className="container-add">
        <IoAddCircle
          onClick={() => setShowModal(true)}
          fontSize={"50px"}
          style={{ position: "absolute", bottom: 0 }}
        />
      </div>
    </div>
  );
}

export default Buy;
