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

async function fetchParentIdByPhone(phoneNo)
{
    try
    {
        const parentId = await Parent.findOne({ where: { PhoneNo: phoneNo.ParentPhoneNumber } });
        return parentId.ParentId;
    }
    catch (error)
    {
        console.error("Something went wrong while fetching the ID.", error);
        throw new Error("Something went wrong while fetching the ID.");
    }
}

module.exports={
    createParent,
    fetchParentIdByPhone
};