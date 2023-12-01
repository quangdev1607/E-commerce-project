import {
  Advertising,
  Banner,
  BestSeller,
  BlogPost,
  DealDaily,
  Featured,
  HotCollections,
  ProductSlider,
  Sidebar,
} from "../../components/index";

const Home = () => {
  return (
    <>
      <div className="w-main flex mt-5">
        <div className=" w-[25%] flex flex-col flex-auto gap-5">
          <Sidebar />
          <DealDaily />
        </div>
        <div className=" w-[75%] flex flex-col flex-auto gap-5 pl-5">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="w-full ">
        <Featured />
        <Advertising />
      </div>

      <div className="w-full">
        <ProductSlider />
      </div>

      <div className="w-full">
        <HotCollections />
      </div>
      <div className="w-full">
        <BlogPost />
      </div>
    </>
  );
};

export default Home;
