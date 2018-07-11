const chalk = require('chalk');
const fs = require('fs');
const ConvertJSONSections = require('./convertJSONSections');
const util = require('util');
const writeFilePromise = util.promisify(fs.writeFile);

module.exports = generateHTML = async (page, sections, cssFiles) => {
	const path = `./dist/${page}`;
	const jsonPage = new ConvertJSONSections(sections, cssFiles);
	const jsonPageHTML = await jsonPage.convertToHTML();

	return writeFilePromise(path, jsonPageHTML)
		.then(response => console.log(chalk.black.bold(`Generated ${page}`)))
		.catch(error => console.log(chalk.red('Error generating HTML'), error));
};