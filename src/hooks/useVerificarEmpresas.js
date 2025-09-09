import { useState } from "react";
import api from "../util/api";

const useVerificarEmpresas = ()=>{
    const [existentes, setExistentes] = useState([]);

    const verificarEmpresas = async(empresas)=>{
        try {
            const telefones = empresas.map((e)=>e.telefone).filter(Boolean);
            const response = await api.post('/verificar-empresas', {telefones});
            setExistentes(response.data.existentes || []);
        } catch (error) {
            console.error('Erro ao verificar empresas', error);
            setExistentes([]);
        }
    };
    const isEmpresaExistente = (telefone)=>
        existentes.some((e)=>e.telefone === telefone);
    return{existentes, verificarEmpresas, isEmpresaExistente};
};

export default useVerificarEmpresas;