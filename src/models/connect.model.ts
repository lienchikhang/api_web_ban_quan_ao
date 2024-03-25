import { Sequelize } from 'sequelize';
import connectConfig from '../configs/connect.config.js';

const sequelize = new Sequelize('db_webbanquanao', 'root', '1234', {
    host: connectConfig.HOST,
    dialect: 'mysql',
    port: 3307,
});


const checkConnect = async () => {
    await sequelize.authenticate();
    console.log('mess:: connect successfully!');
}

checkConnect();

export default sequelize;