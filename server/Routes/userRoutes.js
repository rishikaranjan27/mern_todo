import express from "express";
import User from "../Models/userModel.js";
import bcrypt from 'bcryptjs';
import { isAuth, generateToken } from "../utils.js";




const userRouter = express.Router();


userRouter.post(
    '/signin',
    async (req, res) => {

      const user = await User.findOne({ email: req.body.email });

      console.log('email:', req.body.email);

      
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
          });
          return;
        }
      }

      res.status(401).send({ message: 'Invalid email or password' });
      
    }

  );



userRouter.post(
    '/signup',
    async (req, res) => {

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),

        });

        const user = await newUser.save();

        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
        });

    }

);




export default userRouter;