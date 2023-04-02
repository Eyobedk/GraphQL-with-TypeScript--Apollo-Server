
// database
import {db} from '../database/db';

//sequelize sql datatypes
import { DataTypes }from 'sequelize';

//SCHEMA
export const Project = db.define("projects", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// (Project.sync({ force: true }))

export const createProject = async function (data: any){
    try{
        const project = await Project.findAll({
            where: {title: data.title},
            raw: true
        })

        if(project.length !== 0){
            return console.log("project already exist!")
        }
        
        await Project.create(data);
    }catch(err){throw err}
    
}

