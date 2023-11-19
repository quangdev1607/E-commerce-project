import notFoundProductImg from "../assets/image-not-available.png";
import labelProduct from "../assets/label.png";
import newProduct from "../assets/new-product.png";
import { Rating } from "../components";

const Product = ({ productData, activeTab }) => {
	const formatCash = (str) => {
		return str
			.split("")
			.reverse()
			.reduce((prev, next, index) => {
				return (index % 3 ? next : next + ",") + prev;
			});
	};
	return (
		<div className="w-full text-base py-[10px] px-[10px] relative ">
			<div className="border w-full p-4 ">
				<img
					className="  w-full h-[205px] object-contain "
					src={productData?.thumbnail || notFoundProductImg}
					alt="product"
				/>
				{activeTab === 1 ? (
					<img
						className="absolute overflow-visible w-[80px] h-[60px] top-[3px] left-[7px]"
						src={labelProduct}
						alt="label"
					/>
				) : (
					<img
						className="absolute overflow-visible w-[130px] h-[70px] top-[2px] left-0"
						src={newProduct}
						alt="label"
					/>
				)}

				<div className="flex flex-col gap-3 pt-4">
					<span className="line-clamp-1">{productData.title}</span>
					<Rating />
					<span>{`${formatCash(productData.price.toString())} VNĐ`}</span>
				</div>
			</div>
		</div>
	);
};

export default Product;
