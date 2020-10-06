import { TableComponent } from './table/table.component';
import { DeletedComponent } from './deleted/deleted.component';
import { StudentsComponent } from './students/students.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'deleted', component: DeletedComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
