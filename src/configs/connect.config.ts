import { config } from 'dotenv';

//:: biến process.env là 1 object có sẵn trong node chứa các biến môi trường có sẵn của node
/**
 * : do ta đã định nghĩa thêm 1 vài biến môi trường khác trong file .env
 *  nên để các biến môi trường đó được lưu vào process.env => ta phải chạy hàm config() của thư viện dotenv
 *  */
config();

console.log('process:: ', process.env)

export default {
    DATABASE: process.env.DATABASE,
    USERNAME: process.env.USERNAME,
    PORT: process.env.PORT,
    DIALECT: process.env.DIALECT,
}