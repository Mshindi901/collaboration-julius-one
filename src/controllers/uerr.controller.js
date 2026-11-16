import bcrypt from 'bcryptjs';
import { user } from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ;

//Signup func
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //if user already exists
        const existing_user = await user.findOne({ where: { email: email }});
        if (existing_user) {
            return res.send({ message: 'User already exists', status: 400});
        }
        //hash password
        const hashed_password = await bcrypt.hash(password, 12);
        //create new User
        const new_user = await user.create({
            username: username,
            email: email,
            password: hashed_password
        });
        return res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
    console.error({ message: 'Error creating user ${error', status: 500});
    }
};


  //signin func
  export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // user by email
        const user = await user.findOne({ where: { email: email }});
        if (!user) {
            return res.send({ message: 'User does not exist', status: 404});
        };
        //password check
        const is_password_correct = await bcrypt.compare(password, user.password);
        if (!is_password_correct) {
            return res.send({ message: 'Invalid password', status: 400});
        };
        //generate token(jwt)
        const token = jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.send({ message: 'Signin successful', status: 200, token: token});
    } catch (error) {
        return res.send({ message: 'Error signing in ${error', status: 500})
    };
  };