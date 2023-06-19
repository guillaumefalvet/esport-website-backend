/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const debug = require('debug')('app:controllers:articleController');
const dataMapper = require('../models/dataMapper');

const tableName = 'article';
const jsend = {
  status: '',
  data: '',
};
module.exports = {
  async getAll(request, response) {
    const { home } = request.query;
    if (home) {
      debug(`get all public ${tableName} for homepage`);
      const results = await dataMapper.getAll('get_article_home');
      jsend.data = results;
      return response.status(200).json(jsend);
    }
    debug(`get all public ${tableName}`);
    const results = await dataMapper.getAll('article_events_categories_public');
    jsend.data = results;
    return response.status(200).json(jsend);
  },
  async getAllPrivate(_, response) {
    debug(`get all private ${tableName}`);
    const results = await dataMapper.getAll('article_events_categories_private');
    jsend.data = results;
    return response.status(200).json(jsend);
  },
  async getOne(request, response, next) {
    debug(`get one ${tableName}`);
    const { slug } = request.params;
    const result = await dataMapper.getBySlug(slug);
    if (!result.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    jsend.status = 'success';
    jsend.data = result[0];
    return response.status(200).json(jsend);
  },
  async insertOne(request, response, next) {
    debug(`insertOne: ${tableName}`);
    const { slug } = request.body;
    const findArticle = await dataMapper.getBySlug(slug);
    debug(findArticle.length);
    if (findArticle.length) {
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    const result = await dataMapper.createOne(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(201).json(jsend);
  },
  async insertCategory(request, response, next) {
    debug('insertCategory');
    // VERIFICATION SI ARTICLE EXISTE DANS LA TABLE ARTICLE SINON ERREUR
    const { slug } = request.params;
    const findArticle = await dataMapper.getBySlug(slug);
    if (!findArticle.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`article exist: ${findArticle[0] ? 'true' : 'false'}`);
    // VERIFICATION SI LE CATEGORY dans la table CATEGORY EXISTE SINON ERREUR
    const category_id = request.params.id;
    const findCategory = await dataMapper.getByPk('category', category_id);
    debug(`category exist: ${findCategory[0] ? 'true' : 'false'}`);
    if (!findCategory.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // VERIFICATION DE SAVOIR SI CA EXISTE PAS EN BDD, SI NON >> CONTINUE
    const alreadyExist = await dataMapper.getReferenceTable('article', 'category', findArticle[0].id, category_id);
    debug(`relation exist already :${alreadyExist ? 'true' : 'false'}`);
    if (alreadyExist) {
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    // CREATION END BDD
    await dataMapper.insertReferenceTable('article', 'category', findArticle[0].id, category_id);
    // RENVOIE LA VERSION VIEW
    const result = await dataMapper.getBySlug(slug);
    jsend.status = 'success';
    jsend.data = result[0];
    return response.status(200).json(jsend);
  },
  async insertCalendar(request, response, next) {
    debug('insertCalendar');
    // VERIFICATION SI ARTICLE EXISTE DANS LA TABLE ARTICLE SINON ERREUR
    const { slug } = request.params;
    const findArticle = await dataMapper.getBySlug(slug);
    if (!findArticle.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`article exist: ${findArticle[0] ? 'true' : 'false'}`);
    // VERIFICATION SI LE CATEGORY dans la table CALENDRIER EXISTE SINON ERREUR
    const calendar_id = request.params.id;
    const findCalendar = await dataMapper.getByPk('category', calendar_id);
    debug(`calendar exist: ${findCalendar[0] ? 'true' : 'false'}`);
    if (!findCalendar.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // VERIFICATION DE SAVOIR SI CA EXISTE PAS EN BDD, SI NON >> CONTINUE
    const alreadyExist = await dataMapper.getReferenceTable('article', 'calendar', findArticle[0].id, calendar_id);
    debug(`relation exist already :${alreadyExist ? 'true' : 'false'}`);
    if (alreadyExist) {
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    // CREATION END BDD
    await dataMapper.insertReferenceTable('article', 'calendar', findArticle[0].id, calendar_id);
    // RENVOIE LA VERSION VIEW
    const result = await dataMapper.getBySlug(slug);
    jsend.status = 'success';
    jsend.data = result[0];
    return response.status(200).json(jsend);
  },
  async updateOne(request, response, next) {
    debug(`updateOne: ${tableName}`);
    const { slug } = request.params;
    request.body.slug = slug;
    const findArticle = await dataMapper.getBySlug(slug);
    if (findArticle.rowCount === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const result = await dataMapper.modifyBySlug(request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(201).json(jsend);
  },
  async deleteOne(request, response, next) {
    debug(`deleteOne: ${tableName}`);
    const { slug } = request.params;
    const findArticle = await dataMapper.getBySlug(slug);
    if (findArticle.rowCount === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteBySlug(slug);
    return response.status(204);
  },
  async deleteCategory(request, response, next) {
    debug('deleteCategory');
    // VERIFICATION SI ARTICLE EXISTE DANS LA TABLE ARTICLE SINON ERREUR
    const { slug } = request.params;
    const findArticle = await dataMapper.getBySlug(slug);
    if (!findArticle.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`article exist: ${findArticle[0] ? 'true' : 'false'}`);
    // VERIFICATION SI LE CATEGORY dans la table CATEGORY EXISTE SINON ERREUR
    const category_id = request.params.id;
    const findCategory = await dataMapper.getByPk('category', category_id);
    debug(`category exist: ${findCategory[0] ? 'true' : 'false'}`);
    if (!findCategory.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // VERIFICATION DE SAVOIR SI CA EXISTE PAS EN BDD, SI OUI >> CONTINUE
    const alreadyExist = await dataMapper.getReferenceTable('article', 'category', findArticle[0].id, category_id);
    debug(`relation exist  :${alreadyExist ? 'true' : 'false'}`);
    if (!alreadyExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // datamappaer.deleteOne avec id de la table de relation
    await dataMapper.deleteByPk(`${tableName}_has_category`, alreadyExist.id);
    return response.status(204);
  },
  async deleteCalendar(request, response, next) {
    debug('deleteCalendar');
    // VERIFICATION SI ARTICLE EXISTE DANS LA TABLE ARTICLE SINON ERREUR
    const { slug } = request.params;
    const findArticle = await dataMapper.getBySlug(slug);
    if (!findArticle.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`article exist: ${findArticle[0] ? 'true' : 'false'}`);
    // VERIFICATION SI LE CATEGORY dans la table CALENDRIER EXISTE SINON ERREUR
    const calendar_id = request.params.id;
    const findCalendar = await dataMapper.getByPk('category', calendar_id);
    debug(`calendar exist: ${findCalendar[0] ? 'true' : 'false'}`);
    if (!findCalendar.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // VERIFICATION DE SAVOIR SI CA EXISTE PAS EN BDD, SI OUI >> CONTINUE
    const alreadyExist = await dataMapper.getReferenceTable('article', 'calendar', findArticle[0].id, calendar_id);
    debug(`relation exist already :${alreadyExist ? 'true' : 'false'}`);
    if (!alreadyExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // datamappaer.deleteOne avec id de la table de relation
    await dataMapper.deleteByPk(`${tableName}_has_calendar`, alreadyExist.id);
    return response.status(204);
  },
};
