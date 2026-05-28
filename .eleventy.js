const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents");

module.exports = async function (eleventyConfig) {

	// Enable syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight);

	// Enable renderTemplate
	const { EleventyRenderPlugin } = await import("@11ty/eleventy");
	eleventyConfig.addPlugin(EleventyRenderPlugin);

	// Pass Assets
	eleventyConfig.addPassthroughCopy('assets');

	// Render post dates in a readable format
	eleventyConfig.addFilter('postDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});

	// Pad beginning of blog post number with leading zeros
	eleventyConfig.addFilter('postNumber', (number) => {
		// increment post number by 1 since collections start at 0
		number++;
		// convert the number to a localized string for proper separators then hit
		// 'em with the padding
		return number.toLocaleString().padStart(3, '0');
	});

	// Import macros
	eleventyConfig.addPreprocessor('macro-inject', '.njk,.md', (data, content) => {
		return `
			{% from 'codepen.njk' import codepen with context %}\n
			{% from 'figure.njk' import figure with context %}\n` + content;
	});

	// Configure markdown-it
	let mditOptions = {
		html: true,
		typographer: true
	}

	let mditTocOptions = {
		includeLevel: [2,3,4],
		listType: 'ol',
		transformContainerOpen: () => {return '<nav class="table-of-contents">'},
		transformContainerClose: () => {return '</nav>'}
	}
	eleventyConfig.setLibrary("md", markdownIt(mditOptions));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAnchor));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItToc, mditTocOptions));

	return {
		// Use Nunjucks as Markdown engine instead of Liquid (default)
		markdownTemplateEngine: "njk",
		dir: {
			layouts: "_layouts"
		}
	}
}
