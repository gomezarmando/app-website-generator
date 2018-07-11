module.exports = class ConvertJSONSections {
	constructor (sections, cssFiles) {
		this.htmlString = '';
		this.sections = sections;
		this.cssFiles = cssFiles;
	}

	getHTML () {
		return this.htmlString;
	}

	convertToHTML () {
		let updatedHtml = '';
		let headerContent = '';
		
		if(this.cssFiles){
			this.cssFiles.forEach(file => {
				headerContent += `<link rel="stylesheet" href="./css/${file.name}.${file.type}">`;
			})
		}
		
		if(this.sections){	
			this.sections.forEach((section, index) => {
				const isHero = section.order === 1 ? true : false;
				const hasTitle = section.title !== '' ? true : false;
				const hasSubTitle = section.subtitle !== '' ? true : false;
				const hasAppIcon = section.iconImage !== '' ? true : false;

				updatedHtml += `
					<html>
						<head>
							${headerContent !== '' ? headerContent : ''}
						</head>
						<body>
							<section class="${isHero ? 'hero' : ''}">
								<div class="${isHero ? 'hero-body container': 'container'}">
									<div class="columns is-gapless">
										<div class="column intro-text">
											${hasTitle ? `<h1 class="${isHero ? 'hero-title': 'title'}">${section.title}</h1>` : ''}
											${hasSubTitle ? `<h2 class="${isHero ? 'hero-subtitle' : 'subtitle'}">${section.subtitle}</h2>`: ''}
											<br />

										</div>
										<div class="column intro-icon">
											${hasAppIcon ? `<img src="./img/${section.iconImage}" width="300" height="300" />` : ''}
										</div>
									</div>
								</div>
							</section>
						</body>
					</html>
				`;
			});
		}

		this.htmlString = updatedHtml;

		return this.htmlString
	}
}