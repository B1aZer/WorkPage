var config = {}

config.redis = {};
config.user = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.user.name = 'admin';
config.user.pass = 'admin';

module.exports = config;

