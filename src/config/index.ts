import { Dialect } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config({path: '.env'});


export const config :{name:string, userName: string, pass: string, DBport: number, type: Dialect, Host: string} = {
    name: process.env.DATABASE_NAME!,

    userName: process.env.DB_USER_NAME!,
  
    pass: process.env.DB_PASSWORD!,

    Host: process.env.DATABASE_HOST!,

    DBport : process.env.DB_PORT as unknown as number,

    type: process.env.DATABASE_TYPE! as unknown as Dialect
}