// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";

// // export default Feed;
// const Feed = () => {
//   const [error, setError] = useState("");
//   const feed = useSelector((store) => store.feed?.data);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     if (feed?.length) return;

//     try {
//       const res = await axios.get(BASE_URL + "/user/feed", {
//         withCredentials: true,
//       });

//       dispatch(addFeed(res.data));
//     } catch (err) {
//       console.log(err);
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if (error) {
//     return <div className="text-center text-red-500 mt-10">{error}</div>;
//   }

//   if (!feed) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   return (
//     <div className="flex flex-wrap justify-center gap-8 p-8">
//       {feed.map((user) => (
//         <div key={user._id} className="card w-80 bg-base-300 shadow-xl">
//           <figure className="pt-6">
//             <img
//               src={user.photoUrl}
//               alt={user.firstName}
//               className="w-32 h-32 rounded-full object-cover"
//             />
//           </figure>

//           <div className="card-body items-center text-center">
//             <h2 className="card-title">
//               {user.firstName} {user.lastName}
//             </h2>

//             <p>{user.about}</p>

//             <div className="card-actions mt-4">
//               <button className="btn btn-error" >Ignore</button>

//               <button className="btn btn-primary">Interested</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const [error, setError] = useState("");

  const feed = useSelector((store) => store.feed?.data);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        },
      );

      const updatedFeed = feed.filter((user) => user._id !== userId);

      dispatch(addFeed({ data: updatedFeed }));
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!feed) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (feed.length === 0) {
    return (
      <div className="text-center mt-10 text-2xl font-semibold">
        No New Users Found
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {feed.map((user) => (
        <div key={user._id} className="card w-80 bg-base-300 shadow-xl">
          <figure className="pt-6">
            <img
              src={user.photoUrl}
              alt={user.firstName}
              className="w-32 h-32 rounded-full object-cover"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {user.firstName} {user.lastName}
            </h2>

            {user.age && <p>Age: {user.age}</p>}

            {user.gender && <p>{user.gender}</p>}

            <p>{user.about}</p>

            <div className="card-actions mt-4">
              <button
                className="btn btn-error"
                onClick={() => handleSendRequest("ignored", user._id)}
              >
                Ignore
              </button>

              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("interested", user._id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
