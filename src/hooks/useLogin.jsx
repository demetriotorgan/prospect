import { useState } from 'react'
import api from '../util/api'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router';

const useLogin = ()=>{
    const [erro, setErro] = useState('');    
    const [carregando, setCarregando] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async(email, password)=>{
        setCarregando(true);
    try {
      const res = await api.post('/login', { email, password });
      const token = res.data.token;
      login(token);
      navigate('/dashboard');
    } catch (error) {
      setErro('Verifique email e senha');
    } finally {
      setCarregando(false);
    }
    };
    return {handleLogin, erro, carregando, setErro};
};

export default useLogin;