const chalk = require('chalk');
const fs = require('fs');
const util = require('util');
const writeFilePromise = util.promisify(fs.writeFile);

module.exports = generateFiles = async (allFilesToMake) => {
	const arrayOfFilesPromises = [];
	const filesToMake = allFilesToMake.filter(file => file.type !== 'directory');

	await filesToMake.forEach(file => {
		arrayOfFilesPromises.push(
			writeFilePromise(`${file.path}${file.name}.${file.type}`, file.content)
		)
	})

	return Promise.all(arrayOfFilesPromises)
		.then(response => {
			console.log(chalk.black.bold('Files created.'), response);
		})
		.catch(error => console.log('Problem creating folder', error));
}