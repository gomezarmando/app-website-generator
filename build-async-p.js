const config = require('./options');

const generateFolders = require('./generateFolders');
const generateFiles = require('./generateFiles');
const precheck = require('./precheck')

const downloadFilesandSave = require('./downloadFilesandSave');

const generateHTML = require('./generateHTML');

const allFilesToMake = [
	{
		'content': '<html><p>they</p></html>',
		'path': './dist/',
		'name': 'index',
		'type': 'html'
	},
	{
		'content': `.hero {background: #fff url('../img/hero.png') no-repeat center center fixed;background-size: cover;color:#fff;height: 800px;padding: 200px 0 0 0;}.hero .hero-title {font-size: 5rem;font-weight: lighter;}.hero .hero-subtitle {font-size: 2rem;font-weight: normal;}.hero .intro-icon img{display: block;margin: 0 auto;width: 300px;}`,
		'name': 'style',
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

const generateFilesandDirectories = async () => {
	const startTime = await new Date();
	await console.log('Generating Files and Documents.');
	const didDeleteDist = await precheck();
	if (didDeleteDist) {
		await generateFolders(allFilesToMake);
		await generateFiles(allFilesToMake);
		await console.log('Finished.');
		await console.log('Duration for generating', (new Date() - startTime)+' ms');
	} 
}

const downloadAssets = async () => {
	const starTime = await new Date();
	await console.log('Downloading Files.');
	const successFulImages = await downloadFilesandSave(config.images);
	const successfulCssFiles = await downloadFilesandSave(config.css);
}

const generateHTMLFiles = async () => {
	await generateHTML(config.sections, config.css)
}

const main = async () => {
	await generateFilesandDirectories();
	await downloadAssets();
	await generateHTMLFiles();
}
try {
	main();
} catch (error) {
	console.log("Catching errors in try / catch", error)
}
