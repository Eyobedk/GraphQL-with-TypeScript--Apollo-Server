
export const typeDefs = `#graphql
    type User {
        name: String
        email: String
        projects: [Project]
    }

    type Project {
        title: String
        status: String
        memebers: [User]
    }

  type Query {
    users: [User]
  }
`;