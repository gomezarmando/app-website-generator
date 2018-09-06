const returnUrlFromDetails = (bucket, region) => {
	let returnUlr;
	
	const regions = {
		'': 'us-east-1'
	};

	if (bucket) {
		returnUlr = `${bucket}.s3-website.${regions[region]}.amazonaws.com`;
	} else {
		returnUlr = '';
	}
	return returnUlr
}

module.exports = {
	returnUrlFromDetails
}