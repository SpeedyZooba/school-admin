const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const staffHour = models.staff_working_hours;

async function createWorkingHour(hourData)
{
    try
    {
        const hour = staffHour.create(hourData);
        return hour;
    }
    catch (error)
    {
        console.error("Something went wrong while creating staff hour.", error);
        throw new Error("Something went wrong while creating staff hour.");
    }
}

module.exports = {
    createWorkingHour
};