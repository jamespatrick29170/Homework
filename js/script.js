const noteInput = document.getElementById('noteInput')
const addNote = document.getElementById('addNote')
const notesList = document.getElementById('notesList')

addNote.addEventListener('click', function() {
    const noteText = noteInput.value;
    console.log('Adding note:', noteText)
    
    // create li element for new notes and store text
    const newNote = document.createElement('li');
    newNote.textContent = noteText;

    // create remove button for note
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    
    removeButton.addEventListener('click', function() {
        console.log('Removing note:', newNote.textContent)
        notesList.removeChild(newNote);
    })

    //put button inside the note
    newNote.appendChild(removeButton);

    // add note into the li element itself
    notesList.appendChild(newNote);
    
    noteInput.value = '';
    noteInput.classList.remove('has-text')
})

noteInput.addEventListener('input', function() {
    if (noteInput.value === '') {
        noteInput.classList.remove('has-text');
    } else {
        noteInput.classList.add('has-text')
    }
})