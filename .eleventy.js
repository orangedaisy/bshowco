const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
	// Enable syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight);
	// Pass Assets
	eleventyConfig.addPassthroughCopy('assets');
	// Make Liquid capable of rendering "partials"
	eleventyConfig.setLiquidOptions({
		dynamicPartials: true,
		strict_filters: true,
	});
	// Render post dates in a readable format
	eleventyConfig.addFilter('postDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});
	// Enable WebC
	eleventyConfig.addPlugin(pluginWebc);
	// Pad beginning of blog post number with leading zeros
	eleventyConfig.addFilter('postNumber', (number) => {
		// increment post number by 1 since collections start at 0
		number++;
		// convert the number to a localized string for proper separators then hit
		// 'em with the padding
		return number.toLocaleString().padStart(3, '0');
	});

	return {
		dir: {
			layouts: "_layouts"
		}
	}
}
