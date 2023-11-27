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

async function findAllClassroom()
{
    try 
    {
        const classroom = await Classroom.findAll();
        return classroom;
    }
    catch (error)
    {
        console.error("Something went wrong with get classroom.", error);
        throw new Error("Something went wrong.");
    }
}

async function deleteClassroom(data)
{
    try 
    {
        const classroom = await Classroom.findAll({
            where: {
                RoomId: data.RoomId
            }
        });
        Classroom.destroy({
            where: {
                RoomId: data.RoomId
            }
        });
        return classroom
    }
    catch (error)
    {
        console.error("Something went wrong with delete classroom.", error);
        throw new Error("Something went wrong.");
    }
}

async function updateClassroom(data)
{
    try 
    {
        await Classroom.update(data, {
            where: {
                RoomId: data.RoomId
            }
        });

        const classroom = await Classroom.findAll({
            where: {
                RoomId: data.RoomId
            }
        });

        return classroom
    }
    catch (error)
    {
        console.error("Something went wrong with update classroom.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports = { 
    createClassroom,
    findAllClassroom,
    deleteClassroom,
    updateClassroom
}
