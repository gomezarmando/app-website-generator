const mkdirp = require('mkdirp');
const fs = require('fs');
const rimraf = require('rimraf')
const util = require('util');
const config = require('./options');
const writeFoldersPromise = util.promisify(mkdirp);
const writeFilePromise = util.promisify(fs.writeFile);
const rimrafPromise = util.promisify(rimraf);

const allFilesToMake = [
	{
		'content': '<html><p>they</p></html>',
		'path': './dist/',
		'name': 'index',
		'type': 'html'
	},
	{
		'content': 'html { padding: 0 }',
		'name': 'main',
		'path': './dist/css/',
		'type': 'css'
	},
	{
		'children': [
			{
				'name' : 'css',
				'path' : './dist/css/',
				'type' : 'directory'
			},
			{
				'name' : 'img',
				'path' : './dist/img/',
				'type' : 'directory'
			}
		],
		'name' : 'dist',
		'path' : './dist',
		'type' : 'directory'
	}
];

precheck = async () => {
	await console.log('Preparing directories.')

	return rimrafPromise('./dist/')
		.then((response) => {
			console.log('Directories prepared.')
			return  true;
		})
		.catch(error => {
			console.log('Error deleting dist directory.');
			return false;
		})
}

generateFolders = async () => {
	const arrayOfFolderPromises = [];
	const foldersToMake = allFilesToMake.filter(file => file.type === 'directory');
	
	await foldersToMake.forEach(folder => {
		arrayOfFolderPromises.push(
			writeFoldersPromise(`${folder.path}`)
		)
		if(folder.children && folder.children.length > 0) {
			folder.children.forEach(subFolder => {
				arrayOfFolderPromises.push(
					writeFoldersPromise(`${subFolder.path}`)
				)
			})	
		}
	})

	return Promise.all(arrayOfFolderPromises)
	.then(() => {
		console.log('Folders created.');
	})
	.catch(error => {
		console.log('Problem creating folder', error)
	});
}

generateFiles = async () => {
	const arrayOfFilesPromises = [];
	const filesToMake = allFilesToMake.filter(file => file.type !== 'directory');

	await filesToMake.forEach(file => {
		console.log('writing file - ', `${file.name}.${file.type}`);
		arrayOfFilesPromises.push(
			writeFilePromise(`${file.path}${file.name}.${file.type}`, file.content)
		)
	})

	return Promise.all(arrayOfFilesPromises)
		.then(() => {
			console.log('Files created.')
		})
		.catch(error => console.log('Problem creating folder', error));
}

generateDocuments = async () => {
	const startTime = await new Date();
	await console.log('Starting');
	const didDeleteDist = await precheck();
	if (didDeleteDist) {
		await generateFolders(didDeleteDist);
		await generateFiles(didDeleteDist);
		await console.log('Finished.');
		const endTime = await new Date();
		await console.log('Duration:', (endTime - startTime)+' ms');
	} 
}

try {
	generateDocuments()
} catch (error) {
	console.log("Catching errors in try / catch", error)
}
