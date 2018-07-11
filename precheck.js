const chalk = require('chalk');
const util = require('util');
const rimraf = require('rimraf')
const rimrafPromise = util.promisify(rimraf);

module.exports = precheck = async () => {
	return rimrafPromise('./dist/')
		.then((response) => {
			console.log(chalk.black.bold('Erasing previous version.'))
			return true;
		})
		.catch(error => {
			console.log(chalk.red.bold('Error deleting dist directory.'));
			return false;
		})
}