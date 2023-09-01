import { Courses } from "../../courses/models";
import { Student } from "../../student/models";

export interface Inscription {
    id: number;
    studentId: number;
    coursesId: number;
}

export interface InscriptionWithStudentAndCourses extends Inscription {
    courses: Courses;
    student: Student;
}

export interface createInscriptionPayload {
    studentId: number | null;
    coursesId: number | null;
}
