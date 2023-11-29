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

async function getClassroomCapacityById(classroomId)
{
    try
    {
        const classroom = await Classroom.findOne({ where: { RoomId: classroomId } });
        return classroom.Capacity;
    }
    catch (error)
    {
        console.error("Something went wrong with classroom fetch.", error);
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

async function findFreeClassroom(freeDay, freeHour)
{
    try 
    {
        const query = `
        SELECT
            CLASSROOM_HOURS.ClassroomId 
        FROM 
            CLASSROOM_HOURS 
        WHERE 
            EXISTS (SELECT 1 FROM CLASSROOM_HOURS WHERE classroom_hours.CourseId IS NULL AND classroom_hours.CourseId IS NULL)
            AND classroom_hours.ClassDay = :freeDay AND ClassHour = :freeHour
        LIMIT 1;
        `;
    
        const [results] = await sequelize.query(query, {
            replacements: { freeDay, freeHour },
            type: sequelize.QueryTypes.SELECT,
        });
        console.log(results);
        return results.ClassroomId;
    } 
    catch (error) 
    {
        console.error('Error:', error);
        throw new Error('Error fetching class hours for teacher.');
    }
}

module.exports = { 
    createClassroom,
    findAllClassroom,
    deleteClassroom,
    updateClassroom,
    findFreeClassroom,
    getClassroomCapacityById
}
