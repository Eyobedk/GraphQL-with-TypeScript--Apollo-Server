
import { Sequelize, Dialect } from 'sequelize';
import {config} from '../config';

const options : {port: number, host:string, dialect: Dialect,  logging: boolean} = {
  port: config.DBport,
  host: config.Host,
  dialect: 'mysql',
  logging: false
}

export const db = new Sequelize(config.name, config.userName, config.pass,options);