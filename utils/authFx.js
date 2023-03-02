import jwt from "jsonwebtoken";

const verifyUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res
      .status(200)
      .json({ success: false, message: "Error!   Token was not provided." });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
};
