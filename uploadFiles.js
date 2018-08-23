const chalk = require('chalk');
const {checkForBucket, createBucket, deleteBucket, deleteBucketItems, getBucketItems, uploadFile} = require('./aws-promise-api');
const path = require('path');
const fs = require('fs');


const isFileDirectory = (path) => {
	return new Promise((resolve, reject) => {
		fs.lstat(path, (err, stats) => {
			if (err) {
				reject(err)
			}
			resolve(stats.isDirectory());
		})
	})
	.catch(error => console.log(chalk.red('FS - Error reading path')));
}

const readdir = (folder) => {
	return new Promise((resolve, reject) => {
		fs.readdir(folder, (err, files) => {
			if (err) {
				reject(err)
			}
			resolve(files);
		})
	})
	.catch(error => console.log(chalk.red('FS - Error reading files from directory', error)));
}

const reduceDirectoryToUploads = (initialFilePath, bucket) => {
	const arrayOfFilesToUpload = [];
	
	const walkSync = (currentFilePath, callback) => {
		fs.readdirSync(currentFilePath).forEach(name => {
			let filePath = path.join(currentFilePath, name);
			let stat = fs.statSync(filePath);
			if (stat.isFile()){
				callback(filePath, stat);
			} else if (stat.isDirectory()) {
				walkSync(filePath, callback);
			}
		})
	}

	walkSync(initialFilePath, (filePath, stat) => {
			const updatedFilePath = filePath.replace('dist/', '');
			arrayOfFilesToUpload.push(
				uploadFile(bucket, updatedFilePath, fs.readFileSync(filePath))
				.then(response => console.log(chalk.green('Uploading file: ', updatedFilePath)))
			)
	})

	return arrayOfFilesToUpload;
}

module.exports = uploadFilestoAWSCloud = async (options) => {
	let bucket;
	let bucketItems
	let didCreateBucket;
	let didEmptyBucket;
	let didDeleteBucket;

	await checkForBucket(options.bucket)
		.then(response => {
			bucket = response;
			console.log(chalk.green(`AWS - Bucket ${bucket.exists === false ? 'not ' : ''}found${bucket.exists === true ? `: ${options.bucket}` : '.'}`));
		})

	const remoteBucket = await bucket.exists;

	if (remoteBucket) {
		await getBucketItems(options.bucket)
			.then(response => {
				bucketItems = response;
				console.log(chalk.green(`AWS - Found ${bucketItems.Contents.length} items in bucket.`))
			})
	
		const remoteBucketItems = await bucketItems.Contents.length > 0;
		
		if (remoteBucketItems) {
			await deleteBucketItems(options.bucket, bucketItems.Contents)
				.then(response => {
					didEmptyBucket = response;
					console.log(chalk.green('AWS - Emptying Bucket: ', options.bucket))
				});	
			
			await deleteBucket(options.bucket)
				.then(response => {
					didDeleteBucket = response;
					console.log(chalk.green('AWS - Deleted Bucket: ', options.bucket))
				})
		} 
	}
	
	await createBucket(options.bucket)
		.then(response => {
			didCreateBucket = response;
			console.log(chalk.green('AWS - Creating Bucket: ', options.bucket))
		})

	if (didCreateBucket.created === true) {
		
		const uploadingFiles = reduceDirectoryToUploads('./dist', options.bucket);

		return Promise.all(uploadingFiles)
			.then(() => {
				console.log(chalk.black.bold(`All ${uploadingFiles.length} files copied to: ${options.bucket}.`))
			})
			.catch(error => console.log(chalk.red('Error uploading dist files to AWS', error)))
	} 
}