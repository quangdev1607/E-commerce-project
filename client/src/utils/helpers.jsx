import icons from "./icons";

// Trường hợp quên tạo slug cho productCategories trong database
export const createSlug = (string) =>
	string
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.split(" ")
		.join("-");

const { AiFillStar, AiOutlineStar } = icons;
export const renderStars = (starNumber) => {
	if (!Number(starNumber)) return;
	const stars = [];

	for (let i = 0; i < +starNumber; i++)
		stars.push(<AiFillStar key={crypto.randomUUID()} color="orange" />);
	for (let j = 5; j > +starNumber; j--)
		stars.push(<AiOutlineStar key={crypto.randomUUID()} color="orange" />);
	return stars;
};

export const formatCash = (str) => {
	return str
		.split("")
		.reverse()
		.reduce((prev, next, index) => {
			return (index % 3 ? next : next + ",") + prev;
		});
};

export const secondsToMs = (d) => {
	d = Number(d) / 1000;
	const h = Math.floor(d / 3600);
	const m = Math.floor((d % 3600) / 60);
	const s = Math.floor((d % 3600) % 60);
	return { h, m, s };
};
