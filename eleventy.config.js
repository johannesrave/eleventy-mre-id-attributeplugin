import { IdAttributePlugin } from "@11ty/eleventy";
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";

export default async function (eleventyConfig) {
	eleventyConfig.addPlugin(IdAttributePlugin);
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: "src/_components/**/*.webc",
	});
	return {
		dir: {
			input: "src",
			output: "build",
			layouts: "_layouts",
			includes: "_components",
		},
		templateFormats: ["md", "webc", "njk"],
	};
}
