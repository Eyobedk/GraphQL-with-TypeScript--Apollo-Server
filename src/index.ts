import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import {typeDefs} from './graphql/schema'
import { resolvers } from './graphql/resolvers';

import {createUser, User} from './model/user';
import {createProject, Project} from './model/project';
import {createAssignment, usersWithProjects, Assignment, gatherAssignments} from './model/assignments';

import {connect} from './loaders/database';



interface IUsers {
  name: string,
  email: string,
  password: String
}
interface IProject {
  title: string,
  status: string
}

interface IAssignment {
  project_id : number,
  user_id: number,
  user_name: string
}

const user : IUsers = {name: "zerihun", email: "zerihunhabtemikael@gmail.com", password: "1234"};
const project : IProject = {title: "kemer", status: "active"};
const assignment : IAssignment = {project_id: 2, user_id: 1, user_name: "zeru"};

try{
  //connect database
  connect();

  //Functions to check database queries before using it for graphql, kept for practicing
            // User
  // User.sync({ force: true });
  // createUser(user);

            // Project
  // Project.sync({ force: true });
  // createProject(project);

            // Assignment
  // Assignment.sync({ force: true });
  // createAssignment(assignment);
  //  gatherAssignments();

  // async function run() {
  //      console.log(await usersWithProjects());

  // }
  // run()
  
}catch(err){
  console.log(err)
  throw err
}



const server = new ApolloServer({
    typeDefs,
    resolvers,
});


startStandaloneServer(server, {
    listen: { port: 8000 },
}).then(({url} : {url : String}) =>   console.log(`🚀  Server ready at: ${url}`));