const chalk = require('chalk');
const mkdirp = require('mkdirp');
const util = require('util');
const writeFoldersPromise = util.promisify(mkdirp);

module.exports = generateFolders = async (allFilesToMake) => {
	const arrayOfFolderPromises = [];
	const foldersToMake = allFilesToMake.filter(file => file.type === 'directory');
	
	await foldersToMake.forEach(folder => {
		arrayOfFolderPromises.push(
			writeFoldersPromise(`${folder.path}`)
				.then(response => console.log(chalk.green(`Writing folder: ${folder.name}`)))
		)
		if(folder.children && folder.children.length > 0) {
			folder.children.forEach(subFolder => {
				arrayOfFolderPromises.push(
					writeFoldersPromise(`${subFolder.path}`)
						.then(response => console.log(chalk.green(`Writing folder: ${subFolder.name}`)))
				)
			})	
		}
	})

	return Promise.all(arrayOfFolderPromises)
	.then(() => {
		console.log(chalk.black.bold('Folders created.'));
	})
	.catch(error => {
		console.log(chalk.red('Problem creating folder'), error)
	});
}