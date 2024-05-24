import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Box, Button, Container, Snackbar, TextField } from "@mui/material";
import { AuthContext } from "../../context/authContext";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, authErrorMessage, setAuthErrorMessage, authUser } =
    useContext(AuthContext);
  const handleRedirect = () => {
    if (props.state === "login") {
      navigate("/signOut");
    } else if (props.state === "register") {
      navigate("/signIn");
    }
  };

  useEffect(() => {
    if (authUser.username && authUser.password) {
      console.log(authUser);
      navigate("/dashboard");
    }
  }, [authUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    let wasSubmitSuccessful;

    switch (props.state) {
      case "login":
        wasSubmitSuccessful = login(user);
        break;
      case "register":
        wasSubmitSuccessful = register(user);
        break;
    }

    if (wasSubmitSuccessful) {
      navigate("/dashboard");
    } else {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="xs">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Login"
            required
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            required
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" color="primary" type="submit">
            {props.state === "login" ? "Zaloguj się" : "Zarejestruj i zaloguj"}
          </Button>
        </form>
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={handleRedirect}
        >
          {props.state === "login"
            ? "Przejdź do rejestracji"
            : "Przejdź do logowania"}
        </Button>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={authErrorMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setAuthErrorMessage("")}
        message={authErrorMessage}
      />
    </Box>
  );
};

export default Login;
