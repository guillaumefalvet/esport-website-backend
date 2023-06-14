const client = require('./clients');

module.exports = {
  async getUser(userName) {
    const { rows } = await client.query('SELECT * FROM "user" WHERE user_name = $1', [userName]);
    return rows;
  },
  async getAll(table) {
    const { rows } = await client.query(`SELECT * FROM ${table} ORDER BY "id" DESC; `);
    return rows;
  },
  async getByPk(table, id) {
    const { rows } = await client.query(`SELECT * FROM "${table}" WHERE id = $1;`, [id]);
    return rows;
  },
  async getBySlug(slug) {
    const result = await client.query('SELECT * FROM article_events_categories WHERE slug = $1;', [slug]);
    return result;
  },
  async getByUserName(table, userName) {
    const { rows } = await client.query(`SELECT * FROM ${table} WHERE user_name = $1;`, [userName]);
    return rows;
  },
  async getByEmail(email) {
    const { rows } = await client.query('SELECT * FROM get_user_view WHERE email = $1;', [email]);
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
  async getRefreshToken(id) {
    const preparedQuery = {
      text: 'SELECT "refresh_token" FROM "user" WHERE "id" = $1',
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0].refresh_token;
  },
  async setRefreshToken(id, token) {
    const preparedQuery = {
      text: 'UPDATE "user" SET "refresh_token" = $2 WHERE "id" = $1 RETURNING *',
      values: [id, token],
    };
    const { rows } = await client.query(preparedQuery);
    return rows;
  },
};
