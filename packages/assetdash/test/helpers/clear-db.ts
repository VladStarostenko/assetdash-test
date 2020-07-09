export async function clearDatabase(db) {
  await db.raw('truncate table assets cascade');
}
