import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/core/models';

@Pipe({
  name: 'fullNamePipe'
})
export class FullNamePipePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): unknown {
    return `${user.name} ${user.surname}`;
  }

}
