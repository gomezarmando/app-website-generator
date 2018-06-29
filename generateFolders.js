const mkdirp = require('mkdirp');
const util = require('util');
const writeFoldersPromise = util.promisify(mkdirp);

module.exports = generateFolders = async (allFilesToMake) => {
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