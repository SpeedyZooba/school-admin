const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const StudentClass = models.student_classes

async function createStudentClassLink(linkData)
{
    try
    {
        const classLink = await StudentClass.create(linkData);
        return classLink;
    }
    catch (error)
    {
        console.error("Something went wrong while establishing the link.", error);
        throw new Error("Something went wrong while establishing the link.");
    }
}

module.exports = {
    createStudentClassLink
}