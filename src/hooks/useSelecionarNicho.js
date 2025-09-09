import { useState } from "react"

const useSelecionarNicho = ()=>{
    const [nichoSelecionado, setNichoSelecionado] = useState({});

    const handleSelecionarNicho = (tipo, valor)=>{
        setNichoSelecionado((prev)=>({
            ...prev, 
            [tipo]:valor, 
        }));
    };
    return{
        nichoSelecionado,
        handleSelecionarNicho,
        setNichoSelecionado
    };
};

export default useSelecionarNicho