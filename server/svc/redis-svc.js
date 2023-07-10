const redis = require('redis');
const { promisify } = require('util');

const { SESSION_TIME_IN_M } = process.env;

const redisService = class {

    constructor() {
        this.redisClient = redis.createClient();
        this.redisClient.connect().catch(console.error);

        this.redisClient.on("error", function (err) {
            console.log("Error: " + err);
        });

        this.redisClient.on('reconnecting', () => {
            console.log('Redis is reconnecting');
        });

        this.redisGet = promisify(this.redisClient.get).bind(this.redisClient);
        this.redisSet = promisify(this.redisClient.set).bind(this.redisClient);
        this.redisDel = promisify(this.redisClient.del).bind(this.redisClient);
        this.redisKeys = promisify(this.redisClient.keys).bind(this.redisClient);

        this.accessTokenPref = 'accessToken';
        this.sessionTTL = Number(SESSION_TIME_IN_M) * 60 ;
    }

    getAccessTokenKey(username) {
        return `${this.accessTokenPref}-${username}`;
    }

    async setAccessToken(data) {
        await this.redisSet(this.getAccessTokenKey(data.username), JSON.stringify(data.accessToken), 'EX', this.sessionTTL);
    }

    getAccessToken(username) {
        return this.redisGet(this.getInviteSessionKey(username));
    }

    dropAccessToken(username) {
        return this.redisDel(this.getInviteSessionKey(username));
    }
}

module.exports = new redisService();
