// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
import {db} from '../database/db';

// import {getUsers} from "../database/tables/assignment"
import {usersWithProjects} from "../model/assignments"

/**
 * fake datas
 * @returns mock data
 */

export const resolvers = {
    Query: {
      users: () => usersWithProjects(),
    },
};