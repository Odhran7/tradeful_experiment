// This is used to validate the id param
import { isValidObjectId } from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }
  next();
};


export default validateObjectId;
