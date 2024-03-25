import { config } from 'dotenv';
import { Dialect } from 'sequelize';

//:: biến process.env là 1 object có sẵn trong node chứa các biến môi trường có sẵn của node
/**
 * : do ta đã định nghĩa thêm 1 vài biến môi trường khác trong file .env
 *  nên để các biến môi trường đó được lưu vào process.env => ta phải chạy hàm config() của thư viện dotenv
 *  */
config();

console.log('process:: ', process.env)
interface IConnect {
    HOST: string | undefined,
}

const connectConfig: IConnect = {
    HOST: process.env.HOST,
}

export default connectConfig;