const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const ClassHours = models.class_hours;


async function createClassHours(data)
{
    try 
    {
        const classHours = await ClassHours.create(data);
        return classHours;
    }
    catch (error)
    {
        console.error("Something went wrong with classHours creation.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports = { createClassHours }
