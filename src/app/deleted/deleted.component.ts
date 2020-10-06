import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css'],
})
export class DeletedComponent implements OnInit {
  studentsData;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.studentsData = this.service.getDeletedStudents();
    if (!this.studentsData) {
      this.service.getDeletedStudents();
    }
    this.service.getDeletedEventData().subscribe((data) => {
      this.studentsData = data;
    });
  }

  undoSelectedDeletes() {
    this.service.undoSelectedDeletes();
  }
}
