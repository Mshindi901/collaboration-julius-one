import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';

export const user_schema = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        timestamps: true,
    }, 

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
    }, 
    
}, {timestamps: true});