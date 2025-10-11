import { useEffect, useState } from "react";
import api from "../../util/api";

const useTodosAgendamentos = ()=>{
    const [todosAgendamentos, setTodosAgendamentos]= useState([]);
    const [carregandoTodosAgendamentos, setCarregandoTodosAgendamentos]= useState(false);    

    const carregarTodosAgendamentos = async()=>{
        setCarregandoTodosAgendamentos(true);
        try {
            const response = await api.get('/listar-agendamentos-salvos')
              setTodosAgendamentos(response.data); 
        } catch (error) {
            console.error('Erro ao carregar todos os agendamentos', error);
        }finally{
            setCarregandoTodosAgendamentos(false);
        }
    };

    useEffect(()=>{
        carregarTodosAgendamentos();
    },[]);

    return {todosAgendamentos, carregandoTodosAgendamentos}
};

export default useTodosAgendamentos;