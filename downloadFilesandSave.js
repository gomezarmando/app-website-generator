const chalk = require('chalk');
const request = require('request');
const fs = require('fs');

/**
 * downloadFilesandSave method
 * @param {Array} files to download and save locally
 * @return {Promise} returns a promise all
 * 
 * Using this method to itirate over an array of urls to download asynchronously and into a specified folder.
 */
module.exports = downloadFilesAndSave = (files, fileType) => {
	const promises = [];
	const getFile = file => {
		return new Promise((resolve, reject) => {
			const readStream = request(file.url);
			const writeStream = fs.createWriteStream(`${__dirname}${file.directory}${file.name}.${file.type}`);

			// Read Stream Events
			readStream.on('data', chunk => {
				writeStream.write(chunk);
			})
			readStream.on('end', () => {
				writeStream.end()
			})

			// Write Stream Events
			writeStream.on('finish', () => {
				resolve({name: file.name, processed: true})
			})

			// Error Stream Events
			readStream.on('error', error => {
				reject(error);
			})
			writeStream.on('error', error => {
				reject(error);
			})
		})
		.catch(error => {throw new Error(`Error Downloading - ${file.name}.${file.type}`)});
	}

	files.forEach(file => {
		if(file.url){
			promises.push(
				getFile(file)
			)
		}
	})

	return Promise.all(promises)
		.then(results => console.log(chalk.black.bold(`Downloaded: ${results.length} ${fileType} file${results && results.length > 1 ? 's': ''}`), results))
		.catch(error => {console.log(chalk.red('Error downloading and saving:'), error.message)}); //
}