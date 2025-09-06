import axios from 'axios'
import { useEffect, useState } from 'react'
import api from '../util/api';

const useCarregarNichos = ()=>{
    const [nichoOptions, setNichoOptions] = useState([]);

    useEffect(()=>{
        api.get('/listar-nichos')
        .then(response =>{
            setNichoOptions(response.data);
        })
        .catch(error => {
            alert('Erro ao carregar nichos');
        });
    },[]);
    
    return {nichoOptions}
};

export default useCarregarNichos;