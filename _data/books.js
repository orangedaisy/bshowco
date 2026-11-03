import Fetch from "@11ty/eleventy-fetch";

const isbns = [
	"9781476615257",
	"9781683583233",
	"9781250805898",
	"9781631496226",
	"9780593135211",
	"9780593820254",
	"9780593820278",
	"9780593820285",
	"9780593955970",
	"9780593955994",
	"9780593956014"
];

export default async function ()  {
	const entries = await Promise.all(
		isbns.map(async (isbn) => {
			const book = await Fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`, {
				duration: "1d",
				type: "json",
			});
			return [isbn, book[`ISBN:${isbn}`]];
		})
	);

	return Object.fromEntries(entries);
}
