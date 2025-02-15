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

	return {
		dir: {
			layouts: "_layouts"
		}
	}
}
