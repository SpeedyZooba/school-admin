const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const ClassroomHour = models.classroom_hours;

async function updateClassroomHour(classId, day, hour, courseId, sectionId)
{
    try
    {
        const updatedClass = await ClassroomHour.update({
            CourseId: courseId,
            SectionId: sectionId
        },  { where:
                {
                    ClassroomId: classId,
                    ClassDay: day,
                    ClassHour: hour
                }
        });
        return updatedClass;
    }
    catch (error)
    {
        console.error("Something went wrong with classroom hour update.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports =
{
    updateClassroomHour
}