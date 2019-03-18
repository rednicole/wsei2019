// TODO:
// cztery kolory notatki do wyboru (zmiana koloru zmienia tło notatki)
// możliwość przypięcia notatki (przypięte notatki wyświetlane są na początku listy)
// możliwość archiwizacji notatki
const yellowNote = document.querySelector('#yellowColor');
const redNote = document.querySelector('#redColor');
const greenNote = document.querySelector('#greenColor');
const blueNote = document.querySelector('#blueColor');

const colorRadios = document.querySelectorAll("input[name='color']");

let notes = [];

let titleHtmlNode;
let contentHtmlNode;
let selectedColor = 'yellow';

class Note {
    constructor(title, content, color) {
        this.title = title;
        this.content = content;
        this.date = Date.now();
        this.color = color;
        // this.pinned = false;
        // this.archived = false;
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

    
    colorRadios.forEach(function(e) {
        e.addEventListener('click', setColorValue);
    })
}

function getNotesFromLocalStorage() {
    notes = JSON.parse(localStorage.getItem('notes'));
    
    if (notes && notes.length) {
        notes.sort((a,b) => a.date-b.date);
        notes.forEach(note => createDivNote(note));
    } else {
        notes = [];
    }
}

function addNewNote(event) {
    // event.preventDefault(); dodanie w html do button 'type="button"' usuwa jego domyślne niechciane zdarzenie
    
    // nowy obiekt notatki
    const note = new Note(titleHtmlNode.value, contentHtmlNode.value, selectedColor);
    // const note = {
    //     title: title.value,
    //     content: content.value
    // };

    
    // const pinnedContainer = document.querySelector('#pinned')

    // if (this.pinned == true) {
    //     pinnedContainer.push(newNote);
    // }


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
    notes.unshift(note);
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// function pinNote(note) {
//     this.pinned = true;
// }

function createDivNote(note) {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.id = `id${note.date}`;
    newNote.style.backgroundColor = note.color;

    const removeBtn = document.createElement('i');
    removeBtn.className = 'fas fa-times deleteBtn';
    removeBtn.addEventListener('click', removeNote);
    newNote.appendChild(removeBtn);

    // const flag = document.createElement('i');
    // flag.className = 'far fa-flag';
    // flag.addEventListener('click', pinNote);
    // newNote.appendChild(flag);

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
    
    const notesContainer = document.querySelector('main');
    const firstNote = notesContainer.firstChild;    
    notesContainer.insertBefore(newNote, firstNote);

    
}

function setColorValue(e) {
    selectedColor = e.srcElement.value;
}

function removeNote() {
    const noteDiv = this.parentElement;
    const id = parseInt(noteDiv.id.slice(2));
    // console.log(id)
    const idx = notes.findIndex((el) => {
        return el.date == id;
    })
    notes.splice(idx, 1);
    removeDivNote(this.parentElement);
    updateLocalStorage();
}

function removeDivNote(noteDiv) {
    const notesContainer = noteDiv.parentElement;
    notesContainer.removeChild(noteDiv);
}