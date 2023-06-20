const debug = require('debug')('app:controllers:team');
const CoreController = require('./CoreController');

const jsend = {
  status: 'success',
};

class TeamController extends CoreController {
  static tableName = 'player';

  static tableNameView = 'player_view';

  static columnName = 'user_name';

  constructor() {
    super();
    debug('TeamController created');
  }

  async createMediaRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'media', 'id');
    if (createReference) {
      response.status(200).json(jsend);
    }
  }

  async createSetupRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'setup', 'id');
    if (createReference) {
      response.status(200).json(jsend);
    }
  }

  async deleteMediaRelation(request, response, next) {
    await this.deleteReference(request, next, 'media', 'id');
    return response.status(204);
  }

  async deleteSetupRelation(request, response, next) {
    await this.deleteReference(request, next, 'setup', 'id');
    return response.status(204);
  }
}

module.exports = new TeamController();
