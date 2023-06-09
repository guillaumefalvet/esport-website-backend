const client = require('./clients');

module.exports = {
  async getUser(userName) {
    const { rows } = await client.query('SELECT * FROM "user" WHERE user_name = $1', [userName]);
    return rows;
  },
  async getAll(table) {
    const { rows } = await client.query(`SELECT * FROM ${table}`);
    return rows;
  },
  async getByPk(table, id) {
    const { rows } = await client.query(`SELECT * FROM ${table} WHERE id = $1;`, [id]);
    return rows;
  },
  async getBySlug(slug) {
    const { rows } = await client.query('SELECT * FROM article WHERE slug = $1;', [slug]);
    return rows;
  },
  async getByUserName(table, userName) {
    const { rows } = await client.query(`SELECT * FROM ${table} WHERE user_name = '$1';`, [userName]);
    return rows;
  },
  async getByEmail(email) {
    const { rows } = await client.query('SELECT "user"."id", "user"."user_name", "user"."password", "permission"."name" AS permission_name, "permission"."level" AS permission_level ,"user"."created_at", "user"."updated_at" FROM "user" JOIN "permission" ON "permission"."id" = "user"."user_permission" WHERE "user"."email" = $1;', [email]);
    return rows;
  },
  async createOne(table, data) {
    const { rows } = await client.query(`SELECT * FROM insert_${table}($1);`, [JSON.stringify(data)]);
    return rows[0];
  },
  async modifyByPk(table, data) {
    const { rows } = await client.query(`SELECT * FROM update_${table}($1);`, [JSON.stringify(data)]);
    return rows[0];
  },
  async modifyBySlug(data) {
    const { rows } = await client.query('SELECT * FROM update_article($1);', [JSON.stringify(data)]);
    return rows[0];
  },
  async modifyByUserName(table, data) {
    const { rows } = await client.query(`SELECT * FROM update_${table}($1);`, [JSON.stringify(data)]);
    return rows[0];
  },
  async deleteByPk(table, id) {
    await client.query(`DELETE FROM ${table} WHERE id = $1;`, [id]);
  },
  async deleteBySlug(slug) {
    await client.query('DELETE FROM article WHERE slug = $1;', [slug]);
  },
  async deleteByUserName(table, userName) {
    await client.query(`DELETE FROM ${table} WHERE user_name = $1;`, [userName]);
  },
};
