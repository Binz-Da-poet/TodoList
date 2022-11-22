import { PostContext } from "../../contexts/PostContext";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

const AddPostModal = () => {
  //COntext
  const { addModalShow, setAddModalShow, AddPost, setShowToast } =
    useContext(PostContext);

  //State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPost = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  // close add modal
  const CloseDialog = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setAddModalShow(false);
  };

  // add new post

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await AddPost(newPost);
    CloseDialog();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Modal show={addModalShow} onHide={CloseDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to do?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPost}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewPost}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="youtube link"
              name="url"
              value={url}
              onChange={onChangeNewPost}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={CloseDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            TODO!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
