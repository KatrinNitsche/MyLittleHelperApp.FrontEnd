import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor() { }

  notes: Note[];
  inputNoteTitle: string = "";
  inputNoteText: string = "";

  ngOnInit(): void {
    this.notes = [{
      title: "First Note",
      description: "This is my first note. You can add more notes by using the form above."
    },
    {
      title: "Second Note",
      description: "This is my second note which has a shorter text."
    }
    ];
  }

  addNote() {
    this.notes.push({
      title: this.inputNoteTitle,
      description: this.inputNoteText
    });

    this.inputNoteTitle = "";
    this.inputNoteText = "";
  }

  removeNote(id) {
    this.notes = this.notes.filter((v,i) => i !== id);
  }
}
