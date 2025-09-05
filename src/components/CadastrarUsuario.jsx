import React, { useState } from 'react'
import '../styles/TelaLogin.css'
import api from '../util/api';
import { useNavigate } from 'react-router';
import loading from '../assets/loading.gif'

const CadastrarUsuario = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setCarregando(true);

        try {
            const res = await api.post('/registrar',{
                email:email,
                password:senha
            });
            if(res.status === 201 || res.status === 200 ){
                alert('Usuário cadastrado com sucesso');
                navigate('/');
            }
        } catch (error) {
            alert('Erro ao cadastrar login');
        }finally{
            setCarregando(false);
        }
    }

  return (
    <div className='tela-login'>
        <form onSubmit={handleSubmit}>
            <h2>Novo Usuário</h2>
            <div className='campo'>
                <label htmlFor="usuario">Usuário</label>
                <input 
                    type="text" 
                    id="usuario" 
                    name="usuario" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}                    
                    />
            </div>
            <div className='campo'>
                <label htmlFor="usuario">Usuário</label>
                <input 
                    type="text" 
                    id="senha" 
                    name="usuario" 
                    value={senha}
                    onChange={(e)=>setSenha(e.target.value)}                    
                    />
            </div>
            <div className="botao-enviar">
                    <button type="submit">{carregando ? <img src={loading} alt="" className='imagem-loading' /> : 'Entrar'}</button>
                </div>
        </form>
    </div>
  )
}

export default CadastrarUsuario