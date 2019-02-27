let notes = [];

class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    const btnSubmit = document.querySelector('#newNoteBtn');
    btnSubmit.addEventListener('click', addNewNote);
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
    notes.forEach(note => {
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.innerHTML =
            `<h2>${note.title}</h2>
             <section>${note.content}</section>`;
        const notesConteiner = document.querySelector('main');
        notesConteiner.appendChild(newNote);
    });
}

function addNewNote(event) {
    // event.preventDefault(); dodanie w html do button 'type="button"' usuwa jego domyślne niechciane zdarzenie
    // pobierz tytuł i treść z formularza
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    // nowy obiekt notatki
    const note = new Note(title.value, content.value);

    // const note = {
    //     title: title.value,
    //     content: content.value
    // };

    // dodajemy notatkę do tablicy
    notes.push(note);
    // zapisujemy w localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
    // stwórz diva z notatką
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    // wepchnij do diva tytuł i treść
    newNote.innerHTML =
        `<h2>${note.title}</h2>
        <section>${note.content}</section>`;
    // dołącz notatkę do worka z notatkami (main)
    const notesConteiner = document.querySelector('main');
    notesConteiner.appendChild(newNote);
    title.value = '';
    content.value = '';
}