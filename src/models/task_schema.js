//CREATE A TASK SCHEMA
//COLUMNS ARE: id, user_id, task_name/name, task_description/description and DATE
//user_id column is Foreign Key
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';

export const task_schema = sequelize.define('tasks', {
    id: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     primaryKey: true   
    },
    users_id: {
        type: DataTypes.UUID,
        //foreign key columns must have reference
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false,
        
    },
    task_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {timestamps: true});
