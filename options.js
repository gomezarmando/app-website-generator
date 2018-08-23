module.exports = {
	"siteDetails": {
		"htmlTitle": "Transit Pigeon iOS App",
		"name": "Transit Pigeon",
		"copyright": "transitpigeon.com All Rights Reserved"
	},
	"AWS": {
		"bucket": 'testbucket-xyz-one-three-five-seven',
	},
	"sections": [
		{
			"iconImage": "roundedTransitPigeon.png",
			"order": 1,
			"subtitle": "Find the nearest stop around you",
			"title": "Transit Pigeon",
			"layoutType": "half",
		},
		{
			"iconImage": "iphone-white-landing.png",
			"iconImagePlacement": "left",
			"order": 2,
			"subtitle": "",
			"title": "A modern design with a clear and simple interface",
			"content": [
				{
					"type":"ul",
					"children": [
						{
							"type": "li",
							"content": 'View times for many upcoming trains and buses'
						},
						{
							"type": "li",
							"content": 'Toggle each stop\'s direction and view incoming or outgoing times'
						},
						{
							"type": "li",
							"content": 'Pull to refresh all of your favorite stops'
						}
					],
					"content": ''
				},
				{
					"type": "p",
					"content": "this is general content for the p tag - working?"
				}
			]
		},
		{
			"iconImage": "iphone-white-search.png",
			"iconImagePlacement": "right",
			"order": 3,
			"subtitle": "",
			"title": "View all the stop times near you with one tap",
			"content": [
				{
					"type": "ul",
					"children": [
						{
							"type": "li",
							"content": "Transit Pigeon will display incoming and outgoing times for both train and bus stops around you"
						},
						{
							"type": "li",
							"content": "Want to view stops for a different neighborhood? Use the search feature to find stop times in that area"
						}
					],
					content: ''
				}
			]
		},
		{
			"iconImage": 'iphone-white-detail.png',
			"iconImagePlacement": "left",
			"order": 4,
			"subtitle": "",
			"title": "Turn by turn directions are a tap away",
			"content": [
				{
					"type": "ul",
					"children": [
						{
							"type": "li",
							"content": "Walk and drive directions to stops are one click away"
						},
						{
							"type": "li",
							"content": "Pressing the directions button will automatically load Apple maps with the correct destination"
						}
					],
					content: ""
				}
			]
		},
		{
			"iconImage": "iphone-white-login.png",
			"iconImagePlacement": "right",
			"order": 5,
			"subtitle": "",
			"title": "Save your favorites to the cloud",
			"content": [
				{
					"type": "ul",
					"children": [
						{
							"type": "li",
							"content": "Stops are not saved on your phone"
						},
						{
							"type": "li",
							"content": "Login to Transit Pigeon on any iPhone to load your favorite stops"
						}
					],
					content: ""
				}
			]
		},
		{
			"iconImage": "iphone-white-list.png",
			"iconImagePlacement": "left",
			"order": 6,
			"subtitle": "",
			"title": "CTA Busses and CTA Trains",
			"content":[
				{
					"type": "ul",
					"children": [
						{
							"type": "li",
							"content": "Metra *coming soon"
						}
					],
					content: ""
				}
			]
		}
	],
	"images": [
		{directory: '/dist/img/', name: 'hero', url: 'https://s3.amazonaws.com/public-gomez-aws/img/hero.png', type: 'png'},
		{directory: '/dist/img/', name: 'roundedTransitPigeon', url: 'https://s3.amazonaws.com/public-gomez-aws/img/roundedTransitPigeon.png', type: 'png'},
		{directory: '/dist/img/', name: 'iphone-white-landing', url: 'https://s3.amazonaws.com/public-gomez-aws/img/iphone-6-images/iphone-white-landing.png', type: 'png'},
		{directory: '/dist/img/', name: 'iphone-white-search', url: 'https://s3.amazonaws.com/public-gomez-aws/img/iphone-6-images/iphone-white-search.png', type: 'png'},
		{directory: '/dist/img/', name: 'iphone-white-detail', url: 'https://s3.amazonaws.com/public-gomez-aws/img/iphone-6-images/iphone-white-detail.png', type: 'png'},
		{directory: '/dist/img/', name: 'iphone-white-login', url: 'https://s3.amazonaws.com/public-gomez-aws/img/iphone-6-images/iphone-white-login.png', type: 'png'},
		{directory: '/dist/img/', name: 'iphone-white-list', url: 'https://s3.amazonaws.com/public-gomez-aws/img/iphone-6-images/iphone-white-list.png', type: 'png'}
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