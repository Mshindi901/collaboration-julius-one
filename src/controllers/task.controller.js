<<<<<<< HEAD
// ndo hii
=======
import { task, task } from "../models/task_schema.js";
import { user } from "../models/userSchema.js";

//CREATE, READ, UPDATE AND DELETE
export const add_task = async(req, res) => {
    try {
        const {name, description, date} = req.body;
        if(!name || !description || !date){
            return res.status(400).json({success: false, message: 'Missing Info'});
        };
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please Login'});
        };
        //verify user
        const is_user = await user.findByPk(id);
        if(!is_user){
            return res.status(404).json({success: false, message: 'Invalid User'});
        };
        await task.create({user_id: user_id, task_name: name, task_description: description, date: date})
        return res.status(201).json({success: true, message: "Task Added"});
    } catch (error) {
        console.error(`Error with Task Management ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const get_task = async(req, res) => {
    try {
        const {id} = req.body;
        if(!id){
            return res.status(400).json({success: false, message: 'No task ID'})
        };
        const task = await task.findByPk(id);
        if(!task){
            return res.status(400).json({success: false, message: 'Invalid task'})
        }
    } catch (error) {
        console.error('Error getting task ${Error}')
    }
};

export const update_task = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: "No task ID"})
        };
        const task = await task.findByPk(id);
        if(!task){
            return res.status(404).json({success: false, message: 'No task found'})
        }
    } catch (error) {
        
    }
};

export const delete_task = async(req, res) => {};
>>>>>>> 29c7136 (added task create, get update and delete controllers)
