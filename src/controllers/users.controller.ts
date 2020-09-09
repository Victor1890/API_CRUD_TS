import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import User from "../models/User";

export const createUsers = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const user = new User(req.payload);
    const userSaved = await user.save();
    return h.response(userSaved);
  } catch (e) {
    return h.response(e).code(500);
  }
};

export const getUsers = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const users = await User.find();
    return h.response(users);
  } catch (e) {
    return h.response(e).code(500);
  }
};

export const getUser = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const userFound = await User.findById(req.params.id);
    if (userFound) {
      return h.response(userFound);
    }
    return h.response().code(404);
  } catch (e) {
    return h.response(e).code(500);
  }
};

export const deleteUser = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser) {
      return h.response(deleteUser);
    }
    return h.response().code(404);
  } catch (e) {
    return h.response(e).code(500);
  }
};

export const updateUser = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.payload,
      { new: true }
    );

    if (updatedUser) {
      return h.response(updatedUser);
    }
    return h.response().code(404);
  } catch (e) {
    return h.response(e).code(500);
  }
};
