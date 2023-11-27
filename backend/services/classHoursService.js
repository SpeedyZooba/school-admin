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

async function findAllClassHours()
{
    try 
    {
        const classHour = await ClassHours.findAll();
        return classHour;
    }
    catch (error)
    {
        console.error("Something went wrong with get classHour.", error);
        throw new Error("Something went wrong.");
    }
}

async function deleteClassHours(data)
{
    try 
    {
        const classHour = await ClassHours.findAll({
            where: {
                ReservedDay: data.ReservedDay, 
                ReservedHour: data.ReservedHour, 
                SectionId: data.SectionId, 
                CourseId: data.CourseId
            }
        });
        ClassHours.destroy({
            where: {
                ReservedDay: data.ReservedDay, 
                ReservedHour: data.ReservedHour, 
                SectionId: data.SectionId, 
                CourseId: data.CourseId
            }
        });
        return classHour
    }
    catch (error)
    {
        console.error("Something went wrong with delete classhours.", error);
        throw new Error("Something went wrong.");
    }
}

async function updateClassHours(oldData, newData)
{
    try 
    {
        await ClassHours.update(newData, { // burda gelen veri üzerinden güncellenecek satırı aramak istiyorum ama
            where: {
                ReservedDay: oldData.ReservedDay, 
                ReservedHour: oldData.ReservedHour, 
                SectionId: oldData.SectionId, 
                CourseId: oldData.CourseId
            }
        });

        const classHour = await ClassHours.findAll({
            where: {
                ReservedDay: newData.ReservedDay, 
                ReservedHour: newData.ReservedHour, 
                SectionId: newData.SectionId, 
                CourseId: newData.CourseId
            }
        });

        return classHour
    }
    catch (error)
    {
        console.error("Something went wrong with update classHour.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports = { 
    createClassHours,
    findAllClassHours,
    deleteClassHours,
    updateClassHours
}
