import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [token, setToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    if (sessionStorage.getItem("token")) {
      setToken(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("data");
    setToken(false);
    navigate("/login");
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">NOTE.IO</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/"}>
            Home
          </Nav.Link>

          <Nav.Link
            as={Link}
            to={"/register"}
            className={token ? "d-none" : ""}
          >
            Register
          </Nav.Link>
          <Nav.Link as={Link} to={"/login"} className={token ? "d-none" : ""}>
            Login
          </Nav.Link>
        </Nav>
        {token && (
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
