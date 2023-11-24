const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const ParentOf = models.parent_of;

async function createParent(ParentOfData)
{
    try 
    {
        const parent = await ParentOf.create(ParentOfData);
        return parentofData;
    }
    catch (error)
    {
        console.error("Something went wrong while creating a parent.", error);
        throw new Error("Something went wrong while creating a parent.");
    }
}

module.exports={
    createParent
};