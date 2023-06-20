const client = require('./clients');

module.exports = {
  async getByColumnValue(tableName, columnName, value) {
    const { rows } = await client.query(`SELECT * FROM ${tableName} WHERE ${columnName} = $1`, [value]);
    return rows[0];
  },
  async getAll(table) {
    const { rows } = await client.query(`SELECT * FROM ${table}`);
    return rows;
  },
  async getByType(boolean) {
    const { rows } = await client.query('SELECT * FROM media WHERE is_active = $1', [boolean]);
    return rows;
  },
  async getByEmail(email) {
    const { rows } = await client.query('SELECT * FROM get_user_view WHERE email = $1;', [email]);
    return rows[0];
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
  async modifyOne(table, data) {
    const { rows } = await client.query(`SELECT * FROM update_${table}($1);`, [JSON.stringify(data)]);
    return rows[0];
  },
  async deleteByColumnValue(tableName, columnName, value) {
    await client.query(`DELETE FROM ${tableName} WHERE ${columnName} = $1;`, [value]);
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
