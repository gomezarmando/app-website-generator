const {getBucketAcl, getBucketSignedUrl, getBucketWebsite, setBucketHostingInfo} = require('./aws-bucket-promise-api');
const chalk = require('chalk');

module.exports = getAWSDetails = async (options) => {
	const didSetCorrectSettings = await setBucketHostingInfo(options.bucket);

	if (didSetCorrectSettings.set === true) {
		console.log(chalk.green(`AWS - Setting ${options.bucket} hosting preferences`));
		
		return getBucketSignedUrl(options.bucket)
			.then(response => {
				console.log(chalk.black.bold(`Bucket URL: http://${response.url}`));
			})
			.catch(error => console.log(chalk.red('AWS - Error getting bucket info'), error.message))
	}
}