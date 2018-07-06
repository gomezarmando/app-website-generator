const config = require('./options');

const generateFolders = require('./generateFolders');
const generateFiles = require('./generateFiles');
const precheck = require('./precheck')

const downloadFilesandSave = require('./downloadFilesandSave');

const allFilesToMake = [
	{
		'content': '<html><p>they</p></html>',
		'path': './dist/',
		'name': 'index',
		'type': 'html'
	},
	{
		'content': 'html { padding: 0 }',
		'name': 'main',
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
}

const main = async () => {
	await generateFilesandDirectories();
	await downloadAssets();
}
try {
	main();
} catch (error) {
	console.log("Catching errors in try / catch", error)
}
