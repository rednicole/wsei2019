document.addEventListener('DOMContentLoaded', function () {
    const btnSubmit = document.querySelector('#newNoteBtn');
    btnSubmit.addEventListener('click', addNewNote);
    function addNewNote(event) {
        //pobierz tytul i tresc z formularza
        const title = document.querySelector('#title');
        const content = document.querySelector('#content');
        //stworz diva z notatka
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        //wepchnij do diva tytul i tresc
        newNote.innerHTML =
            `<h2>${title.value}</h2>
                <section>${content.value}</section>`;
        //dolacz notatke do worka z notatkami (main)
        const notesConteiner = document.querySelector('main');
        notesConteiner.appendChild(newNote);
        title.value = '';
        content.value = '';
        event.preventDefault();
    }
})