import { useDispatch } from "react-redux";
import { logout } from "../../app/authSlice";
import { logoutUser } from "../../Api/auth/authService";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const response = await logoutUser();
    if (response) dispatch(logout());
  };
  
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
