import { Request, Response } from 'express';
import User from '../models/user'

async function handleGetAllUser(req: Request, res: Response) {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

const handleGetUserById = async (req: Request, res: Response) => {
    // console.log("Get User called");

    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ msg: "User not Found" });
    }
    return res.json(user);
}

const handleUpdateUserById = async (req: Request, res: Response) => {
    const changeUser = await User.findByIdAndUpdate(req.params.id, {
        f_name: req.body.name,
    });
    return res.status(200).json({ msg: 'Successfully changed ' })
}

const handleDateleUserBtId = async (req: Request, res: Response) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'User deleted SuccessFully.' })
}

const handleCreateUser = async (req: Request, res: Response) => {
    const body = req.body;
    console.log("Body ==> ", body);
    if (
        !body.name &&
        !body.last_name &&
        !body.email &&
        !body.job_title &&
        !body.gender
    ) {
        return res.status(400).json({ msg: "All fields are req ... " });
    }

    const result = await User.create({
        f_name: body.name,
        l_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender,
    });

    console.log("Result ==> ", result);
    return res.status(201).json({ msg: "data addded successfully" });
}

export { handleGetAllUser, handleGetUserById, handleUpdateUserById, handleDateleUserBtId, handleCreateUser }