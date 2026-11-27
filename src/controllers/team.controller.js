import { team } from '../models/team_schema.js';
import { user } from '../models/userSchema.js';

//CREATE, READ, UPDATE AND DELETE
export const add_team = async(req, res) => {
    try {
        const {team_name, team_description} = req.body;
        if(!team_name || !team_description){
            return res.status(400).json({success: false, message: 'Missing Info'});
        };
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please Login'});
        };
        //verify user
        const is_user = await user.findByPk(user_id);
        if(!is_user){
            return res.status(404).json({success: false, message: 'Invalid User'});
        };
        await team.create({users_id: user_id, team_name: team_name, team_description: team_description})
        return res.status(201).json({success: true, message: "Team Added"});
    } catch (error) {
        console.error('Error adding team ${error}');
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    };
};
export const add_team_member = async(req, res) => {
    try {
        const {team_id, user_id} = req.body;
        if(!team_id || !user_id){
            return res.status(400).json({success: false, message: 'Missing Info'});
        };
        //verify team
        const is_team = await team.findByPk(team_id);
        if(!is_team){
            return res.status(404).json({success: false, message: 'Invalid Team'});
        };
        //verify user
        const is_user = await user.findByPk(user_id);
        if(!is_user){
            return res.status(404).json({success: false, message: 'Invalid User'});
        };
        await is_team.addUser(is_user);
        return res.status(201).json({success: true, message: "Team Member Added"});
    } catch (error) {
        console.error('Error adding team member ${error}');
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    };
};
export const get_team = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'No team ID'})
        };
        const team = await team.findByPk(id);
        if(!team){
            return res.status(400).json({success: false, message: 'Invalid team'})
        };
        return res.status(200).json({success: true, message: 'Fetched team', data: team});
    } catch (error) {
        console.error('Error getting team ${error}');
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    };
};
export const update_team = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'No team ID'});
        };
        const {team_name, team_description} = req.body;
        const team = await team.findByPk(id);
        if(!team){
            return res.status(404).json({success: false, message: 'No team found'});
        };
        const updated_team = await team.update({team_name, team_description});
        if(!updated_team){
            return res.status(500).json({success: false, message: 'Failed to update team'});
        };
        return res.status(200).json({success: true, message: 'updated Successfully'});
    } catch (error) {
        console.error('Error updating team ${error}');
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    };
};
export const delete_team = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'No team ID'});
        };
        const team = await team.findByPk(id);
        if(!team){
            return res.status(404).json({success: false, message: 'No team found'});
        };
        const deleted_team = await team.destroy();
        if(!deleted_team){
            return res.status(500).json({success: false, message: 'Failed to delete team'});
        };
        return res.status(200).json({success: true, message: 'Deleted Successfully'});
    } catch (error) {
        console.error('Error deleting team ${error}');
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    };
};

