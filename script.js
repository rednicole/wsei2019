let notes = [];

let titleHtmlNode;
let contentHtmlNode;

class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.date = Date.now();
    }
}

document.addEventListener('DOMContentLoaded', appStart);
function appStart() {
    const btnSubmit = document.querySelector('#newNoteBtn');
    // pobierz tytuł i treść z formularza
    titleHtmlNode = document.querySelector('#title');
    contentHtmlNode = document.querySelector('#content');
    btnSubmit.addEventListener('click', addNewNote);
    getNotesFromLocalStorage();
}

function getNotesFromLocalStorage() {
    notes = JSON.parse(localStorage.getItem('notes'));
    // notes.forEach(element => {
    //     const newNote = document.createElement('div');
    //     newNote.classList.add('note');
    //     newNote.innerHTML =
    //         `<h2>${element.title}</h2>
    //          <section>${element.content}</section>`;
    //     const notesConteiner = document.querySelector('main');
    //     notesConteiner.appendChild(newNote);
    // });
    if (notes && notes.length) {
    notes.forEach(note => createDivNote(note));
    } else {
        notes = [];
    }
}

function addNewNote(event) {
    // event.preventDefault(); dodanie w html do button 'type="button"' usuwa jego domyślne niechciane zdarzenie
    
    // nowy obiekt notatki
    const note = new Note(titleHtmlNode.value, contentHtmlNode.value);
    // const note = {
    //     title: title.value,
    //     content: content.value
    // };

    // dodajemy notatkę do tablicy i zapisujemy w localStorage
    addToStorage(note);
    // stwórz diva z notatką
    createDivNote(note);

    cleanForm();
}

function cleanForm() {
    titleHtmlNode.value = '';
    contentHtmlNode.value = '';
}

function addToStorage(note) {
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function createDivNote(note) {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.id = `id${note.date}`;

    const removeBtn = document.createElement('i');
    removeBtn.className = 'fas fa-times';
    removeBtn.addEventListener('click', removeDivNote);
    newNote.appendChild(removeBtn);

    const header = document.createElement('h2');
    header.innerHTML = note.title;
    const section = document.createElement('section');
    section.innerHTML = note.content;
    newNote.appendChild(header);
    newNote.appendChild(section);

    const formattedDate = new Date(note.date);
    const date = document.createElement('div');
    date.innerHTML = formattedDate.toLocaleString();
    newNote.appendChild(date);

    const notesConteiner = document.querySelector('main');
    notesConteiner.appendChild(newNote);
}

function removeDivNote() {
    const noteDiv = this.parentElement;
    const notesContainer = noteDiv.parentElement;
    notesContainer.removeChild(noteDiv);
}

function removeNote() {
    localStorage.removeItem()
    removeDivNote();
}