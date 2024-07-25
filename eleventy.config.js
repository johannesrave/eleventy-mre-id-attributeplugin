import { DateTime } from "luxon";
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { IdAttributePlugin } from "@11ty/eleventy";
import { JSDOM } from "jsdom";

export default async function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/static/**/*.css");

	eleventyConfig.addJavaScriptFunction("getToc", getToc);
	// eleventyConfig.addJavaScriptFunction("addIds", addIds);
	eleventyConfig.addJavaScriptFunction("extractExcerpt", extractExcerpt);

	eleventyConfig.addJavaScriptFunction("dateToLocaleString", dateToLocaleString);

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
		})
		.join("");
}

function addIds(content, elementTypes = ["h1", "h2"]) {
	const dom = new JSDOM(content).window.document.body;
	const headings = Array.from(dom.querySelectorAll("h1, h2"));

	for (const heading of headings) {
		heading.id = toKebabCase(heading.textContent);
	}

	return dom.innerHTML;
}

function toKebabCase(s) {
	return encodeURIComponent(
		String(s).trim().toLowerCase().replace(/\s+/g, "-"),
	);
}

function dateToLocaleString(dateObj) {
	return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
}

function extractExcerpt(post) {
	if (!post.templateContent) return "";
	if (post.templateContent.indexOf("</p>") > 0) {
		const end = post.templateContent.indexOf("</p>");
		return post.templateContent.substring(0, end + 4);
	}
	return post.templateContent;
}
