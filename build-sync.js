const fs = require('fs');
const config = require('./options.js');
const rimraf = require('rimraf');
const filesToMake = [
	{
		'content': '<html></html>',
		'path': './dist/',
		'name': 'index',
		'type': 'html'
	},
	{
		'content': 'html { padding: 0 }',
		'name': 'main',
		'path': './dist/',
		'type': 'css'
	}
];
const isDistFolderPresent = fs.existsSync('./dist/');

function createFolders () {
	try {
		console.log('Creating folders.');
		fs.mkdirSync('./dist/')
		fs.mkdirSync('./dist/img/')
	} catch (error) {
		console.log('error creating folders', error);
	}
}
function createFiles () {
	try {
		console.log('Creating files.');
		filesToMake.forEach(file => {
			console.log('Creating -', file.name);
			fs.writeFileSync(`${file.path}/${file.name}.${file.type}`, file.content);
		});
	} catch (error) {
		console.log('error creating files', error)	
	}
}

function generateDocuments() {
	try {
		console.log('Kicking off generating all documents');
		createFolders();
		createFiles();
	} catch (error) {
		console.log('error generating documents', error)
	}
}

if(isDistFolderPresent){
	try {
		console.log('Directory /dist/ exists... Deleting folder')
		rimraf.sync('./dist/');
		generateDocuments();
	} catch (err) {
		console.log('error', err);
	}
} else {
	console.log('Dist folder not present... Generating files.');
	generateDocuments();
}
