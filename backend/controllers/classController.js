const classroomService = require('../services/classroomService.js');
const classHourService = require('../services/classHoursService.js')
const classroomHourService = require('../services/classroomHourService.js');
const classService = require('../services/classService.js');
const staffHourService = require('../services/staffHourService.js');
const enrollService = require('../services/enrollService.js');
const teachesClassService = require('../services/teachesClassService.js');
const studentClassService = require('../services/studentClassService.js');

async function createSchedule(req, res)
{
    try 
    {   
        const enrollInfo =  Object.values([await enrollService.getEnrolledCourses()]);
        console.log(enrollInfo[0]['CourseId']);
        for (let i = 0; i < enrollInfo.length; i++)
        {
            const courseId = enrollInfo[i]['CourseId'];
            console.log(courseId + '***********')
            const teacherId = await teachesClassService.getTeacherIdByCourseId(courseId);
            console.log(teacherId + '***');
            if (teacherId === null)
            {
                break;
            }
            const teacherHours = Object.values([await staffHourService.getFreeHoursByTeacherId(teacherId)]);
            for (let j = 0; j < teacherHours.length; j++)
            {
                const availableStudents = Object.values(await enrollService.getAvailableEnrollments(courseId, teacherHours[j]['FreeDay'], teacherHours[j]['FreeHour']));
                const availableClassroom = Object.values([await classroomService.findFreeClassroom(teacherHours[j]['FreeDay'], teacherHours[j]['FreeHour'])]);
                await classService.createClass({ SectionId: j + 1, CourseId: courseId, RoomId: availableClassroom, TeacherId: teacherId });
                await classHourService.createClassHours({ ReservedDay: teacherHours[j]['FreeDay'], ReservedHour: teacherHours[j]['FreeHour'], SectionId: j + 1, CourseId: courseId });
                for (let k = 0; k < Math.min(capacity, availableStudents.length); k++)
                {
                    await studentClassService.createStudentClassLink({ StudentId: availableStudents[k]['StudentId'], SectionId: j + 1, CourseId: courseId });
                    await enrollService.completeEnroll(availableStudents[k]['StudentId'], courseId);
                }
                await classroomHourService.updateClassroomHour(availableClassroom, teacherHours[j]['FreeDay'], teacherHours[j]['FreeHour'], courseId, j + 1);
            }
        }
        res.status(201).json(enrollInfo);
    }
    catch (error)
    {
        console.error("An error occurred while creating class schedule.", error);
        res.status(500).json({ error: error.message });
    }
}

async function getClassSchedule(req, res)
{
    try
    {
        const classroomId = req.body.RoomId;
        const classList = await classService.getClassroomTimes(classroomId);
        res.status(200).json(classList);
    }
    catch (error)
    {
        console.error("An error occurred while fetching classroom schedule.", error);
        res.status(500).json({ error: error.message });
    }
}

async function getStudentSchedule(req, res)
{
    try
    {
        const studentId = req.query.StudentId;
        const studentList = await classService.getStudentTimes(studentId);
        res.status(200).json(studentList);
    }
    catch (error)
    {
        console.error("An error occurred while fetching student schedule.", error);
        res.status(500).json({ error: error.message });
    }
}

async function getTeacherSchedule(req, res)
{
    try
    {
        const teacherId = req.query.TeacherId;
        const teacherList = await classService.getStudentTimes(teacherId);
        res.status(200).json(teacherList);
    }
    catch (error)
    {
        console.error("An error occurred while fetching student schedule.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createSchedule,
    getClassSchedule,
    getStudentSchedule,
    getTeacherSchedule
}