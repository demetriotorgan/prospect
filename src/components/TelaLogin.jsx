import React, { useState } from 'react'
import '../styles/TelaLogin.css'
import { IconErro } from '../util/Icones';
import loading from '../assets/loading.gif'
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router';

const TelaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {handleLogin, erro, carregando, setErro} = useLogin();
  
  const handleSubmit  = async(e)=>{
    e.preventDefault();
    handleLogin(email, password);    
  };

  const handleInput = ()=>{
    setErro('');    
  }

  return (    
  <div className="tela-login">
  <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <div className="campo">
      <label htmlFor="usuario">Usuário</label>
      <input 
        type="text" 
        id="usuario" 
        name="usuario" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        onClick={handleInput}
        />
    </div>
    <div className="campo">
      <label htmlFor="senha">Senha</label>
      <input 
        type="password" 
        id="senha" 
        name="senha" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
      <div className='login-funcoes'>
        {erro ? 
        <div className='conteudo-erro'>
        <IconErro/>
        <p>{erro}</p> 
        </div>
        : ''}
      </div>
    </div>

    <div className="botao-enviar">
        <button type="submit">{carregando ? <img src={loading} alt="" className='imagem-loading' /> : 'Entrar'}</button>
        <p><Link to ='/cadastrar-usuario'>Novo usuário</Link></p>
    </div>
  </form>
  </div>

  )
}

export default TelaLogin