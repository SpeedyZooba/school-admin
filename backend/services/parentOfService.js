const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const ParentOf = models.parent_of;

async function createParentLink(linkData)
{
    try 
    {
        const parentOf = await ParentOf.create(linkData);
        return parentOf;
    }
    catch (error)
    {
        console.error("Something went wrong while creating a parent.", error);
        throw new Error("Something went wrong while creating a parent.");
    }
}

async function deleteParentLinkForStudent(studentId)
{
    try
    {
        const parentOf = await ParentOf.destroy({ where: { StudentId: studentId.StudentId } });
        return parentOf;
    }
    catch (error)
    {
        console.error("Something went wrong while establishing the link.", error)
        throw new Error("Something went wrong while establishing the link.");
    }
}

async function updateParentLink(linkData)
{
    try
    {
        const newParent = linkData.ParentId;
        const studentId = linkData.StudentId;
        const updatedLink = await ParentOf.update({ ParentId: newParent }, { where: { StudentId: studentId } });
        return updatedLink;
    }
    catch (error)
    {
        console.error("Something went wrong while updating the link.", error)
        throw new Error("Something went wrong while updating the link.");
    }
}

module.exports={
    createParentLink,
    deleteParentLinkForStudent,
    updateParentLink
};