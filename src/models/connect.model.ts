import { Sequelize } from 'sequelize';

const connect = new Sequelize();


const checkConnect = async () => {
    await connect.authenticate();
    console.log('mess:: connect successfully!');
}

checkConnect();