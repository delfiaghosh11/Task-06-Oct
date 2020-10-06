import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private students: any[];
  private deletedStudents = new Array();
  private event = new EventEmitter();
  private deleteEvent = new EventEmitter();
  private selectedStudents = new Array();

  constructor(private http: HttpClient) {}

  getJSON(): any {
    return this.http
      .get('https://jsonblob.com/api/f0b33ee5-03a8-11eb-909d-27a9d4f5c8fa')
      .subscribe((data) => {
        this.setStudents(data);
      });
  }

  getStudents() {
    return this.students;
  }

  setStudents(sArray) {
    this.students = sArray;
    this.event.emit(this.students);
  }

  getDeletedStudents() {
    return this.deletedStudents;
  }

  setDeletedStudents(dArray) {
    this.deletedStudents = dArray;
    this.deleteEvent.emit(this.deletedStudents);
  }

  getEventData() {
    return this.event;
  }

  getDeletedEventData() {
    return this.deleteEvent;
  }

  addStudent(newStudent: Object) {
    this.students.push(newStudent);
    this.setStudents(this.students);
  }

  updateStudent = (
    roll,
    name,
    city,
    college,
    qualification,
    gender,
    isCompleted
  ) => {
    this.getStudents().map((item) =>
      item.roll === roll
        ? ((item.name = name),
          (item.city = city),
          (item.college = college),
          (item.qualification = qualification),
          (item.gender = gender),
          (item.isCompleted = isCompleted))
        : item
    );
  };

  deleteStudent(index, student) {
    this.deletedStudents.push(student);
    this.deletedStudents = this.deletedStudents.sort((a, b) => a.roll - b.roll);
    this.setDeletedStudents(this.deletedStudents);

    this.students.splice(index, 1);
    this.setStudents(this.students);
  }

  undoDelete(index, item) {
    this.students.push(item);
    this.students = this.students.sort((a, b) => a.roll - b.roll);
    this.setStudents(this.students);

    this.deletedStudents.splice(index, 1);
    this.setDeletedStudents(this.deletedStudents);
  }

  deleteSelected() {
    this.selectedStudents = this.getStudents().filter(
      (item) => item.isCompleted === true
    );

    if (this.selectedStudents.length > 0) {
      this.students = this.students.filter(
        (item) => item.isCompleted === false
      );
      this.setStudents(this.students);

      this.selectedStudents.map((item) => {
        this.deletedStudents.push(item);
      });
      this.deletedStudents = this.deletedStudents.sort(
        (a, b) => a.roll - b.roll
      );
      this.setDeletedStudents(this.deletedStudents);
    } else {
      alert('Please select at least one item to delete.');
    }
  }

  undoSelectedDeletes() {
    this.selectedStudents = this.getDeletedStudents().filter(
      (item) => item.isCompleted === true
    );

    if (this.selectedStudents.length > 0) {
      this.deletedStudents = this.deletedStudents.filter(
        (item) => item.isCompleted === false
      );
      this.setDeletedStudents(this.deletedStudents);

      this.selectedStudents.map((item) => {
        this.students.push(item);
      });
      this.students = this.students.sort((a, b) => a.roll - b.roll);
      this.setStudents(this.students);
    } else {
      alert('Please select at least one item to undo delete.');
    }
  }
}
