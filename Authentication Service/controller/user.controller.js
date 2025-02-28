import User from "../model/user.model.js";
import Session from "../model/session.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userFound = await User.findOne({ where: { email } });
    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "USER",
    });

    return res
      .status(201)
      .json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    console.error("Error in createUser:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await Session.create({
      userId: userFound.id,
      token,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    });

    return res.status(200).json({ message: "Signed in successfully", token });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    console.error("Error in profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
