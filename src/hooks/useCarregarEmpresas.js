import { useEffect, useState } from "react";
import api from "../util/api";

const useCarregarEmpresas = ()=>{
    const [empresas, setEmpresas] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    useEffect(()=>{
        const carregarEmpresas = async()=>{
            setCarregando(true);
            try {
                const response = await api.get('/listar-empresas');
                setEmpresas(response.data);
            } catch (error) {
                setErro(error.message);
            }finally{
                setCarregando(false);
            }
        };
        carregarEmpresas();
    },[]);
    return{empresas, carregando, erro};
};

export default useCarregarEmpresas;