import React, { useState, useMemo } from "react";

import camera from "../../assets/camera.svg";
import "./styles.css";

import api from "../../services/api";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: { user_id },
    });
    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview}` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company">Empresa*</label>
      <input
        type="text"
        id="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Sua empresa incrivel"
      />
      <label htmlFor="techs">
        Tecnologias* <span>Separadas por virgula</span>
      </label>
      <input
        type="text"
        id="techs"
        value={techs}
        onChange={(e) => setTechs(e.target.value)}
        placeholder="Quais tecnologias usam"
      />
      <label htmlFor="price">
        Valor* <span>Em branco para gratuito</span>
      </label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Valor por dia"
      />
      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
