import {sequelize} from './config.js'


export const database_connection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected');
        await sequelize.sync({alter: true});
        console.log('Models synchronized');
    } catch (error) {
        console.error(`Error with database connection ${error}`);
        return null
    }
};
