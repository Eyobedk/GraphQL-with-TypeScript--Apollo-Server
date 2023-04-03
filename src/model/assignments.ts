
// database
import {db} from '../database/db';

import {Project} from './project';

import { User } from './user';

//sequelize datatypes
import { DataTypes }from 'sequelize';

//SCHEMA
export const Assignment = db.define("assignments", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    project_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'id'
          },
        allowNull: false
      },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
          },
        allowNull: false
      },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// (Assignment.sync({ force: true }))

interface Iassignment {
  user_id : number,
  project_id: number,
  title: string,
  status: string
}

interface Iusers {
  id: number,
  name: string,
  email: string,
}

/**
 * 
 * @param data assignments
 */
export const createAssignment = async function (data: any){
  try{
    await Assignment.create(data).catch(error =>console.log("error:",error));
  }catch(err){
    console.log("MyError: ", err);
    throw err;
  }
    
};

/**
 * 
 * @return data assignments x users
 */
export const gatherAssignments = async function (){
  const query = `
    SELECT assignments.user_id, users.name, assignments.project_id, projects.title, projects.status 
    FROM ((users
    INNER JOIN assignments
    ON users.id = assignments.user_id)
    INNER JOIN projects
    ON assignments.project_id = projects.id);
    `;
  const assignments = await db.query(query)
  return assignments[0];
};

/**
 * 
 * @return users => projects
 */
export const usersWithProjects = async function (){
  
  const usersFromUsersTable : any = await User.findAll({raw: true});
  const assignments : any = await gatherAssignments();

  const users = usersFromUsersTable.map((user: Iusers)=>{
      const project : object[] = [];

      assignments.forEach((assignment: Iassignment) =>{
          if(assignment.user_id === user.id){
              project.push({
                  id: assignment.project_id,
                  title: assignment.title,
                  status: assignment.status
              })
          }
      })
      return {
          id: user.id,
          name: user.name,
          email: user.email,
          projects:project
      }
  });
  
  return users; 
};