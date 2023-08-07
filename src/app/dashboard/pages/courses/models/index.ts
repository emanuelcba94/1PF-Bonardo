export interface Courses {
    id: number,
    name: string,
    description: string,
    price: number,
    dedication: string,
}

export interface CreateCoursesData {
    name: string,
    description: string,
    price: number,
    dedication: string,
}

export interface UpdateCoursesData {
    name?: string,
    description?: string,
    price?: number,
    dedication?: string,
}
