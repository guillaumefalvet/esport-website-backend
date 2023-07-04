const { execute } = require('@getvim/execute');
const dayjs = require('dayjs');
require('dayjs/locale/fr');
const debug = require('debug')('app:service:backupService');
const fs = require('fs');
const mailingService = require('./mailingService');

const { PGUSER, PGDATABASE, EMAIL_ADDRESS } = process.env;
const currentDate = dayjs().locale('fr').format('dddd-D-MMMM-YYYY-HH:mm');
const fileName = `database-backup-${currentDate}.tar`;
/**
 * The backup service module.
 * @module backupService
 */
module.exports = {
  /**
   * Perform a database dump as a backup.
   *
   * @async
   * @function
   * @returns {Promise<void>} - A promise that resolves when the backup is completed.
   */
  async dump() {
    execute(`pg_dump -U ${PGUSER} -d ${PGDATABASE} -f ./private/backup/${fileName} -F t`).then(async () => {
      // optional uncomment to compress
      // const compress = require('gzipme');
      // await compress(fileName);
      // fs.unlinkSync(fileName);
      const adminTemplateBackUp = fs.readFileSync('./app/services/mailingService/templates/adminTemplateBackUp.hbs', 'utf8');
      const data = {
        message: `database backup of: ${currentDate}`,
        path: `private/backup/${fileName}`,
      };
      await mailingService(data, adminTemplateBackUp, EMAIL_ADDRESS, 'database backup');
      debug('Finito');
    }).catch((err) => {
      debug(err);
    });
  },
  /**
   * Restore a database from a backup file.
   *
   * @async
   * @function
   * @param {string} file - The path to the backup file.
   * @returns {Promise<void>} - A promise that resolves when the restore is completed.
   */
  async restore(file) {
    execute(`pg_restore -cC -d ${PGDATABASE} ${file}`).then(async () => {
      debug('Restored');
    }).catch((err) => {
      debug(err);
    });
  },
};
