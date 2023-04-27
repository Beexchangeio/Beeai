import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser)
      return res.status(400).json({
        message: "email already used",
      });

    const user = new User({ email });

    user.setPassword(password);

    await user.save();

    res.status(201).json({});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("email password salt id");

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    if (!user.validPassword(password))
      return res.status(400).json({
        message: "Wrong password",
      });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24H" }
    );

    res.status(200).json({
      token,
      email,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, data) => {
      data.setPassword(req.body.password);
      data
        .save()
        .then(() => {
          return res.status(200).json({
            message: "Updated Password Successfully.",
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(404).json({
            error,
            message: "Password not updated!",
          });
        });
    });
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
};
