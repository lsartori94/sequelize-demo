const {db, Campus} = require('./models');

const seed = async () => {
    const options = {
        force: true
    };
    await db.sync(options); //Sync to database

    const hardvard = await Campus.create({
        name: 'Hardvard',
        address: 'PO Box 382609, Cambridge, MA 02238-2609.',
        description: 'World famous Ivy League university'
    });
    const stonybrook = await Campus.create({
        name: 'Stony Brook University',
        address: '100 Nicolls Rd, Stony Brook, NY 11794',
        description: 'It is one of four university centers of the State University of New York system.'
    })

    db.close(); //Close db connection else it'll stay alive and hang the process
    console.log('Seed Successful');
};

seed();
