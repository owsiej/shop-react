import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Box, Button, Container, Snackbar, TextField } from "@mui/material";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const submitter = event.nativeEvent.submitter.name;
    const user = {
      username: username,
      password: password,
    };
    const availableUsers =
      JSON.parse(window.localStorage.getItem("availableUsers")) ?? [];

    if (submitter === "loginAndRegister") {
      availableUsers.push(user);
      window.localStorage.setItem(
        "availableUsers",
        JSON.stringify(availableUsers)
      );
      window.localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else if (submitter === "login") {
      const lookingUser = availableUsers.find(
        (u) => u.username === user.username
      );
      if (!lookingUser) {
        setLoginState("Podany nazwa użytkownika nie istnieje");
        setUsername("");
        setPassword("");
      } else if (lookingUser.password !== user.password) {
        setLoginState("Podane hasło jest błędne.");
        setUsername("");
        setPassword("");
      } else {
        window.localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/dashboard");
      }
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            name="login"
          >
            Przejdź do logowania
          </Button>
          {props.state === "loginAndRegister" ? (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="loginAndRegister"
            >
              Zarejestruj i zaloguj
            </Button>
          ) : null}
        </form>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={loginState !== ""}
        autoHideDuration={3000}
        onClose={() => setLoginState("")}
        message={loginState}
      />
    </Box>
  );
};

export default Login;
