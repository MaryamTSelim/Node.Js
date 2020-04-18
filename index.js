let commander = require("commander");
let note = require("./note");
commander
	.command('add')
	.requiredOption("-t, --title", "title")
	.action((option) => {
		let title = option.args[0];
		note.addNote(title)
	})

commander
	.command('list')
	.action(() => {
		let notes = note.getAllNotes()
		notes.forEach(n => {
			console.log(`< ${n.id} > : ${n.title}`)
		});
	})

commander
	.command('edit')
	.requiredOption("-t, --title", "title")
	.requiredOption("-i, --id", "id")
	.action((option) => {
		let title = option.args[0];
		let id = Number(option.args[1]);
		note.editNote(title, id);
	})

commander
	.command('delete')
	.requiredOption("-i, --id", "id")
	.action((option) => {
		let id = Number(option.args[0]);
		note.deleteNote(id);
	})


commander.parse(process.argv)



