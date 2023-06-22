const debug = require('debug')('app:controllers:team');
const CoreController = require('./CoreController');

const jsend = {
  status: 'success',
};
/**
 * @typedef {object} TeamController
 * @property {function} createMediaRelation - Create a relation between a team and a media entry.
 * @property {function} createSetupRelation - Create a relation between a team and a setup entry.
 * @property {function} deleteMediaRelation - Delete a relation between a team and a media entry.
 * @property {function} deleteSetupRelation - Delete a relation between a team and a setup entry.
 */

/**
 * TeamController class
 * @class
 * @classdesc Controller class for managing team-related operations.
 * @extends CoreController
 */
class TeamController extends CoreController {
  /**
   * Name of the table for team entries.
   * @type {string}
   */
  static tableName = 'player';

  /**
   * Name of the view table for team entries.
   * @type {string}
   */
  static tableNameView = 'player_view';

  /**
   * Name of the primary column in the team table.
   * @type {string}
   */
  static columnName = 'user_name';

  /**
   * Name of the secondary column in the team table.
   * @type {string}
   */
  static secondaryColumnName = 'id';

  /**
   * Constructs a new instance of the TeamController.
   */
  constructor() {
    super();
    debug('TeamController created');
  }

  /**
   * Create a relation between a team and a media entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 201 - Success message if the relation is created successfully.
   */
  async createMediaRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'media', 'id');
    if (createReference) {
      response.status(201).json(jsend);
    }
  }

  /**
   * Create a relation between a team and a setup entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 201 - Success message if the relation is created successfully.
   */
  async createSetupRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'setup', 'id');
    if (createReference) {
      response.status(201).json(jsend);
    }
  }

  /**
   * Delete a relation between a team and a media entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 204 - Success message if the relation is deleted successfully.
   */
  async deleteMediaRelation(request, response, next) {
    await this.deleteReference(request, next, 'media', 'id');
    return response.status(204).send();
  }

  /**
   * Delete a relation between a team and a setup entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 204 - Success message if the relation is deleted successfully.
   */
  async deleteSetupRelation(request, response, next) {
    await this.deleteReference(request, next, 'setup', 'id');
    return response.status(204).send();
  }
}

module.exports = new TeamController();
