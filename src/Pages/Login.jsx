import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginUserApi } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const Login = () => {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const res = await loginUserApi(userData);
      if (res.status == 200) {
        setuserData({
          email: "",
          password: "",
        });
        alert("User has been logged in");

        console.log(res.data.exisitingUser);
        console.log(res.data.token);
        sessionStorage.setItem("data", JSON.stringify(res.data.exisitingUser));
        sessionStorage.setItem("token", JSON.stringify(res.data.token));

        navigate("/");
      } else {
        alert("No user found");
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
                  onChange={(e) =>
                    setuserData({ ...userData, email: e.target.value })
                  }
                  type="email"
                  placeholder="Enter email"
                  value={userData.email}
                />
              </Form.Group>

              <Form.Group
                style={{ color: "white" }}
                className="mb-3 fw-bolder"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setuserData({ ...userData, password: e.target.value })
                  }
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  onClick={(e) => submitHandler(e)}
                  type="submit"
                  className="shadow-lg"
                >
                  Login
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

export default Login;
