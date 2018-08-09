const config = require('./options');

const downloadFilesandSave = require('./downloadFilesandSave');
const generateFolders = require('./generateFolders');
const generateFiles = require('./generateFiles');
const generateHTML = require('./generateHTML');
const precheck = require('./precheck')

const chalk = require('chalk');

const generateFilesandDirectories = async () => {
	await precheck();
	await generateFolders(config.allFilesToMake);
	await generateFiles(config.allFilesToMake); 
}

const downloadAssets = async () => {
	await downloadFilesandSave(config.images, 'image');
	await downloadFilesandSave(config.css, 'css');
}

const generateHTMLFiles = async () => {
	await generateHTML('index.html',config.sections, config.css, config.siteDetails)
}

const main = async () => {
	await generateFilesandDirectories();
	await downloadAssets();
	await generateHTMLFiles();
}
try {
	main();
} catch (error) {
	console.log(chalk.red("Catching errors in try / catch"), error)
}
