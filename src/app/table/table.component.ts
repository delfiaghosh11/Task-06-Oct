import { DataService } from './../services/data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() students: any[];
  @Input() isDeleted;
  @Input() searchIsOn;

  femaleImgUrl: string;
  maleImgUrl: string;
  gender: string;
  editMode = new Array();
  isCompleted: boolean;

  constructor(private service: DataService) {
    this.femaleImgUrl =
      'https://www.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-512.png';
    this.maleImgUrl =
      'https://ziakapoor.com/wp-content/uploads/2020/03/zia-kapoor-escorts-happy-customers-1.png';
  }

  ngOnInit(): void {}

  delete(e, item) {
    this.service.deleteStudent(e, item);
    // console.log(this.service.getStudents());
  }

  undoDelete(i, student) {
    this.service.undoDelete(i, student);
    // console.log(this.service.getStudents());
  }

  editRow(student, index) {
    this.editMode[index] = true;
    this.gender = student.gender;
    this.isCompleted = student.isCompleted;
  }

  saveRow(student, index) {
    if (
      student.name === '' ||
      student.city === '' ||
      student.college === '' ||
      student.qualification === '' ||
      this.gender === ''
    ) {
      this.editMode[index] = true;
    } else {
      this.editMode[index] = false;
      this.service.updateStudent(
        student.roll,
        student.name,
        student.city,
        student.college,
        student.qualification,
        this.gender,
        this.isCompleted
      );
      // console.log(this.service.getStudents());
    }
  }

  setGender(e) {
    if (e.target.value === 'female') {
      this.gender = 'female';
    } else {
      this.gender = 'male';
    }
  }
}
