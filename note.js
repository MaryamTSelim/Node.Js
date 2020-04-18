let fs = require("fs");

exports.addNote = function (title) {
	let out = JSON.parse(fs.readFileSync('db.json').toString());
	out.note.push({ id: out.note.length, title });
	fs.writeFileSync('db.json', JSON.stringify(out));
}

exports.getAllNotes = function () {
	return JSON.parse(fs.readFileSync('db.json').toString()).note;
}

exports.editNote = function (title, id) {
	let out = JSON.parse(fs.readFileSync('db.json').toString());
	if (out.note[id] != undefined) {
		out.note[id].title = title;
		fs.writeFileSync('db.json', JSON.stringify(out));
	}
	else {
		console.log(`Id : ${id} not found`)
	}
}

exports.deleteNote = function (id) {
	let out = JSON.parse(fs.readFileSync('db.json').toString());
	if (out.note[id] != undefined) {
		out.note.splice(id, 1);
		fs.writeFileSync('db.json', JSON.stringify(out));
	}
	else {
		console.log(`Id : ${id} not found`)
	}
}