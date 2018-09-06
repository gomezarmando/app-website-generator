const AWS = require('aws-sdk');
const {returnUrlFromDetails} = require('./aws-helpers');
const s3 = new AWS.S3();
const chalk = require('chalk');

const setBucketHostingInfo = (bucket) => {
	const params = {
		Bucket: bucket,
		WebsiteConfiguration: {
			ErrorDocument: {
				Key: 'index.html'
			},
			IndexDocument: {
				Suffix: 'index.html'
			},
		}
	};
	
	return new Promise((resolve, reject) => {
		s3.putBucketWebsite(params, (error) => {
			if (error) {
				reject({set: false})
			} else {
				resolve({set: true});
			}
		})
	}).catch(error => console.log(chalk.red('AWS - Error setting bucket info'), error))
}

const getBucketLocation = bucket => {
	return new Promise((resolve, reject) => {
		s3.getBucketLocation({Bucket: bucket}, (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve({data})
			}
		})
	})
	.catch(error => console.log(chalk.red('AWS - Error retrieving bucket location'), error.message));
}

const getBucketSignedUrl = async (bucket) => {
	const location = await getBucketLocation(bucket);
	let url = '';

	if (location.data.LocationConstraint !== null) {
		url = await returnUrlFromDetails(bucket, location.data.LocationConstraint);
	}

	
	return new Promise(async (resolve, reject) => {		
		if (!url) {
			reject('errors in no url')
		} else {
			resolve({url})
		}
	}).catch(error => console.log(chalk.red('AWS - Error retrieving bucket Url'), error.message));
}

const getBucketWebsite = (bucket) => {
	return new Promise((resolve, reject) => {
		s3.getBucketWebsite({Bucket: bucket}, (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		})
	})
	.catch(error => console.log(chalk.red('AWS - Error retrieving bucket info'), error.message));
}

const getBucketAcl = (bucket) => {
	return new Promise((resolve, reject) => {
		s3.getBucketAcl({Bucket: bucket}, (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		})
	})
	.catch(error => console.log(chalk.red('AWS - Error getting bucket info'), error.message));
}

const getBucketItems = (bucket) => {
	return new Promise((resolve, reject) => {
		s3.listObjects({Bucket: bucket}, (error ,data) => {
			if (error) {
				reject(error)
			} else {
				resolve(data)
			}
		})
	}).catch(error => console.log(chalk.red('AWS - Error getting bucket items'), error));
}

const checkForBucket = (bucket) => {
	return new Promise((resolve, reject) => {
		s3.headBucket({Bucket: bucket}, (error, data) => {
			if (error && error.code !== 'NotFound') {
				reject({exists: false, error})
			} else if (error && error.code === 'NotFound') {
				resolve({exists: false, data: {}})
			}

			resolve({exists: true, data})
		})
	})
	.catch(error => console.log(chalk.red('AWS - Error getting bucket details', error)));
}

const deleteBucketItems = async (bucket, listItems) => {
	const deleteObject = {};
	deleteObject.Objects = [];

	await listItems.forEach(({Key}) => {
		deleteObject.Objects.push({Key});
	});

	return await new Promise((resolve, reject) => {
		s3.deleteObjects({Bucket: bucket, Delete: deleteObject}, (error, data) => {
			if (error) {
				reject({deleted: false, error})
			} else {
				resolve({deleted: true, data})
			}
		})
	}).catch(error => {
		console.log(chalk.red('AWS - Error emptying bucket', JSON.stringify(error)))
		return {deleted: false, error}
	})
}

const deleteBucket = (bucket) => {
	return new Promise((resolve, reject) => {
		s3.deleteBucket({Bucket: bucket}, (error, data) => {
			if (error){
				console.log(chalk.black('Error deleting:', bucket))
				reject({deleted: false, error})
			} else {
				resolve({deleted: true, data: {bucket}})
			}			
		})
	}).catch(error => console.log(chalk.red('AWS - Error deleteing bucket', JSON.stringify(error))))
}

const createBucket = (bucket) => {
	return new Promise((resolve, reject) => {
		s3.createBucket({Bucket:bucket}, (error, data) => {
			if(error){
				reject({created: false, data: {error}})
			} else {
				resolve({created: true, data: {bucket}})
			}
		})
	}).catch(error => console.log(chalk.red('AWS - Error creating bucket:', error.message)))
}

const uploadFile = (bucket, name, fileBody) => {
	return new Promise((resolve, reject) => {
		s3.putObject({Bucket: bucket, Key: name, Body: fileBody, ACL: 'public-read', ContentType: 'text/html'}, (error, data) => {
			if (error) {
				reject(error)
			} else {
				resolve({uploaded: true, data: {bucket, name, fileBody}})
			}
		})
	}).catch(error => console.log(chalk.red('AWS - Error uploading file:', error.message)))
}

module.exports = {
	checkForBucket,
	createBucket,
	deleteBucket,
	deleteBucketItems,
	getBucketAcl,
	getBucketSignedUrl,
	getBucketWebsite,
	getBucketItems,
	setBucketHostingInfo,
	uploadFile
}