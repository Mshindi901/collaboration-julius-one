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
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'No task ID'})
        };
        const task = await task.findByPk(id);
        if(!task){
            return res.status(400).json({success: false, message: 'Invalid task'})
        };
        return res.status(200).json({success: true, message: 'Fetched Task', data: task})
    } catch (error) {
        console.error(`Error getting task ${Error}`);
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
};

export const update_task = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: "No task ID"})
        };
        const {name, description, date} = req.body;
        const task = await task.findByPk(id);
        if(!task){
            return res.status(404).json({success: false, message: 'No task found'})
        };
        const updated_task = await task.update({name, description, date});
        if(!updated_task){
            return res.status(500).json({success: false, message: 'Failed to update task'});
        };
        return res.status(200).json({success: true, message: 'updated Successfully'});
    } catch (error) {
        console.error(`Error with updating task ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_task = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'No task ID'})
        };
        const task = await task.findByPk(id);
        if(!task){
            return res.status(400).json({success: false, message: 'Invalid task'})
        };
        await task.destroy();
        return res.status(200).json({success: true, message: 'Task Deleted'})
    } catch (error) {
        console.error(`Error deleting task ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};