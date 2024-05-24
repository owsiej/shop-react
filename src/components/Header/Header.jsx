import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Header = () => {
  const { authUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signIn");
  };

  return (
    <div
      style={{
        height: "100px", // wysokość 100px
        width: "100%", // szerokość 100%
        backgroundColor: "#f8d7da", // kolor tła
        display: "flex", // flexbox
        justifyContent: "center", // wyśrodkowanie w poziomie
        alignItems: "center", // wyśrodkowanie w pionie
        gap: "100px", // odstęp między elementami
      }}
    >
      Jesteś zalogowany jako {authUser.username}
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
};

export default Header;
