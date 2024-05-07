import User from "../../model/userModel.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../sendMail.js";

const CreateUser = async (newUser) => {
  const { username, email, password } = newUser;
  try {
    const checkUser = await User.findOne({ where: { email: email } });

    if (checkUser !== null) {
      return {
        status: "ERR",
        message: "The email is already in use.",
      };
    }

    const hash = bcrypt.hashSync(password, 10);

    const createUser = await User.create({
      username,
      email,
      password: hash,
    });

    if (createUser) {
      sendMail(email);
      return {
        status: "OK",
        message: "SUCCESS",
        data: createUser,
      };
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export { CreateUser };
