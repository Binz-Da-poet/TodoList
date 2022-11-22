import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import AddPostModal from "../components/posts/AddPostModal";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import SinglePost from "../components/posts/SinglePost";
import Images from "../assets/Images";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  //Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postLoading },
    getPosts,
    setAddModalShow,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(PostContext);

  // get posts
  useEffect(() => {
    getPosts();
  }, []);

  let body;

  if (postLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1"> Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to ToDo List</Card.Title>
            <Card.Text>
              Click the button below to track your first todo list
            </Card.Text>
            <Button
              variant="primary"
              onClick={setAddModalShow.bind(this, true)}
            >
              ToDo
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/*open Add post Modal */}

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new ToDo</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setAddModalShow.bind(this, true)}
          >
            <img src={Images.addicon} alt="Add icon" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
