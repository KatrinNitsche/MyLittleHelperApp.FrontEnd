import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';
import { Note } from '../models/note';
import { HelperService } from '../services/helper-service.service';
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
  categoryList: Category[];

  showInputForm: boolean = false;
  showCategoryFilter: boolean = false;
  inputNoteTitle: string = "";
  inputNoteText: string = "";
  inputNoteParent: number;
  inputNoteCategory: number;

  searchTerm: string = "";

  constructor(private noteService: NoteService, private helperService: HelperService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.LoadCategories();
  }

  LoadCategories() {
    this.categoryList = [];
    this.helperService.LoadCategories().subscribe({
      next: categories => {
        this.categoryList = categories;
        this.LoadNotes();
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  LoadNotes() {
    this.allNotes = [];
    var allCategories = this.categoryList;

    this.noteService.getNotes().subscribe({
      next: notes => {
        this.parentNotes = notes.filter(n => n.parentId === null || n.parentId === n.id).sort((a, b) => (a.title > b.title) ? 1 : -1);
        var noteList = [];
        this.parentNotes.forEach(function (parentNote) {
          noteList.push(parentNote);
          var childNotesForParent = notes.filter(n => n.parentId === parentNote.id).sort((a, b) => (a.title > b.title) ? 1 : -1);

          childNotesForParent.forEach(function (childNote) {
            noteList.push(childNote);
          });
        });

        this.allNotes = noteList;

        this.allNotes.forEach(function (note) {
          var category = allCategories.filter(x => x.id == note.categoryId);
          if (category.length > 0) {
            note.categoryColour = category[0].colour;
          }
        });

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

  FilterByCategory() {
    var notes = [];
    var allNotes = this.allNotes;
    var anyFilter = false;

    this.categoryList.forEach(function (category) {
      if (category.isFilteredBy) {
        anyFilter = true;
        var toDosInCategory = allNotes.filter(x => x.categoryId == category.id);
        if (category.isFilteredBy) {
          toDosInCategory.forEach(function (toDo) {
            toDo.categoryColour = category.colour;
            notes.push(toDo);
          });
        }
      }
    });

    if (!anyFilter) {
      this.LoadNotes();
    }

    this.filteredNotes = notes;
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

  toggleshowCategoryFilter() {
    this.showCategoryFilter = !this.showCategoryFilter;
  }

  addNote() {

    console.log(this.inputNoteParent);
    var parentId = this.inputNoteParent == -1 ? null : this.inputNoteParent;

    var newNote = {
      id: 0,
      title: this.inputNoteTitle,
      description: this.inputNoteText,
      parentId: parentId,
      categoryId: this.inputNoteCategory,
      created: new Date(),
      updated: new Date(),
      isEditShow: false,
      expanded: false,
      categoryColour: ""
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
