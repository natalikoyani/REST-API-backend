import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (req.method === 'PUT') {
    if (!length) {
      return next(HttpError(400, "Missing attached fields"));
    }
  } else if (req.method === 'PATCH') {
    if (!length) {
      return next(HttpError(400, "Missing field favorite"));
    }
  }
  
  next();
};

export default isEmptyBody;