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
		let bodyContent = '';
		
		if(this.cssFiles){
			this.cssFiles.forEach(file => {
				headerContent += `<link rel="stylesheet" href="./css/${file.name}.${file.type}">`;
			})
		}
		
		if (this.sections.length) {	
			this.sections.forEach((section, index) => {
				const isHero = section.order === 1 ? true : false;
				const hasTitle = section.title !== '' ? true : false;
				const hasSubTitle = section.subtitle !== '' ? true : false;
				const hasAppIcon = section.iconImage !== '' ? true : false;
				const imageIsLeft = section.iconImage && section.iconImagePlacement === 'left';
				const imageIsRight = section.iconImage && section.iconImagePlacement === 'right';

				bodyContent += `
					<section class="${isHero ? 'hero section' : ' section'}">
						<div class="${isHero ? 'hero-body container': 'container'}">
							<div class="columns is-gapless">
								${
									(imageIsLeft === true) ?
									`<div class="column intro-icon">
										${hasAppIcon ? `<img src="./img/${section.iconImage}" width="300" height="300" />` : ''}
									</div>` : ''
								}
								<div class="column intro-text">
									${hasTitle ? `<h1 class="${isHero ? 'hero-title': 'title'}">${section.title}</h1>` : ''}
									${hasSubTitle ? `<h2 class="${isHero ? 'hero-subtitle' : 'subtitle'}">${section.subtitle}</h2>`: ''}
									<br />
									${
										section.content ? this.generateSectionContent(section.content) : ''
									}
								</div>
								${
									imageIsRight === true ? 
									`<div class="column intro-icon">
										${hasAppIcon ? `<img src="./img/${section.iconImage}" width="300" height="300" />` : ''}
									</div>` : ''
								}
							</div>
						</div>
					</section>
				`;
			});
		}

		updatedHtml += `
			<html>
				<head>
					${headerContent !== '' ? headerContent : ''}
				</head>
				<body>
					${bodyContent !== '' ? bodyContent : ''}
				</body>
			</html>
		`;

		this.htmlString = updatedHtml;

		return this.htmlString
	}

	generateSectionContent (sectionContent) {
		if(!sectionContent) {
			return;
		} else {
			return sectionContent.reduce((accumulator, currentValue) => {
				return (
					accumulator +
					`
						<${currentValue.type && currentValue.type}>
							${currentValue.content && currentValue.content}
							${
								currentValue.children && this.generateSectionContent(currentValue.children)	
							}
						</${currentValue.type && currentValue.type}>
					`
				)
			}, '');
		}
	}
}