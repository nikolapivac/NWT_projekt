import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        //finding the existing user in the database by email
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        //checking the password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        //if the user exist, and if the password is correct, we get the user token
        const token = jwt.sign({ email:existingUser.email, id:existingUser._id }, "test", { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {
        //is there already a user using this email?
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists" });

        //is the confirm password same as password
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        //hashing the password; salt=12
        const hashedPassword = await bcrypt.hash(password, 12);

        //creating the user and token
        const result = await User.create({ email, password:hashedPassword, name:`${firstName} ${lastName}` });
        const token = jwt.sign({ email:result.email, id:result._id }, "test", { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}