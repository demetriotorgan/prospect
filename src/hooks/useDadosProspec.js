import { useEffect, useState } from "react"
import api from "../util/api";

const useDadosProspec = (user)=>{
    const [dadosDeProspec, setDadosDeProspec] = useState({
        tempo:'',
        total:''
    });
    
    useEffect(()=>{
        const fetchDadosDeProspec = async()=>{
            if(!user || !user._id) return;
            try {
            const { data } = await api.get(`/tempo-gasto-prospec/${user._id}`);
            setDadosDeProspec({
                tempo: data.tempoProspec, 
                total: data.totalProspec
            });
            } catch (err) {
                console.error("Erro ao buscar tempo de prospecção:", err);
            }
        };
        fetchDadosDeProspec();
    },[user]);
    return dadosDeProspec;
};

export default useDadosProspec;