import db from "./db";

// Update user password
export async function updatePassword(userId, hashedPassword) {
  const query = 'UPDATE user SET password = ? WHERE id = ?';

  await db.execute(query, [hashedPassword, userId]);
}
