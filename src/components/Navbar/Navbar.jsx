import React, { useState } from 'react'
import { IconCidades, IconDashboard, IconEmpresas, IconNichos, IconToggle } from '../../util/Icones'

const Navbar = () => {
        const [isClosed, setIsClosed] = useState(false);

    const handleToggle = ()=>{
        setIsClosed(!isClosed);
    }

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
                <a href="index.html">
                    <IconDashboard/>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="dashboard.html">
                    <IconNichos/>
                    <span>Prospectar</span>
                </a>
            </li>          
            <li>
                <a href="dashboard.html">
                    <IconNichos/>
                    <span>Nichos</span>
                </a>
            </li>                      
            <li>
                <a href="Estados.html">
                    <IconCidades/>
                    <span>Cidades</span>
                </a>
            </li>
            <li>
                <a href="profile.html">
                    <IconEmpresas/>
                    <span>Empresas</span>
                </a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar