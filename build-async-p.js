const fs = require('fs');
const config = require('./options');
const rimraf = require('rimraf')
const util = require('util');
const writeFolderPromise = util.promisify(fs.mkdir);
const writeFilePromise = util.promisify(fs.writeFile);

const filesToMake = [
	{
		'content': '<html><p>they</p></html>',
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

generateFolders = () => {
	return writeFolderPromise('./dist/')
	.then(() => {
		console.log('Folder created - dist');
	})
	.catch(error => {
		console.log('Problem creating folder', error);
	})
}

generateFiles = async (file) => {
	const arrayOfFilesPromises = [];

	await filesToMake.forEach(file => {
		console.log('writing each file', file.name);
		arrayOfFilesPromises.push(
			writeFilePromise(`${file.name}.${file.type}`, file.content)
		)
	})

	await console.log('arrayOfFilesPromises length', arrayOfFilesPromises.length)

	return Promise.all(arrayOfFilesPromises)
		.then(() => {
			console.log('returning')
		})
		.catch(error => console.log('error from promise all:', error));

}

generateDocuments = async () => {
	const startTime = await new Date();
	await console.log('starting');
	await generateFolders().catch(error => {
		console.log('error from catch', error);
	});
	await generateFiles();
	await console.log('ending');
	const endTime = await new Date();
	await console.log('Duration:', (endTime - startTime));
}

try {
	generateDocuments()
} catch (error) {
	console.log("Catching errors in try / catch", error)
}
