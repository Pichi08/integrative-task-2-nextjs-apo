import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const handleLogOut = () => {
    console.log('Usuario desconectado');
    // Lógica de logout aquí, como limpiar la sesión o redirigir al login
  };

  return (
    <div className="header">
      <h1>Usuario</h1>
      <button className="logout-icon" onClick={handleLogOut} aria-label="Log Out">
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
};

export default Header;
