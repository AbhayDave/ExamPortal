import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyUserRole = asyncHandler(async (req, _, next) => {
  try {
    const role = req.user?.role;

    if (!role) {
      throw new ApiError(401, "Invalid Access");
    }

    if(role === "teacher" || role === "admin"){
        next();
    }else{
        throw new ApiError(401, "Invalid Access");
    }

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access");
  }
});
