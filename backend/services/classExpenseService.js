const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const ClassExpense = models.class_expense;


async function createClassExpense(data)
{
    try 
    {
        const classExpense = await ClassExpense.create(data);
        return classExpense;
    }
    catch (error)
    {
        console.error("Something went wrong with classExpense creation.", error);
        throw new Error("Something went wrong.");
    }
}

async function findAllClassExpense()
{
    try 
    {
        const classExpense = await ClassExpense.findAll();
        return classExpense;
    }
    catch (error)
    {
        console.error("Something went wrong with get classExpense.", error);
        throw new Error("Something went wrong.");
    }
}

async function deleteClassExpense(data)
{
    try 
    {
        const classExpense = await ClassExpense.findAll({
            where: {
                SectionId: data.SectionId, 
                CourseId: data.CourseId, 
                ProductId : data.ProductId
            }
        });
        ClassExpense.destroy({
            where: {
                SectionId: data.SectionId, 
                CourseId: data.CourseId, 
                ProductId : data.ProductId
            }
        });
        return classExpense
    }
    catch (error)
    {
        console.error("Something went wrong with delete classExpense.", error);
        throw new Error("Something went wrong.");
    }
}

async function updateClassExpense(oldData, newData)
{
    try 
    {
        await ClassExpense.update(newData, { // burda gelen veri üzerinden güncellenecek satırı aramak istiyorum ama
            where: {
                SectionId: oldData.SectionId, 
                CourseId: oldData.CourseId, 
                ProductId : oldData.ProductId
            }
        });

        const classExpense = await ClassExpense.findAll({
            where: {
                SectionId: newData.SectionId, 
                CourseId: newData.CourseId, 
                ProductId : newData.ProductId
            }
        });

        return classExpense
    }
    catch (error)
    {
        console.error("Something went wrong with update classExpense.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports = { 
    createClassExpense,
    findAllClassExpense,
    deleteClassExpense,
    updateClassExpense
 }
