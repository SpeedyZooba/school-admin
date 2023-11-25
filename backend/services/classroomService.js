const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Classroom = models.classroom;


async function createClassroom(data)
{
    try 
    {
        const classroom = await Classroom.create(data);
        return classroom;
    }
    catch (error)
    {
        console.error("Something went wrong with classroom creation.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports = { createClassroom }
