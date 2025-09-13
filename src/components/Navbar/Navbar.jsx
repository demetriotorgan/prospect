import React, { useEffect, useState } from 'react'
import { IconCidade, IconCidades, IconDashboard, IconEmpresas, IconEstado, IconNichos, IconProspec, IconQuant, IconSair, IconTable, IconTimer, IconToggle, IconUser } from '../../util/Icones'
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router';
import logo from '../../assets/logo.png'
import useDadosProspec from '../../hooks/useDadosProspec';
import useSidebar from '../../hooks/useSideBar';
import useLogout from '../../hooks/useLogout';

const Navbar = () => {       

    //hooks's
    const { user} = useAuth();
    const dadosDeProspec = useDadosProspec(user);
    const {isClosed, handleToggle} = useSidebar();  
    const {handleSair} = useLogout();    
    
    return (
        <>
            <nav id="sidebar" className={isClosed ? "open" : "close"}>
                <ul>
                    <li>
                        <span className="logo"><img src={logo} alt="" /></span>
                        <button
                            id="toggle-btn"
                            onClick={handleToggle}
                            className={isClosed ? "rotate" : ""}>
                            <IconToggle />
                        </button>
                    </li>
                    <li className="active">
                        <Link to='/dashboard'>
                            <IconDashboard />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/tela-prospec'>
                            <IconProspec />
                            <span>Prospectar</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/nichos'>
                            <IconNichos />
                            <span>Nichos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/cidades'>
                            <IconCidade />
                            <span>Cidades</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/estados'>
                            <IconEstado />
                            <span>Estados</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/empresas'>
                            <IconEmpresas />
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

                    <li className="info-usuario">
                        <div className="user-item">
                            <IconUser />
                            <div>
                                <p>{user?.email}</p>
                                <small>{user?._id}</small>
                            </div>
                        </div>

                        <div className="info-item">
                            <IconTimer />
                            <span>{dadosDeProspec.tempo} seg.</span>
                        </div>

                        <div className="info-item">
                            <IconQuant />
                            <span>{dadosDeProspec.total} prospecções</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar