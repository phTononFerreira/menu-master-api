import { Sequelize } from 'sequelize';
import sequelizeConfig from '../config/sequelize.config.js';
import APIMessages from './messages.util.js';

sequelizeConfig.dialectOptions = {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
};

const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    dialectOptions: sequelizeConfig.dialectOptions 
});

sequelize.authenticate()
    .then(() => {
        console.log(APIMessages.SUCCESS_CONNECT);
    })
    .catch(error => {
        console.error(APIMessages.ERROR_CONNECT(error));
    });

export default sequelize;
