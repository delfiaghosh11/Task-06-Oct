import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentsData;
  searchIsOn: boolean;
  isFound: boolean;
  searchName: string;

  constructor(private service: DataService) {
    this.searchIsOn = false;
    this.isFound = true;
    this.searchName = '';
  }

  ngOnInit(): void {
    this.studentsData = this.service.getStudents();
    if (!this.studentsData) {
      this.service.getJSON();
    }
    this.service.getEventData().subscribe((data) => {
      this.studentsData = data;
    });
  }

  search() {
    this.searchIsOn = true;

    this.studentsData = this.service.getStudents();

    let found = this.studentsData.find((item) => item.name === this.searchName);

    if (this.searchName === '') {
      this.service.setStudents(this.studentsData);
      this.isFound = true;
      this.searchIsOn = false;
    } else if (this.searchName !== '' && found === undefined) {
      this.isFound = false;
    } else {
      this.studentsData = this.studentsData.filter(
        (item) => item.name === this.searchName
      );
      this.isFound = true;
    }
    this.searchName = '';
    // console.log(this.service.getStudents());
  }

  back() {
    this.studentsData = this.service.getStudents();
    this.service.setStudents(this.studentsData);
    this.isFound = true;
    this.searchIsOn = false;
  }

  deleteSelected() {
    this.service.deleteSelected();
  }
}
