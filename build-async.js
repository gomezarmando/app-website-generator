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

createFolders = async () => {
	await fs.mkdir('./dist/', error => {
		if(error) {
			console.log('errors');
		}
	});
	await fs.mkdir('./dist/img/', error => {
		if(error) {
			console.log('errors');
		}
	})
}

createFiles = async () => {
 filesToMake.forEach(file => {
	 console.log('Creating -', file.name);
	 fs.writeFile(`${file.path}/${file.name}.${file.type}`, file.content, '', error => {
		 if (error) {
			 throw new Error('throwingerrorsinside');
		 }
	 })
	})
}

generateDocuments = async () => {
	console.log('Kicking off generating all documents');
	await createFolders();
	await createFiles();
	console.log('Finished creating documents.')
}

try {
	rimraf('./dist', error => {
		if (error) {
			throw new Error('thisiserror rimrafing');
		}
		generateDocuments();
	})
} catch (error) {
	console.log(error)
}