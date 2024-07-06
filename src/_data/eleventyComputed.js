import { JSDOM } from "jsdom";

export default async function (configData) {
	// console.log("*********************************************");
	// console.log(JSON.stringify(configData.page));

	return {
		testData: (data) => {
			// console.log(JSON.stringify(data.page, null, 2));
			// console.log(data.page.rawInput);
			const dom = JSDOM.fragment(data.page.rawInput);
			const h1 = dom.querySelector("h1");
			// console.log(h1);
			return [];
		},
	};
}
