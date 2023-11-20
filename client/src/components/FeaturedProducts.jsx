import { useState, useEffect, memo } from "react";
import { apiGetProducts } from "../api";
import { formatCash, renderStars } from "../utils/helpers";

const FeaturedProducts = () => {
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const fetchFeaturedProducts = async () => {
		const response = await apiGetProducts({ limit: 9, sort: "-sold", totalRatings: 5 });
		if (response.success === true) setFeaturedProducts(response.data);
	};

	useEffect(() => {
		fetchFeaturedProducts();
	}, []);
	return (
		<section className="grid grid-cols-3 gap-4 mt-3">
			{featuredProducts.map((item) => (
				<div key={item._id} className="flex items-center justify-start border p-4">
					<img
						className="pr-3"
						width={84}
						height={84}
						src={item.thumbnail}
						alt="featured"
					/>
					<div className="flex flex-col  gap-y-2">
						<span className="line-clamp-1 text-[14px] font-medium">{item.title}</span>
						<span className="flex">{renderStars(item?.totalRatings)}</span>

						<span className="text-xs font-normal">{`${formatCash(
							item.price.toString()
						)} VND`}</span>
					</div>
				</div>
			))}
		</section>
	);
};

export default memo(FeaturedProducts);
