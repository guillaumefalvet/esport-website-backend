const client = require('./clients');

module.exports = {
  async getUser(userName) {
    const { rows } = await client.query('SELECT * FROM "user" WHERE user_name = $1', [userName]);
    return rows;
  },
  async getByColumnValue(tableName, columnName, value) {
    const { rows } = await client.query(`SELECT * FROM ${tableName} WHERE ${columnName} = $1`, [value]);
    return rows[0];
  },
  async getByType(boolean) {
    const { rows } = await client.query('SELECT * FROM "media" WHERE is_active = $1', [boolean]);
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
  async getByLink(table, link) {
    const { rows } = await client.query(`SELECT * FROM ${table} WHERE link = $1`, [link]);
    return rows;
  },
  async getBySlug(slug) {
    const { rows } = await client.query('SELECT * FROM article_events_categories_public WHERE slug = $1;', [slug]);
    return rows;
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
  async getReferenceTable(parent, child, parentValue, childValue) {
    const { rows } = await client.query(`SELECT * FROM ${parent}_has_${child} WHERE ${parent}_id = $1 AND ${child}_id = $2;`, [parentValue, childValue]);
    return rows[0];
  },
  async insertReferenceTable(parent, child, parentValue, childValue) {
    const { rows } = await client.query(`INSERT INTO ${parent}_has_${child}("${parent}_id", "${child}_id") VALUES ($1, $2) RETURNING *;`, [parentValue, childValue]);
    return rows[0];
  },
  async modifyByPk(table, data) {
    const { rows } = await client.query(`SELECT * FROM update_${table}($1);`, [JSON.stringify(data)]);
    return rows[0];
  },
  async modifyOne(table, data) {
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
  async modifyByLink(table, data) {
    const { rows } = await client.query(`SELECT * FROM update_${table}($1);`, [JSON.stringify(data)]);
    return rows[0];
  },
  async deleteByPk(table, id) {
    await client.query(`DELETE FROM ${table} WHERE id = $1;`, [id]);
  },
  async deleteByColumnValue(tableName, columnName, value) {
    await client.query(`DELETE FROM ${tableName} WHERE ${columnName} = $1;`, [value]);
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
  async getCalendarHome() {
    const { rows } = await client.query('SELECT * FROM get_calendar_home');
    return rows[0];
  },
  async getAllCalendar() {
    const result = await client.query('SELECT * FROM get_all_calendar');
    return result.rows[0];
  },
};
