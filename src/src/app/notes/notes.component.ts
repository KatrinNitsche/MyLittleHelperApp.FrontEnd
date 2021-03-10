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

  allNotes: Note[];
  filteredNotes: Note[];
  parentNotes: Note[];
  errorMessage: string = "";
  
  showInputForm: boolean = true;
  inputNoteTitle: string = "";
  inputNoteText: string = "";
  inputNoteParent: number;
  
  searchTerm: string = "";

  constructor(private noteService: NoteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.LoadNotes();
  }

  LoadNotes() {
    this.allNotes = [];

    this.noteService.getNotes().subscribe({
      next: notes => {
        console.log(notes);

        this.parentNotes = notes.filter(n => n.parentId === null || n.parentId === n.id).sort((a, b) => (a.title > b.title) ? 1 : -1);
        var noteList = [];
        this.parentNotes.forEach(function (parentNote) {
          noteList.push(parentNote);
          var childNotesForParent = notes.filter(n => n.parentId === parentNote.id).sort((a, b) => (a.title > b.title) ? 1 : -1);

          childNotesForParent.forEach(function (childNote) {
            noteList.push(childNote);
          });
        });

        console.log(noteList);
        this.allNotes = noteList;
        this.filteredNotes = noteList;

        if (this.searchTerm == "") {
        } else {
          this.allNotes = this.allNotes.filter((v, i) => v.title.toLocaleUpperCase().includes(this.searchTerm.toLocaleUpperCase()) || v.description.toLocaleUpperCase().includes(this.searchTerm.toLocaleUpperCase()));
        }
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  toggleEditDisplay(note: Note) {
    note.isEditShow = !note.isEditShow;

    if (!note.isEditShow) {
      this.noteService.updateNote(note).subscribe();
    }
  }

  toggleshowInputForm() {
    this.showInputForm = !this.showInputForm;
  }

  addNote() {

    console.log(this.inputNoteParent);
    var parentId = this.inputNoteParent == -1 ? null : this.inputNoteParent;

    var newNote = {
      id: 0,
      title: this.inputNoteTitle,
      description: this.inputNoteText,
      parentId: parentId,
      created: new Date(),
      updated: new Date(),
      isEditShow: false,
      expanded: false
    }

    this.noteService.addNote(newNote).subscribe({
      next: note => {
        this.LoadNotes();
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
        this.allNotes = this.allNotes.filter((v, i) => v.id !== note.id);
        this.toastr.info(note.title + " was removed.");
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  expandNote(note: Note) {
    note.expanded = !note.expanded;
  }

  FilterList(parentId: number) {
    if (parentId !== -1) {
      this.filteredNotes = this.allNotes.filter(n => n.parentId == parentId).sort((a, b) => (a.title > b.title) ? 1 : -1);
    }
    else {
      this.LoadNotes();
    }
  }
}
