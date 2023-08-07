import { Component } from '@angular/core';
import { Courses } from './models';
import { CourseService } from './course.service';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CoursesFormComponent } from './courses-form/courses-form.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  public course: Observable<Courses[]>


  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private notifier: NotifierService
  ) {
    // OBTENGO LOS DATOS EN LA TABLE
    this.courseService.loadCourses();
    this.course = this.courseService.getCourses();
  }


  // ABRIR MODAL // CREAR CURSO
  onCreateCourse(): void {
    this.matDialog
      .open(CoursesFormComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.notifier.showSuccess('Se creo correctamente');
            // console.log(v)
            this.courseService.createCourses({
              name: v.name,
              description: v.description,
              price: v.price,
              dedication: v.dedication,
            });
          }
        }
      })
  }

  // EDITAR CURSO
  onEditCourse(cuorseToEdit: Courses): void {
    this.matDialog
      .open(CoursesFormComponent, {
        data: cuorseToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (cuorseUpdated) => {
          if (cuorseUpdated) {
            this.courseService.updateCourseById(cuorseToEdit.id, cuorseUpdated);
          }
          this.notifier.showSuccess('Curso Actualizado');
        }
      })
  };

  // ELIMINAR CURSO
  onDeleteCourse(courseToDelete: Courses): void {
    if (confirm(`¿Seguro desea eliminar el curso de ${courseToDelete.name}?`)) {
      this.courseService.deleteCourseById(courseToDelete.id);
    }
    this.notifier.showError('Eliminado correctamente');
  }

}
