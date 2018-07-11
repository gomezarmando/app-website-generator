const fs = require('fs');
const ConvertJSONSections = require('./convertJSONSections');
const util = require('util');
const writeFilePromise = util.promisify(fs.writeFile);

module.exports = generateHTML = async (sections, cssFiles) => {
	const path = './dist/index.html';
	const indexPage = new ConvertJSONSections(sections, cssFiles);
	const indexPageHTML = await indexPage.convertToHTML();

	return writeFilePromise(path, indexPageHTML)
		.then(response => console.log('Generating HTML'))
		.catch(error => console.log('Error generating HTML', error));
};