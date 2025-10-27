import {userModel} from "../models/userModel";

const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne(email.trim().toLowerCase());
  return user || null;
};

const getUserByEmailIdAndPassword = async (email: string, password: string) => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const user = await userModel.findOne(cleanEmail);

  if (!user) {
    
    return null;
  }

  if ((user.password || "").trim() !== cleanPassword) {
    
    throw new Error("Password is incorrect");
  }

  return user;
};


const getUserById = async (id: any) => {
  const user = await userModel.findById(id);
  return user || null;
};

export {
  getUserByEmail,
  getUserByEmailIdAndPassword,
  getUserById,
};
