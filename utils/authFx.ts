import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const verifyUser = async (req: NextRequest) => {
  //Authorization: 'Bearer TOKEN'
  const token = req.cookies.get("auth").value?.split(" ")[1];
  if (!token) {
    return false;
  }
  //Decoding the token
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return false;
    }
    return decodedToken;
  } catch (error) {
    return false;
  }
};
