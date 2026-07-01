import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();

    console.log("Logout clicked");

    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      console.log("Success:", res.data);

      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            DevConnect
          </Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end mx-5">
              <span className="font-medium mx-4">
                Welcome,{user.data.firstName}
              </span>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user photo" src={user.data.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to={"/profile"}>
                    Edit Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/getReceivedRequests"}>Received Requests</Link>
                </li>
                <li>
                  <Link to={"/getAllConnections"}>My Connections</Link>
                </li>
                <li>
                  <Link to={"/login"} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
