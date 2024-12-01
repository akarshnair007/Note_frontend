import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerUserApi } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const { username, email, password } = userData;
    console.log(username, email, password);

    try {
      const res = await registerUserApi(userData);
      if (res.status == 200) {
        alert("User has been added");
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div
            className="col-8 my-3 shadow-lg p-4"
            style={{ backgroundColor: "#8bb4f0" }}
          >
            <Form>
              <Form.Group
                className="mb-3 fw-bolder"
                controlId="formBasicEmail"
                style={{ color: "white" }}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 fw-bolder"
                controlId="formBasicUsername"
                style={{ color: "white" }}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={userData.username}
                  type="text"
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  placeholder="Enter Username"
                />
              </Form.Group>

              <Form.Group
                style={{ color: "white" }}
                className="mb-3 fw-bolder"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={userData.password}
                  type="password"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  placeholder="Password"
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => submitHandler(e)}
                  className="shadow-lg"
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
