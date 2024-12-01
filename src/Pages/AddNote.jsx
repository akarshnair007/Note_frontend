import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { addNoteApi } from "../services/allAPI";

const AddNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const noteHandler = async (e) => {
    e.preventDefault();
    console.log(note);
    try {
      console.log(id);
      const res = await addNoteApi(note, id);
      if (res.status === 200) {
        setNote({
          title: "",
          description: "",
        });
        alert("Note has been added");
      } else {
        alert("error");
      }
    } catch (err) {
      console.log(err);
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
                <Form.Label>Note title</Form.Label>
                <Form.Control
                  type="test"
                  value={note.title}
                  placeholder="Enter Note title"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </Form.Group>

              <Form.Group
                style={{ color: "white" }}
                className="mb-3 fw-bolder"
                controlId="formBasicDescription"
              >
                <Form.Label>Note Description</Form.Label>
                <Form.Control
                  type="text"
                  value={note.description}
                  placeholder="Note Description"
                  onChange={(e) =>
                    setNote({ ...note, description: e.target.value })
                  }
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  onClick={(e) => noteHandler(e)}
                  variant="primary"
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

export default AddNote;
