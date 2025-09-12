import { useState, useEffect } from 'react';

export default function useSidebar() {
  const [isClosed, setIsClosed] = useState(false);

  const handleToggle = () => setIsClosed(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const toggleBtn = document.getElementById('toggle-btn');

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
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isClosed]);

  return { isClosed, handleToggle };
}
