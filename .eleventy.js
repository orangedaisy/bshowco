const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
	// Enable syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight);
	// Make Liquid capable of rendering "partials"
	eleventyConfig.setLiquidOptions({
		dynamicPartials: true,
		strict_filters: true,
	});
	// Enable WebC
	eleventyConfig.addPlugin(pluginWebc);

	return {
		dir: {
			layouts: "_layouts"
		}
	}
}
