import Button from "react-bootstrap/Button";
import images from "../../assets/Images";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, FindPost, setShowUpdateModal } = useContext(PostContext);
  const choosePost = (postId) => {
    FindPost(postId);
    setShowUpdateModal(true);
  };
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={images.playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button" onClick={choosePost.bind(this, _id)}>
        <img src={images.editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deletePost.bind(this, _id)}>
        <img src={images.deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
