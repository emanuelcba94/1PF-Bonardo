export interface Student {
    id: number,
    name: string,
    surname: string,
    identity: number,
    courses: string,
    registration: string,
}

export interface CreateStudentData {
    name: string;
    surname: string;
    identity: number,
    courses: string,
    registration: string,
}

export interface UpdateStudentData {
    name?: string;
    surname?: string;
    identity?: number;
    courses?: string,
    registration?: string;
}
