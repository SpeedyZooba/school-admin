const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const TeachesClass = models.teaches_class;

async function createTeacherClassLink(linkData)
{
    try
    {
        const teacherClassLink = TeachesClass.create(linkData);
        return teacherClassLink;
    }
    catch (error)
    {
        console.error("Something went wrong while establishing the link.", error);
        throw new Error("Something went wrong while establishing the link.");
    }
}

module.exports = {
    createTeacherClassLink
};