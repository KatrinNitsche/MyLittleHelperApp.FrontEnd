import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from '../models/note';
import { NoteService } from '../services/note-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[];
  errorMessage: string = "";
  inputNoteTitle: string = "";
  inputNoteText: string = "";
  isEditShow = false;
  expanded: boolean = false;

  constructor(private noteService: NoteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.notes = [];

    this.noteService.getNotes().subscribe({
      next: notes => {
        this.notes = notes;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  toggleEditDisplay(note:Note) {
    this.isEditShow = !this.isEditShow;

    if (!this.isEditShow) {
      this.noteService.updateNote(note).subscribe();
    }
  }

  addNote() {

    var newNote = {
      id: 0,
      title: this.inputNoteTitle,
      description: this.inputNoteText
    }

    this.noteService.addNote(newNote).subscribe({
        next: note => {
            this.notes.push({
              id: 0,
              title: this.inputNoteTitle,
              description: this.inputNoteText
            });
    
            this.inputNoteTitle = "";
            this.inputNoteText = "";

            this.toastr.info(note.title + " was added.");
        },
        error: err => {
          this.toastr.error(err);
        }
      });
  }

  removeNote(id: number) {
    this.noteService.removeNote(id).subscribe({
      next: note => {
        this.notes = this.notes.filter((v,i) => v.id !== note.id);
        this.toastr.info(note.title + " was removed.");
      },
      error: err => {
        this.toastr.error(err);
      }
    });    
  }

  expandNote() {
    this.expanded = !this.expanded;
  }
}
