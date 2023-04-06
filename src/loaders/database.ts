import { db } from "../database/db";

export async function connect(){
    await db.authenticate().then(() => {
      console.log('✌️ DB loaded and connected!');
    }).catch((error) => {
      console.error('⚠Unable to connect to the database:', error);
      db.close()
    });
}