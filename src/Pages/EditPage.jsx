import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { getUserNoteApi, updateUserNoteApi } from "../services/allAPI";

const EditPage = () => {
  const [userNote, setUserNote] = useState({ title: "", description: "" });
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await getUserNoteApi(id);
      if (res.status === 200) {
        // console.log(res);
        setUserNote({
          title: res.data.title,
          description: res.data.description,
        });
      } else {
        alert("SOme issue occured");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userNote);

  const updateHandler = async (e) => {
    e.preventDefault();
    console.log(userNote);
    try {
      const res = await updateUserNoteApi(userNote, id);
      if (res.status === 200) {
        alert("note has been updated");
      } else {
        alert("Some issue occured");
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
                controlId="formBasicNoteTitle"
                style={{ color: "white" }}
              >
                <Form.Label>Edit Note title</Form.Label>
                <Form.Control
                  type="test"
                  placeholder="Enter Note title"
                  value={userNote.title}
                  onChange={(e) =>
                    setUserNote({ ...userNote, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group
                style={{ color: "white" }}
                className="mb-3 fw-bolder"
                controlId="formBasicDescription"
              >
                <Form.Label>Edit Note Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Note Description"
                  value={userNote.description}
                  onChange={(e) =>
                    setUserNote({ ...userNote, description: e.target.value })
                  }
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  onClick={(e) => updateHandler(e)}
                  variant="primary"
                  type="submit"
                  className="shadow-lg"
                >
                  Update
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

export default EditPage;
