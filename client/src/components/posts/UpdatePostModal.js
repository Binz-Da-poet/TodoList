import { PostContext } from "../../contexts/PostContext";
import { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

const UpdatePostModal = () => {
  //COntext
  const {
    updatePost,
    postState: { post },
    setShowToast,
    showUpdateModal,
    setShowUpdateModal,
  } = useContext(PostContext);

  //State
  const [currentPost, setCurrentPost] = useState(post);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  const { title, description, url, status } = currentPost;

  // close add modal
  const CloseDialog = () => {
    setCurrentPost(post);
    setShowUpdateModal(false);
  };

  // add new post
  const onChangeUpdatedPost = (event) => {
    setCurrentPost({ ...currentPost, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(currentPost);
    setShowUpdateModal(false);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Modal show={showUpdateModal} onHide={CloseDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress</Modal.Title>
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
              onChange={onChangeUpdatedPost}
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
              onChange={onChangeUpdatedPost}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="youtube link"
              name="url"
              value={url}
              onChange={onChangeUpdatedPost}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeUpdatedPost}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={CloseDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            UPDATE
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
