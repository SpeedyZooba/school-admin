const { Parent } = require("../models/parent.js");

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
}