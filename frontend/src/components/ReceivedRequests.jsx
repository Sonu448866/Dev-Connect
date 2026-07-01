import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const ReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  // const requests = useSelector((store) => store.requests);
  // const dispatch = useDispatch();

  const [error, setError] = useState("");

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // dispatch(addRequest(res.data.connectionRequests));
      setRequests(res.data.connectionRequests);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        {
          withCredentials: true,
        },
      );

      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center text-3xl mt-20">No Pending Requests</div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Connection Requests
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {requests.map((request) => {
          const user = request.fromUserId;

          return (
            <div key={request._id} className="card w-80 bg-base-300 shadow-xl">
              <figure className="pt-6">
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </figure>

              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">
                  {user.firstName} {user.lastName}
                </h2>

                {user.age && (
                  <p>
                    <strong>Age:</strong> {user.age}
                  </p>
                )}

                {user.gender && (
                  <p className="capitalize">
                    <strong>Gender:</strong> {user.gender}
                  </p>
                )}

                {user.about && <p className="mt-2">{user.about}</p>}

                <div className="card-actions mt-5">
                  <button
                    className="btn btn-error"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReceivedRequests;
