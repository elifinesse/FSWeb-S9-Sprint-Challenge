import React, { useState, useEffect } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const coordinates = [
    "(1, 1)",
    "(2, 1)",
    "(3, 1)",
    "(1, 2)",
    "(2, 2)",
    "(3, 2)",
    "(1, 3)",
    "(2, 3)",
    "(3, 3)",
  ];
  const [message, setMessage] = useState(initialMessage);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [data, setData] = useState({ x: 2, y: 2, steps: 0, email: "" });

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    setMessage(initialMessage);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
    //setData({ ...data, email: email });
  }

  const xy = coordinates[index];
  function moveLeft() {
    if (index % 3 === 0) {
      setMessage("Sola gidemezsiniz");
    } else {
      setIndex(index - 1);
      setSteps(steps + 1);
      setData({ ...data, steps: steps, x: Number(xy[1]) });
      setMessage(initialMessage);
    }
  }
  function moveUp() {
    if (index < 4) {
      setMessage("Yukarıya gidemezsiniz");
    } else {
      setIndex(index - 3);
      setSteps(steps + 1);
      setData({ ...data, steps: steps, y: Number(xy[4]) });
      setMessage(initialMessage);
    }
  }
  useEffect(() => {
    setData({
      ...data,
      x: Number(xy[1]),
      y: Number(xy[4]),
      steps: steps,
      email: email,
    });
  }, [index, steps, email]);
  console.log(data);
  function moveRight() {
    if (index % 3 === 2) {
      setMessage("Sağa gidemezsiniz");
    } else {
      setIndex(index + 1);
      setSteps(steps + 1);
      setData({ ...data, steps: steps, x: Number(xy[1]) });
      setMessage(initialMessage);
    }
  }
  function moveDown() {
    if (index < 9 && index > 5) {
      setMessage("Aşağıya gidemezsiniz");
    } else {
      setIndex(index + 3);
      setSteps(steps + 1);
      setData({ ...data, steps: steps, y: Number(xy[4]) });
      setMessage(initialMessage);
    }
  }
  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", data)
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Koordinatlar ${xy}`}</h3>
        <h3 id="steps">{`${steps} kere ilerlediniz`}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={moveLeft} id="left">
          SOL
        </button>
        <button onClick={moveUp} id="up">
          YUKARI
        </button>
        <button onClick={moveRight} id="right">
          SAĞ
        </button>
        <button onClick={moveDown} id="down">
          AŞAĞI
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
