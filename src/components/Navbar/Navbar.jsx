import React, { useEffect, useState } from 'react'
import { IconCidade, IconCidades, IconDashboard, IconEmpresas, IconEstado, IconNichos, IconProspec, IconSair, IconTable, IconToggle } from '../../util/Icones'
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/logo.png'

const Navbar = () => {
        const [isClosed, setIsClosed] = useState(false);
        const {user} = useAuth();

        const {logOut} = useAuth();
        const navigate = useNavigate();


    const handleToggle = ()=>{
        setIsClosed((prev) =>!prev);
    }

    const handleSair = ()=>{
         if (window.confirm("Tem certeza que deseja sair?")) {
            logOut();
            navigate('/');
         }
    };

    useEffect(()=>{
    const handleClickOutside = (event) => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');

    // se o menu está aberto e o clique foi fora do sidebar e do botão de toggle → fecha
    if (
      isClosed &&
      sidebar &&
      !sidebar.contains(event.target) &&
      toggleBtn &&
      !toggleBtn.contains(event.target)
    ) {
      setIsClosed(false);
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };      
},[isClosed]);  

  return (
    <>
    
    <nav id="sidebar" className={isClosed ? "open" : "close"}>
        <ul>
            <li>
                <span className="logo"><img src={logo} alt="" /></span>
                {user ? <p>{user.email}</p> : ""} 
                <button 
                id="toggle-btn"
                onClick={handleToggle}
                className={isClosed ? "rotate" : ""}
                >                
                <IconToggle/>
                </button>
            </li>
            <li className="active">
                <Link to='/dashboard'>
                    <IconDashboard/>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to='/tela-prospec'>
                    <IconProspec/>
                    <span>Prospectar</span>
                </Link>
            </li>          
            <li>
                <Link to='/nichos'>
                    <IconNichos/>
                    <span>Nichos</span>
                </Link>
            </li>                      
            <li>
                <Link to='/cidades'>
                    <IconCidade/>
                    <span>Cidades</span>
                </Link>
            </li>
            <li>
                <Link to='/estados'>
                    <IconEstado/>
                    <span>Estados</span>
                </Link>
            </li>
            <li>
                <Link to='/empresas'>
                    <IconEmpresas/>
                    <span>Empresas</span>
                </Link>
            </li>
            <li>
                <Link to='/enviar-planilha'>
                    <IconTable />
                    <span>Enviador Dados</span>
                </Link>
            </li>
            <li>                   
                <span onClick={handleSair} className='link-sair'>
                <IconSair />
                <span>Sair</span>    
                </span>                
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar