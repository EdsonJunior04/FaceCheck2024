import React, { useEffect, useState } from "react";

import Logo from "../../assets/img/FaceCheck.svg";

import { useHistory } from "react-router-dom";

import "../../assets/css/header.css";
import { parseJwt } from "../../services/auth";
import api from "../../services/api";
// import { parseJwt } from "../../services/auth";

export default function Header() {
  const [listaMeuNome, setListaMeuNome] = useState([])

  let history = useHistory();

  function logOut() {
    localStorage.removeItem("usuario-login");

    history.push("/login");
  }


  function BuscarMeuNome() {
    api('/Usuarios/9?id=' + parseJwt().jti, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
      }
    })

      .then(resposta => {
        if (resposta.status === 200) {
          setListaMeuNome(resposta.data.nomeUsuario)
          console.log("Resposta")
          console.log(resposta)
        }
      })
      .catch(erro => console.log(erro))
  }

  useEffect(BuscarMeuNome, []);

  return (
    <header className="container_header">
      <div className="grid_header">
        <div>
          <img className="header_logo" src={Logo} alt="Logo" />
        </div>
        <div>
          {listaMeuNome}
        </div>
        <button onClick={logOut} className="btn button">Sair</button>
      </div>
    </header>
  );
}