import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ _id, owner });
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json({ message: "contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  deleteById: ctrlWrapper(deleteById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
};
