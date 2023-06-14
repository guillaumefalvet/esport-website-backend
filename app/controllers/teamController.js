/* eslint-disable max-len */
/* eslint-disable camelcase */
const dataMapper = require('../models/dataMapper');
const debug = require('debug')('app:controllers:teamController');

const tableName = 'player';
const jsend = {
  status: '',
  data: '',
};

module.exports = {
  async getAll(_, response) {
    debug(`get all ${tableName}`);
    const results = await dataMapper.getAll('player_view');
    jsend.data = results;
    jsend.status = 'success';
    return response.status(200).json(jsend);
  },
  async getOne(request, response, next) {
    debug(`get one ${tableName}`);
    const { user_name } = request.params;
    const result = await dataMapper.getByUserName('player_view', user_name);
    if (result.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  },
  async insertOne(request, response) {
    debug(`insertOne: ${tableName}`);
    const result = await dataMapper.createOne(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    response.status(201).json(jsend);
  },
  async insertMedia(request, response, next) {
    debug('insertMedia');
    // VERIFICATION SI PLAYER EXISTE DANS LA TABLE PLAYER SINON ERREUR
    const { user_name } = request.params;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`player exist: ${findPlayer[0] ? 'true' : 'false'}`);
    // VERIFICATION SI LE MEDIA dans la table MEDIA EXISTE SINON ERREUR
    const media_id = request.params.id;
    const findMedia = await dataMapper.getByPk('media', media_id);
    debug(`media exist: ${findMedia[0] ? 'true' : 'false'}`);
    if (findMedia.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // VERIFICATION DE SAVOIR SI CA EXISTE PAS EN BDD, SI NON >> CONTINUE
    const alreadyExist = await dataMapper.getReferenceTable(tableName, 'media', findPlayer[0].id, media_id);
    debug(`relation exist already :${alreadyExist ? 'true' : 'false'}`);
    if (alreadyExist) {
      const error = new Error();
      error.code = '23505';
      return next(error);
    }
    // CREATION END BDD
    await dataMapper.insertReferenceTable(tableName, 'media', findPlayer[0].id, media_id);
    // RENVOIE LA VERSION VIEW
    const result = await dataMapper.getByUserName('player_view', user_name);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  },
  async insertSetup(request, response, next) {
    debug('insertSetup');
    // VERIFICATION SI PLAYER EXISTE DANS LA TABLE PLAYER SINON ERREUR
    const { user_name } = request.params;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`player exist: ${findPlayer[0] ? 'true' : 'false'}`);
    // VERIFICATION SI LE SETUP dans la table SETUP EXISTE SINON ERREUR
    const setup_id = request.params.id;
    const findSetup = await dataMapper.getByPk('setup', setup_id);
    debug(`setup exist: ${findSetup[0] ? 'true' : 'false'}`);
    if (findSetup.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // VERIFICATION DE SAVOIR SI CA EXISTE PAS EN BDD, SI NON >> CONTINUE
    const alreadyExist = await dataMapper.getReferenceTable(tableName, 'setup', findPlayer[0].id, setup_id);
    debug(`relation exist already :${alreadyExist ? 'true' : 'false'}`);
    if (alreadyExist) {
      const error = new Error();
      error.code = '23505';
      return next(error);
    }
    // CREATION END BDD
    await dataMapper.insertReferenceTable(tableName, 'setup', findPlayer[0].id, setup_id);
    // RENVOIE LA VERSION VIEW
    const result = await dataMapper.getByUserName('player_view', user_name);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  },
  async updateOne(request, response, next) {
    debug(`updateOne: ${tableName}`);
    const { user_name } = request.params;
    request.body.user_name = user_name;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const result = await dataMapper.modifyByUserName(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(201).json(jsend);
  },
  async deleteOne(request, response, next) {
    debug(`deleteOne: ${tableName}`);
    const { user_name } = request.params;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByUserName(tableName, user_name);
    return response.status(204);
  },
  async deleteMedia(request, response, next) {
    debug('deleteMedia');
    // VERIFICATION SI PLAYER EXISTE DANS LA TABLE PLAYER SINON ERREUR
    const { user_name } = request.params;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`player exist: ${findPlayer[0] ? 'true' : 'false'}`);
    const media_id = request.params.id;
    const findMedia = await dataMapper.getByPk('media', media_id);
    // VERIFICATION SI LE MEDIA dans la table MEDIA EXISTE SINON ERREUR
    debug(`media exist: ${findMedia[0] ? 'true' : 'false'}`);
    if (findMedia.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const alreadyExist = await dataMapper.getReferenceTable(tableName, 'media', findPlayer[0].id, media_id);
    debug(`relation exist already :${alreadyExist ? 'true' : 'false'}`);
    // RECUPERATION DE LA TABLE DE RELATION SI EXISTE SINON ERREUR
    if (!alreadyExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // datamappaer.deleteOne avec id de la table de relation
    await dataMapper.deleteByPk(`${tableName}_has_media`, alreadyExist.id);
    return response.status(204);
  },
  async deleteSetup(request, response, next) {
    debug('deleteSetup');
    // VERIFICATION SI PLAYER EXISTE DANS LA TABLE PLAYER SINON ERREUR
    const { user_name } = request.params;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`player exist: ${findPlayer[0] ? 'true' : 'false'}`);
    const setup_id = request.params.id;
    const findSetup = await dataMapper.getByPk('media', setup_id);
    // VERIFICATION SI LE SETUP dans la table SETUP EXISTE SINON ERREUR
    debug(`setup exist: ${findSetup[0] ? 'true' : 'false'}`);
    if (findSetup.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const alreadyExist = await dataMapper.getReferenceTable(tableName, 'setup', findPlayer[0].id, setup_id);
    debug(`relation exist already :${alreadyExist ? 'true' : 'false'}`);
    // RECUPERATION DE LA TABLE DE RELATION SI EXISTE SINON ERREUR
    if (!alreadyExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // datamappaer.deleteOne avec id de la table de relation
    await dataMapper.deleteByPk(`${tableName}_has_setup`, alreadyExist.id);
    return response.status(204);
  },
};
