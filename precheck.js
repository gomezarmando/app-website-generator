const util = require('util');
const rimraf = require('rimraf')
const rimrafPromise = util.promisify(rimraf);

module.exports = precheck = async () => {
	await console.log('Preparing directories.')

	return rimrafPromise('./dist/')
		.then((response) => {
			console.log('Directories prepared.')
			return  true;
		})
		.catch(error => {
			console.log('Error deleting dist directory.');
			return false;
		})
}