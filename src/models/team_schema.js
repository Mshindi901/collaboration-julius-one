import  { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';

export const team = sequelize.define('teams', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false  
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
    team_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('owner', 'member'),
        defaultValue: 'member',
    }
}, {timestamps: true});