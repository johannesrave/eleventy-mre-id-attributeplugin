import { DateTime } from "luxon";
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { JSDOM } from "jsdom";

export default async function (eleventyConfig) {
	// eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPassthroughCopy("src/static/**/*.css");

	eleventyConfig.addJavaScriptFunction("getToc", (content) => {
		const dom = JSDOM.fragment(content);
		const headings = dom.querySelectorAll("h1, h2");

		console.log(headings.length);
		console.log(typeof headings);

		return Array.from(headings)
			.flatMap((h) => {
				const id = h.id;
				const title = h.textContent;
				return `<li><a href="#${id}">${title}</a></li>`;
				//
			})
			.join("");
	});

	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: "src/_includes/_components/*.webc",
	});
	return {
		dir: { input: "src", output: "build", layouts: "_layouts" },
		templateFormats: ["md", "webc"],
	};
}
