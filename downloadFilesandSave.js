const request = require('request');
const fs = require('fs');

/**
 * downloadFilesandSave method
 * @param {Array} files to download and save locally
 * @return {Promise} returns a promise all
 * 
 * Using this method to itirate over an array of urls to download asynchronously and into a specified folder.
 */
module.exports = downloadFilesAndSave = files => {
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
				console.log('processing -', file.name);
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
		.catch(error => console.log("Error in getting file data:", error))
	}

	files.forEach(file => {
		promises.push(
			getFile(file)
		)
	})

	return Promise.all(promises)
		.then(results => console.log('Processed:', results))
		.catch(error => console.log('error downloading and saving:', error));
}