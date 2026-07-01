// import axios from "axios";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { addUser } from "../utils/userSlice";

// const EditProfile = () => {
//   const user = useSelector((store) => store.user?.data);

//   const dispatch = useDispatch();

//   const [firstName, setFirstName] = useState(user?.firstName || "");
//   const [lastName, setLastName] = useState(user?.lastName || "");
//   const [age, setAge] = useState(user?.age || "");
//   const [gender, setGender] = useState(user?.gender || "");
//   const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
//   const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
//   const [about, setAbout] = useState(user?.about || "");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleUpdate = async () => {
//     try {
//       setError("");
//       setSuccess("");

//       const res = await axios.patch(
//         BASE_URL + "/profile/edit",
//         {
//           firstName,
//           lastName,
//           age,
//           gender,
//           photoUrl,
//           about,
//           skills: skills
//             .split(",")
//             .map((skill) => skill.trim())
//             .filter(Boolean),
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       dispatch(addUser(res.data));

//       setSuccess("Profile updated successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-10 items-start">
//       {/* Edit Form */}
//       <div className="w-[400px] bg-base-200 rounded-xl p-6 shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="First Name"
//             className="input input-bordered w-full"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Last Name"
//             className="input input-bordered w-full"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />

//           <input
//             type="number"
//             placeholder="Age"
//             className="input input-bordered w-full"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />

//           <select
//             className="select select-bordered w-full"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Skills (comma separated)"
//             className="input input-bordered w-full"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Photo URL"
//             className="input input-bordered w-full"
//             value={photoUrl}
//             onChange={(e) => setPhotoUrl(e.target.value)}
//           />

//           <textarea
//             placeholder="About"
//             className="textarea textarea-bordered w-full"
//             rows={4}
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//           />

//           {error && <p className="text-red-500">{error}</p>}

//           {success && <p className="text-green-500">{success}</p>}

//           <button className="btn btn-primary w-full" onClick={handleUpdate}>
//             Update Profile
//           </button>
//         </div>
//       </div>

//       {/* Live Preview Card */}
//       <div className="card w-80 bg-base-300 shadow-xl">
//         <figure className="pt-6">
//           <img
//             src={photoUrl}
//             alt="profile"
//             className="w-32 h-32 rounded-full object-cover"
//           />
//         </figure>

//         <div className="card-body items-center text-center">
//           <h2 className="card-title">
//             {firstName} {lastName}
//           </h2>

//           {age && <p>Age: {age}</p>}
//           {gender && <p>{gender}</p>}

//           {skills && (
//             <p>
//               Skills:
//               <br />
//               {skills}
//             </p>
//           )}

//           <p>{about}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user?.data);
  const dispatch = useDispatch();

  // Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Card Preview State
  const [previewUser, setPreviewUser] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Populate form and card when user data arrives
  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setSkills(user.skills?.join(", ") || "");
    setPhotoUrl(user.photoUrl || "");
    setAbout(user.about || "");

    setPreviewUser(user);
  }, [user]);

  const handleUpdate = async () => {
    try {
      setError("");
      setSuccess("");

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));
      setPreviewUser(res.data.data);

      setSuccess("Profile updated successfully");

      // Show toast
      setToastMessage("✅ Profile updated successfully");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      setError(message);

      // Error toast
      setToastMessage(`❌ ${message}`);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* ================= FORM ================= */}
      <div className="w-[420px] bg-base-300 rounded-3xl p-8 shadow-2xl border border-base-300">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>

        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text">Age</span>
            </label>

            <input
              type="number"
              className="input input-bordered w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text">Gender</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="label">
              <span className="label-text">Skills (comma separated)</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          {/* About */}
          <div>
            <label className="label">
              <span className="label-text">About</span>
            </label>

            <textarea
              rows={4}
              className="textarea textarea-bordered w-full"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {success && <p className="text-green-500 text-center">{success}</p>}

          {/* Button */}
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleUpdate}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* ================= PROFILE CARD ================= */}
      {previewUser && (
        <div className="w-96 bg-base-200 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>

          {/* Profile Image */}
          <div className="flex justify-center -mt-16">
            <img
              src={previewUser.photoUrl}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-base-200 object-cover shadow-xl"
            />
          </div>

          {/* Details */}
          <div className="px-8 pb-8 text-center">
            <h2 className="text-3xl font-bold mt-4">
              {previewUser.firstName} {previewUser.lastName}
            </h2>

            {previewUser.age && (
              <p className="text-gray-400 mt-3">
                🎂 {previewUser.age} years old
              </p>
            )}

            {previewUser.gender && (
              <p className="text-gray-400 capitalize">
                👤 {previewUser.gender}
              </p>
            )}

            {previewUser.about && (
              <p className="mt-5 text-gray-300 leading-7">
                {previewUser.about}
              </p>
            )}

            {previewUser.skills?.length > 0 && (
              <>
                <div className="divider">Skills</div>

                <div className="flex flex-wrap justify-center gap-2">
                  {previewUser.skills.map((skill, index) => (
                    <span key={index} className="badge badge-primary badge-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${
              error ? "alert-error" : "alert-success"
            } shadow-lg`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
