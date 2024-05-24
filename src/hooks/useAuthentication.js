import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthentication = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = window.localStorage.getItem("currentUser");
    if (!user) {
      navigate("/signIn");
    }
  });
};

export default useAuthentication;
