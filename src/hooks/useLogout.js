import { useNavigate } from 'react-router';
import { useAuth } from '../context/authContext';

export default function useLogout() {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleSair = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      logOut();
      navigate('/');
    }
  };

  return { handleSair };
}
