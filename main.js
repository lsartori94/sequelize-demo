const models = require('./models');

const init = async () => {
    const options = {
        force: false //Drop the table if it already exists
    };
    await models.Campus.sync(options);
    console.log('Tables have synced!');
};

init();
models.findCampus();
