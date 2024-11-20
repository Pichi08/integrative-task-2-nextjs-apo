import React from 'react';
import { useLogout } from "@/hooks/auth/useLogout";
import { FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

const Header: React.FC = () => {
  const handleLogOut = () => {
    console.log('Usuario desconectado');
    // Lógica de logout aquí, como limpiar la sesión o redirigir al login
  };

  const { logout } = useLogout();
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();
  const isLogged = currentUser != null;

  return (
    <div className="header">
      <h1>{currentUser?.name}</h1>
      {isLogged && (
      <button 
        className="logout-icon" 
        onClick={() => {
          logout();
          router.push("/login");
        }}
        aria-label="Log Out">
        <FaSignOutAlt size={20} />
      </button>
       )}
    </div>
  );
};

export default Header;
