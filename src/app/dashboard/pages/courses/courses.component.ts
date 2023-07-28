import { Component, OnDestroy, OnInit } from '@angular/core';
import { Courses } from './models';
import { CourseService } from './course.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  // public dataSource: Courses[] = [];
  public displayedColumns = ['id', 'name', 'description', 'price', 'dedication', 'actions'];
  public data$: Observable<Courses[]>



  constructor(private courseService: CourseService) {
    // OBTENGO LOS DATOS EN LA TABLE
    this.data$ = this.courseService.getCourses();
  }


  ngOnDestroy(): void {
    // onDestroy
  }

  ngOnInit(): void {
    // CARGAR DATOS/CURSOS
    this.courseService.loadCourses();

    // OBTENER CURSOS
    // this.courseService.getCourses().subscribe({
    //   next: (data) => console.log('data: ', data),
    // });
  }

  // CREAR CURSOS
  onCreate(): void {
    this.courseService.create();
  }


  // ELIMINAR CURSOS
  onDelete(id: number): void {
    this.courseService.deleteById(id);
  }

}
