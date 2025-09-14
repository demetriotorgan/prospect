import axios from 'axios'
import { useEffect, useState } from 'react'
import api from '../util/api';

const useCarregarNichos = ()=>{
    const [nichoOptions, setNichoOptions] = useState([]);
    const [erroNicho, setErroNicho] = useState('');

    useEffect(()=>{
        api.get('/listar-nichos')
        .then(response =>{
            setNichoOptions(response.data);
        })
        .catch(error => {
            setErroNicho('Erro ao carregar nichos');
        });
    },[]);
    
    return {nichoOptions, erroNicho, setNichoOptions}
};

export default useCarregarNichos;