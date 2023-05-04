
// database
import {db} from '../database/db';

//sequelize sql datatypes
import { DataTypes }from 'sequelize';

//SCHEMA
export const User = db.define("users", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password : {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


// (User.sync({ force: true }))

export const createUser = async function (data: any){
    try{
        const user = await User.findAll({
            where: {email: data.email},
            raw: true
        })

        if(user.length !== 0){
            return console.log("user already exist!")
        }
        
        await User.create(data);
    }catch(err){throw err}
    
}
