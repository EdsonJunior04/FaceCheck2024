import React from "react";
import { useState } from "react";

import api from "../../services/api";

import logo from '../../assets/img/FaceCheck.svg'
import '../../assets/css/login.css'
import { parseJwt } from "../../services/auth";


export default function CadastroUser() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [idTipoU, setIdTipoU] = useState(0);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');
    const [cadastrado, setCadastrado] = useState('')


    function cadastro(event) {
        event.preventDefault();

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

                }
            }).catch(erro => {
                console.log(erro)

                setErroMensagem("Aluno não cadastrado!")
            })
    }

    // let history = useHistory();

    // function efetuarLogin(event) {  

    //     event.preventDefault();

    //     setErroMensagem('')
    //     setIsLoading(true)

    //     api.post('/Login', {
    //         nomeUsuario: 
    //         email: email,
    //         senha: senha
    //     })

    //         .then((response) => {
    //             if (response.status === 200) {
    //                 localStorage.setItem('usuario-login', response.data.token)

    //                 setSenha('')

    //                 setEmail('')

    //                 setIsLoading(false)

    //                 if (parseJwt().role === "1") {
    //                     history.push('/adm')
    //                 }
    //                 if (parseJwt().role === "2") {
    //                     history.push('/home')
    //                 }

    //             }
    //         })
    //         .catch(erro => {
    //             console.log(erro)

    //             // setSenha('')

    //             setErroMensagem("E-mail e/ou Senha inválidos")

    //             setIsLoading(false)
    //         })
    // }

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
                <form onSubmit={cadastro} >
                    <div className="inputs">

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
                                    Login
                                </button>
                            )
                        }
                    </div>
                </form>
            </main>
        </div>
    )
}