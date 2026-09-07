//notelist variables
const noteInput = document.getElementById('noteInput');
const addNote = document.getElementById('addNote');
const notesList = document.getElementById('notesList');
//theme button varis
const themeToggle = document.getElementById('themeToggle');
//form varis
const feedbackForm = document.getElementById('feedbackForm');
const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const ratingInput = document.getElementById('ratingInput');
const ratingError = document.getElementById('ratingError');
const commentsInput = document.getElementById('commentsInput');
const commentsError = document.getElementById('commentsError');
//fetch varis
const dishResult = document.getElementById('dishResult');

addNote.addEventListener('click', function() {
    const noteText = noteInput.value;
    console.log('Adding note:', noteText);
    
    // create li element for new notes and store text
    const newNote = document.createElement('li');
    newNote.textContent = noteText;

    // create remove button for note
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('aria-label', 'Remove note:' + noteText);
    
    removeButton.addEventListener('click', function() {
        console.log('Removing note:', newNote.textContent);
        notesList.removeChild(newNote);
    })

    //put button inside the note
    newNote.appendChild(removeButton);

    // add note into the li element itself
    notesList.appendChild(newNote);
    
    noteInput.value = '';
    noteInput.classList.remove('has-text');
})

noteInput.addEventListener('input', function() {
    if (noteInput.value === '') {
        noteInput.classList.remove('has-text');
    } else {
        noteInput.classList.add('has-text');
    }
})

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('alt-theme');
})

feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;
    //name check
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    //email checks
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailInput.value.includes ('@')) {
        emailError.textContent = 'Email must contain an @';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    //rating check
    if (ratingInput.value.trim() === '') {
        ratingError.textContent = 'Rating is required';
        isValid = false;
    } else {
        ratingError.textContent = '';
    }
    //comments check
    if (commentsInput.value.trim() === '') {
        commentsError.textContent = 'Comment is required';
        isValid = false;
    } else {
        commentsError.textContent = '';
    }
    //console log if good
    if (isValid) {
        console.log('Feedback submitted:', nameInput.value, emailInput.value, ratingInput.value, commentsInput.value);
        feedbackForm.reset();
    }
})

emailInput.addEventListener('input', function() {
    emailError.textContent = '';
})
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }
        return response.json();
    })
    .then(function(data) {
        const meal = data.meals[0];
        dishResult.textContent = meal.strMeal + ' - a ' + meal.strCategory + ' dish from ' + meal.strArea;
    })
    .catch(function(error) {
        console.log('Dish fetch failed:', error);
        dishResult.textContent = 'Could not load a dish. Please try refreshing the page.';
    })