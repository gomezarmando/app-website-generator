module.exports = {
	"siteDetails": {
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
	],
	"allFilesToMake": [
		{
			'content': '',
			'path': './dist/',
			'name': 'index',
			'type': 'html'
		},
		{
			'content': `.hero {background: #fff url('../img/hero.png') no-repeat center center fixed;background-size: cover;color:#fff;height: 800px;padding: 200px 0 0 0;}.hero .hero-title {font-size: 5rem;font-weight: lighter;}.hero .hero-subtitle {font-size: 2rem;font-weight: normal;}.hero .intro-icon img{display: block;margin: 0 auto;width: 300px;}`,
			'name': 'style',
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
	]
}