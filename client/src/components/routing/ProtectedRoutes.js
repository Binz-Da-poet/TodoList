import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../Layout/NavbarMenu";

const ProtectedRoutes = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <>
        <div className="d-flex justify-content-center mt-2">
          <Spinner animation="border" variant="info" />
        </div>
      </>
    );
  else {
    return isAuthenticated ? (
      <>
        <NavbarMenu />
        <Outlet></Outlet>
      </>
    ) : (
      <Navigate to="/login" />
    );
  }
};

export default ProtectedRoutes;
