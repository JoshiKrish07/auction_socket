import db from "./db";

export async function getUserById(userId) {
  const query = 'SELECT * FROM register WHERE id = ?'; 

  const [rows] = await db.execute(query, [userId]);

  if (rows.length > 0) {
    return rows[0]; 
  } else {
    return null; 
  }
}
