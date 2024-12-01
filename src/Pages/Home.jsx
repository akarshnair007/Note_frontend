import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { deleteNoteApi, getNoteApi } from "../services/allAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [text, setText] = useState(false);
  const [userData, setUserData] = useState(null);
  const [note, setNote] = useState([]);

  useEffect(() => {
    checkToken();
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userData && userData._id) {
      getUserNotes(userData._id);
    }
  }, [userData]);

  const checkToken = () => {
    if (sessionStorage.getItem("token")) {
      setText(true);
    }
  };

  const getUserDetails = () => {
    const data = sessionStorage.getItem("data");
    if (data) {
      setUserData(JSON.parse(data));
    }
  };

  const getUserNotes = async (id) => {
    try {
      console.log("Fetching notes for ID:", id);
      const res = await getNoteApi(id);
      console.log(res);
      if (res.status === 200) {
        setNote(res.data); // Assuming response has a data field with notes
      }
    } catch (error) {
      alert("Notes didn't receive");
    }
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    try {
      const res = await deleteNoteApi(id);
      if (res.status === 200) {
        alert("Note has been deleted");
        getUserDetails();
      } else {
        alert("Some issue occured");
      }
      console.log(res);
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
          <div className="col-8">
            <div className="top">
              <h4 className="text-center my-4 text-info fw-bold text-nowrap">
                Welcome to Note.io where you can Add, Edit and Delete your notes
              </h4>
            </div>
            <div className="content_main mt-5 shadow-lg p-5">
              <div className="content_title">
                <div className="mb-5">
                  {text ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h5 className="text-danger fw-bolder text-center">
                        Welcome {userData?.username}
                      </h5>
                      <Link to={`/addNote/${userData?._id}`}>
                        <button className="btn btn-primary">Add Note</button>
                      </Link>
                    </div>
                  ) : (
                    <h5 className="text-danger fw-bolder text-center">
                      Please Login/Register to see all the notes
                    </h5>
                  )}
                </div>
                {note.length === 0 ? (
                  <h2 className="text-center fw-bold text-danger mb-5">
                    There are no notes right now
                  </h2>
                ) : (
                  <div className="row">
                    {note.map((n, index) => (
                      <div className="col-md-4 mb-4" key={index}>
                        <div className="card shadow-lg">
                          <div className="card-body">
                            <h5 className="card-title fw-bold text-primary">
                              {n.title}
                            </h5>
                            <p className="card-text">{n.description}</p>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              <Link
                                to={`/editNote/${n._id}`}
                                style={{ color: "black" }}
                              >
                                <FontAwesomeIcon
                                  icon={faPencil}
                                  style={{ cursor: "pointer" }}
                                />
                              </Link>

                              <FontAwesomeIcon
                                icon={faTrash}
                                className="ps-3"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => deleteHandler(e, n._id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
