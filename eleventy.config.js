import { DateTime } from "luxon";
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { JSDOM } from "jsdom";

export default async function (eleventyConfig) {
	// eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPassthroughCopy("src/static/**/*.css");

	eleventyConfig.addJavaScriptFunction("getToc", getToc);
	eleventyConfig.addJavaScriptFunction("addIds", addIds);

	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: "src/_includes/_components/*.webc",
	});
	return {
		dir: { input: "src", output: "build", layouts: "_layouts" },
		templateFormats: ["md", "webc"],
	};
}

function getToc(content) {
	const dom = JSDOM.fragment(content);
	const headings = dom.querySelectorAll("h1, h2");

	return Array.from(headings)
		.flatMap((h) => {
			const id = h.id;
			const title = h.textContent;
			return `<li><a href="#${id}">${title}</a></li>`;
			//
		})
		.join("");
}

function addIds(content, elementTypes = ["h1", "h2"]) {
	const dom = new JSDOM(content).window.document.body;
	const headings = Array.from(dom.querySelectorAll("h1, h2"));
	headings.forEach((h) => {
		console.log(h.textContent);
		h.id = toKebabCase(h.textContent);
	});
	console.log(dom.innerHTML);

	return dom.innerHTML;
}

function toKebabCase(s) {
	return encodeURIComponent(
		String(s).trim().toLowerCase().replace(/\s+/g, "-"),
	);
}
