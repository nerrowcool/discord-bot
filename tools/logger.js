const log4js = require('log4js');
log4js.configure({
  appenders: { logger: { type: 'file', filename: 'log.log' } },
  categories: { default: { appenders: ['logger'], level: 'trace' } }
});
const logger = log4js.getLogger('logger');

module.exports = logger;