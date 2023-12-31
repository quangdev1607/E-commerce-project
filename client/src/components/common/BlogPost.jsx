import { memo } from "react";

const BlogPost = () => {
  return (
    <>
      <section className="w-full py-[15px] pr-[15px] mt-3 border-b-2  border-main">
        <span className=" uppercase font-semibold text-[20px] ">Blog Posts</span>
      </section>
      <section className="mt-3">
        <span>Coming soon...</span>
      </section>
    </>
  );
};

export default memo(BlogPost);
