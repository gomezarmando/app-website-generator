const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const chalk = require('chalk');


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
		s3.putObject({Bucket: bucket, Key: name, Body: fileBody}, (error, data) => {
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
	getBucketItems,
	uploadFile
}