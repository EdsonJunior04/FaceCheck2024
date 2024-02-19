import React from "react";
import { useState } from "react";

import api from "../../services/api";

import logo from '../../assets/img/FaceCheck.svg'
import '../../assets/css/login.css'



export default function CadastroUser() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');
    const [cadastrado, setCadastrado] = useState('')


    function cadastro(event) {
        event.preventDefault();
        setIsLoading(true)

        let user = {
            idTipoU: 2,
            nomeUsuario: nomeUsuario,
            email: email,
            senha: senha
        }

        api.post('/Usuarios', user, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 201) {
                    console.log('Aluno cadastrado');
                    setEmail("Aluno Cadastrado!");
                    setSenha(0);
                    setNomeUsuario('');
                    setIsLoading(false)

                }
            }).catch(erro => {
                console.log(erro)
                setIsLoading(false)
                setErroMensagem("Aluno não cadastrado!")
            })
    }


    return (
        <div >
            <main className="fundo_login">
                <div className="imagem">
                    <img
                        className="logo"
                        src={logo}
                        alt="Logo"
                    />
                </div>
                <form className="forms" onSubmit={cadastro} >
                    <div className="inputs">

                        <input
                            type="text"
                            name="nomeUsuario"
                            placeholder="Digite seu nome"
                            className="input_login"
                            onChange={(e) => setNomeUsuario(e.target.value)}
                            value={nomeUsuario}
                        />
                        
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            className="input_login"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite sua senha"
                            className="input_login"
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                        />


                        <span className='red'>{erroMensagem === '' ? '' : 'Aluno não cadastrado'}</span>
                        <span className='green'>{cadastrado === '' ? '' : 'Aluno cadastrado!'}</span>
                        <a href="/">Já tenho cadastro</a>
                        {
                            isLoading === true && (
                                <button
                                    type="submit"
                                    disabled
                                    className="btn_login"
                                    id="btn_login"
                                >
                                    Loading...
                                </button>
                            )
                        }

                        {

                            isLoading === false && (
                                <button
                                    className="btn_login btn"
                                    id="btn_login"
                                    type="submit"
                                    disabled={
                                        email === '' || senha === ''
                                            ? 'none'
                                            : ''
                                    }
                                >
                                    Cadastrar-se
                                </button>
                            )
                        }
                    </div>
                </form>
            </main>
        </div>
    )
}