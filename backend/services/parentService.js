const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Parent = models.parent;

async function createParent(parentData)
{
    try 
    {
        const parent = await Parent.create(parentData);
        return parent;
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