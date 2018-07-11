module.exports = {
	"site-details": {
		"name": "Transit Pigeon"
	},
	"sections": [
		{
			"iconImage": "roundedTransitPigeon.png",
			"order": 1,
			"subtitle": "Find the nearest stop around you",
			"title": "Transit Pigeon",
			"layoutType": "half",
		}
	],
	"images": [
		{directory: '/dist/img/', name: 'hero', url: 'https://s3.amazonaws.com/public-gomez-aws/img/hero.png', type: 'png'},
		{directory: '/dist/img/', name: 'roundedTransitPigeon', url: 'https://s3.amazonaws.com/public-gomez-aws/img/roundedTransitPigeon.png', type: 'png'}
	],
	'published-platforms': ['ios'],
	"css": [
		{directory: '/dist/css/', name: 'bulma', url: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css', type: 'css'},
		{directory: '/dist/css/', name: 'style', url: '', type: 'css'}
	]
}