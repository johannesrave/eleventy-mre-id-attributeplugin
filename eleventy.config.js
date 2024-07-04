import { DateTime } from "luxon";
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";

export default async function (eleventyConfig) {
	// eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPassthroughCopy("src/static/**/*.css");
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: "src/_includes/_components/*.webc",
	});
	return {
		dir: { input: "src", output: "build" },
		templateFormats: ["md", "webc"],
	};
}
