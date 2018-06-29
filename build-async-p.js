const config = require('./options');

const generateFolders = require('./generateFolders');
const generateFiles = require('./generateFiles');
const precheck = require('./precheck')

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

generateDocuments = async () => {
	const startTime = await new Date();
	await console.log('Starting');
	const didDeleteDist = await precheck();
	if (didDeleteDist) {
		await generateFolders(allFilesToMake);
		await generateFiles(allFilesToMake);
		await console.log('Finished.');
		await console.log('Duration:', (new Date() - startTime)+' ms');
	} 
}

try {
	generateDocuments()
} catch (error) {
	console.log("Catching errors in try / catch", error)
}
