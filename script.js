document.addEventListener("DOMContentLoaded", function () {
	const noteContainer = document.getElementById("note-container");
	const newNoteButton = document.getElementById("new-note-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	// TODO: Load the note color from the local storage.
	const noteColorStorage = localStorage.getItem('noteColor');

	let noteColor = noteColorStorage; // Stores the selected note color from the form.

	// TODO: Load the note ID counter from the local storage.
	const retrievedNoteIdCounter = localStorage.getItem('noteIdCounter');
	let noteIdCounter = 0;
	if (retrievedNoteIdCounter) {
		noteIdCounter = retrievedNoteIdCounter;
	}

	// // TODO: Load the notes from the local storage.
	let retrievedNotes = JSON.parse(localStorage.getItem('savedNotes'));

	if (retrievedNotes === null) {
		retrievedNotes = [];
	}

	for (let obj of retrievedNotes) {
		document.createElement("textarea");
		const note = document.createElement("textarea");
		note.setAttribute("data-note-id", obj.id.toString());
		note.value = obj.content;
		note.className = "note";
		note.style.backgroundColor = noteColor;
		noteContainer.appendChild(note);
	}
	//This for loop will loop through the retrievedNotes and will create box elements
	//that were stored in the Local Storage. 
	console.log(retrievedNotes);
	function addNewNote() {
		const id = noteIdCounter;
		const content = `Note ${id}`;

		const note = document.createElement("textarea");
		note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
		note.value = content; // Sets the note ID as value.
		note.className = "note"; // Sets a CSS class.
		note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
		noteContainer.appendChild(note); // Appends it to the note container element as its child.

		noteIdCounter++; // Increments the counter since the ID is used for this note.

		// TODO: Add new note to the saved notes in the local storage.
		const currentSavedNotes = localStorage.getItem('savedNotes');
		// console.log(currentSavedNotes);
		let notes = [];
		if (currentSavedNotes) {
			notes = JSON.parse(currentSavedNotes);
			//This method parses/breaks down the JSON strings (aka the notes inside the array) into Javascript 
			//and adds it to the notes array. 
		}
		notes.push({ id, content });
		localStorage.setItem('savedNotes', JSON.stringify(notes));
		localStorage.setItem('noteIdCounter', id);
	};

	colorForm.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevents the default event.

		const newColor = colorInput.value.trim();  // Removes whitespaces.

		const notes = document.querySelectorAll(".note");
		for (const note of notes) {
			note.style.backgroundColor = newColor;
		}

		colorInput.value = ""; // Clears the color input field after from submission.

		noteColor = newColor; // Updates the stored note color with the new selection.

		// TODO: Update the note color in the local storage.
		localStorage.setItem('noteColor', newColor);
	});

	newNoteButton.addEventListener("click", function () {
		addNewNote();
	});

	document.addEventListener("dblclick", function (event) {
		if (event.target.classList.contains("note")) {
			const noteId = event.target.getAttribute('data-note-id');
			//get the array in local storage and the id that is associated to the note
			const retrievedNotes = JSON.parse(localStorage.getItem('savedNotes'));

			const newArray = retrievedNotes.filter((box) => {
				//double not equals b/c the noteId is a string and will compare the value not type
				return box.id != noteId;
				//returns true if box(obj) is not equal to noteId and is put into newArray, if it is false then it 
				//will be filtered out
			});
			localStorage.setItem('savedNotes', JSON.stringify(newArray));
			event.target.remove();
		}
	}
	);
	// TODO: Delete the note from the saved notes in the local storage.

	noteContainer.addEventListener("blur", function (event) {
		if (event.target.classList.contains("note")) {

			const noteId = event.target.getAttribute('data-note-id');
			const retrievedNotes = JSON.parse(localStorage.getItem('savedNotes'));

			let noteToUpdate = retrievedNotes.find(note => note.id == noteId);

			if (noteToUpdate) {
				noteToUpdate.content = event.target.value;
			}
			localStorage.setItem('savedNotes', JSON.stringify(retrievedNotes));
		}
		// TODO: Update the note from the saved notes in the local storage.
	}
		, true);

	window.addEventListener("keydown", function (event) {
		/* Ignores key presses made for color and note content inputs. */
		if (event.target.id === "color-input" || event.target.type === "textarea") {
			return;
		}

		/* Adds a new note when the "n" key is pressed. */
		if (event.key === "n" || event.key === "N") {
			addNewNote(); // Adds a new note.
		}
	});
});
