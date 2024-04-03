import { useSelector } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
export default function UserProfileData() {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="container w-1/4 bg-white shadow-md rounded-lg p-6 mx-auto my-16">
      <div className="header bg-red-600 text-white font-sans text-lg text-center py-3 rounded-lg">
        User Profile
      </div>

      <ul className="text-lg mt-5 font-sans">
        <li className="flex items-center gap-3 ">
          <CiCircleCheck className="text-2xl" />{" "}
          <div>Name: {userData.name}</div>
        </li>
        <li className="flex items-center gap-3 ">
          <CiCircleCheck className="text-2xl" />{" "}
          <div>Username: {userData.username}</div>
        </li>
        <li className="flex items-center gap-3">
          <CiCircleCheck className="text-2xl" />{" "}
          <div>Email: {userData.email}</div>
        </li>
        <li className="flex items-center gap-3">
          <CiCircleCheck className="text-2xl" />{" "}
          <div>Role: {userData.role}</div>
        </li>
      </ul>
    </div>
  );
}
