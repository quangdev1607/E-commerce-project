import bannerImg from "../assets/banner-img.png";

const Banner = () => {
	return (
		<div className="w-full">
			<img src={bannerImg} alt="banner" className="h-[478px] w-full object-cover" />
		</div>
	);
};

export default Banner;
