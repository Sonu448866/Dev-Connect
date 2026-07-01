import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  // const connections = useSelector((store) => store.connection);
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      // setConnections(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  if (!connections.length) {
    return (
      <div className="text-center text-2xl mt-20">No Connections Found</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">My Connections</h1>

      <div className="space-y-6">
        {connections.map((user) => (
          <div
            key={user._id}
            className="bg-base-300 rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6"
          >
            <img
              src={user.photoUrl}
              alt={user.firstName}
              className="w-28 h-28 rounded-full object-cover border-4 border-primary"
            />

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>

              {user.age && (
                <p className="text-gray-400 mt-1">🎂 {user.age} years old</p>
              )}

              {user.gender && (
                <p className="text-gray-400 capitalize">👤 {user.gender}</p>
              )}

              {user.about && <p className="mt-3 text-gray-300">{user.about}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
