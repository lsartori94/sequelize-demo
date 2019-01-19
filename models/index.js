const Sequelize = require('sequelize');
const env = {
    DB_TYPE: 'postgres',
    DB_URL: 'localhost:5432',
    DB_NAME: 'postgres',
    DB_USER: 'test',
    DB_PASS: 'test'
}
const path = `${env.DB_TYPE}://${env.DB_USER}:${env.DB_PASS}@${env.DB_URL}/${env.DB_NAME}`;
const options = {
    logging: false //Disable SQL logs
};
const db = new Sequelize(path, options);

const Campus = db.define('campuses', {
    name: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT
    }
});

const findCampus = async () => {
    try {
        const allCampus = await Campus.findAll();
        console.log(allCampus)
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    db,
    Campus,
    findCampus
}
