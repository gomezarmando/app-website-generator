const fs = require('fs');
const util = require('util');
const writeFilePromise = util.promisify(fs.writeFile);

module.exports = generateFiles = async (allFilesToMake) => {
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