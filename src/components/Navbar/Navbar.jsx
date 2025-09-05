import React, { useState } from 'react'
import { IconCidade, IconCidades, IconDashboard, IconEmpresas, IconEstado, IconNichos, IconProspec, IconSair, IconToggle } from '../../util/Icones'
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router';

const Navbar = () => {
        const [isClosed, setIsClosed] = useState(false);

        const {logOut} = useAuth();
        const navigate = useNavigate();


    const handleToggle = ()=>{
        setIsClosed(!isClosed);
    }

    const handleSair = ()=>{
         if (window.confirm("Tem certeza que deseja sair?")) {
            logOut();
            navigate('/');
         }
    };

  return (
    <>
    
    <nav id="sidebar" className={isClosed ? "open" : "close"}>
        <ul>
            <li>
                <span className="logo">Torgan Soluções</span>
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