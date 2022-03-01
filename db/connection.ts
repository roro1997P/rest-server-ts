import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize('Node', process.env.USER || '', process.env.PASSWORD || '', {
    host: 'localhost',
    dialect: 'mssql',
});

export default db;