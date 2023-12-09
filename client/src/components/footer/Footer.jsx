import React, { memo } from "react";

const Footer = () => {
  return (
    <>
      <section className="w-full h-[100px] flex items-center justify-center bg-main mt-3">
        <div className="w-main flex items-center justify-between ">
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <span className="text-white tracking-wide text-[20px]">SIGN UP TO NEWSLETTER</span>
            <span className="text-xs font-light text-white">Subscribe now and receive weekly newsletter</span>
          </div>

          <div className="flex flex-2">
            <input
              type="text"
              id="email"
              className="bg-[#ccc] opacity-50 text-gray-900 text-sm rounded-full block w-full p-2.5 focus-visible:outline-none  "
              placeholder="Email address"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-black h-[308px] py-[50px] flex justify-center">
        <div className=" w-main flex   justify-between">
          <div className="flex flex-col">
            <h1 className="text-white pl-4 mb-5 border-main border-l-4">About us</h1>
            <span className=" text-white font-medium text-sm">
              Address: <span className=" text-white font-light text-xs">474 Ontario St Toronto, ON M4X 1M7 Canada</span>
            </span>
            <span className=" text-white font-medium text-sm">
              Phone: <span className=" text-white font-light text-xs"> (+1234)56789xxx</span>
            </span>
            <span className=" text-white font-medium text-sm">
              Mail: <span className=" text-white font-light text-xs">quangphan1607@gmail.com</span>
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white pl-4 mb-5 border-main border-l-4">INFORMATION</h1>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">Typography</span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">Gallery</span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">Store Location</span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">Today's deal</span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">Contact</span>
          </div>
          <div className=" flex flex-col">
            <h1 className="text-white pl-4 mb-5 border-main border-l-4">Help</h1>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">Free shipping</span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">FAQs</span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer  text-sm">
              Return and Exchange
            </span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer text-sm">Today's deal</span>
            <span className=" text-[#ccc] font-light hover:text-white cursor-pointer text-sm">Testimonials</span>
          </div>
          <div>
            <h1 className="text-white pl-4  border-main border-l-4">#DIGITALWORLDSTORE</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Footer);
