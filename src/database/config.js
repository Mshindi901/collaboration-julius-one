import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgresql://neondb_owner:npg_LcQq2OEBV7wu@ep-snowy-tree-bek39gog-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require', {
    dialect: 'postgres',
    logging: false
});
