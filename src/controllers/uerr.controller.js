import bcrypt from 'bcryptjs';
import { user } from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
//adding Dotenv as import
import dotenv from 'dotenv';
//configuring dotenv 
dotenv.config();

//JULIUS YOU HEAVILY RELIED ON AI, BECAUSE:
//1. No Dotenv was imported and configured
//2. you used response send instead of a JSON payload
//3. in your catch statement there are no returned response
//4. Unnecessary Capital Letters
//I WILL FIX THEM BUT ACHANA NA AI
const JWT_SECRET = process.env.JWT_SECRET ;

//Signup func
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //if user already exists
        //did not check if the req body contained the right info
        if(!username || !email || !password){
            return res.status(400).json({success: false, message: 'Missing Info'})
        };
        const existing_user = await user.findOne({ where: { email: email }});
        if (existing_user) {
            return res.status(400).json({success: false, message: "Email in user"})
        }
        //hash password
        const hashed_password = await bcrypt.hash(password, 12);
        //create new User
        const new_user = await user.create({
            username: username,
            email: email,
            password: hashed_password
        });
        if(!new_user){
            return res.status(500).json({success: false, message :'Failed to save user info'})
        };
        return res.status(201).json({success: true, message: 'User created successfully'});
    } catch (error) {
        console.error(`Error with signing up user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};


  //signin func
  export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: 'Missing info'})
        }
        // user by email
        const user = await user.findOne({ where: { email: email }});
        if (!user) {
            return res.status(400).json({success: false, message: 'Email does not exist'});
        };
        //password check
        const is_password_correct = await bcrypt.compare(password, user.password);
        if (!is_password_correct) {
            return res.status(400).json({success: false, message: 'Invalid Password'});
        };
        //generate token(jwt)
        //JULIUS ACHANA NA AI 
        //Nilikushow kwa TOken tunaweka id na role, not just id pekee
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({success: true, message: 'signed in successfully'});
    } catch (error) {
        console.error(`Error with signing up user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    };
  };

  //ADMIN SIGN UP
  export const admin_sign_up = async(req, res) => {};

  //GET USER INFO
  export const get_user = async(req, res) => {};


//ACHANA NA AI!!!!!!!