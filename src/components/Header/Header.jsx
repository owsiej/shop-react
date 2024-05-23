import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const currentLoggedUser = JSON.parse(
    window.localStorage.getItem("currentUser")
  )?.username;
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("currentUser");
    navigate("/signOut");
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
      Jesteś zalogowany jako {currentLoggedUser}
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
};

export default Header;
