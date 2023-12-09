import moment from "moment";
import { memo, useEffect, useState } from "react";
import { CountDown } from "..";
import { apiGetProducts } from "../../api";
import { formatCash, renderStars, roundCash, secondsToMs } from "../../utils/helpers";
import icons from "../../utils/icons";
const DealDaily = () => {
  const { AiFillStar, FiMenu } = icons;
  const [dailyDealProduct, setDailyDealProduct] = useState(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isExpiredTime, setIsExpiredTime] = useState(false);

  let idInterval;

  const fetchDailyDeal = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.floor(Math.random() * 10),
      // totalRatings: 5,
    });
    if (response.success === true) {
      setDailyDealProduct(response.data[0]);
      const today = `${moment().format("MM/DD/YYYY")} 0:00:00`;
      const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = secondsToMs(seconds);
      setHours(number.h);
      setMinutes(number.m);
      setSeconds(number.s);
    } else {
      setHours(0);
      setMinutes(59);
      setSeconds(59);
    }
  };

  useEffect(() => {
    clearInterval(idInterval);
    fetchDailyDeal();
  }, [isExpiredTime]);

  // useEffect(() => {
  // 	// console.log("interval");
  // 	idInterval = setInterval(() => {
  // 		if (seconds > 0) setSeconds((prev) => prev - 1);
  // 		else {
  // 			if (minutes > 0) {
  // 				setMinutes((prev) => prev - 1);
  // 				setSeconds(59);
  // 			} else {
  // 				if (hours > 0) {
  // 					setHours((prev) => prev - 1);
  // 					setMinutes(59);
  // 					setSeconds(59);
  // 				} else {
  // 					setIsExpiredTime(!isExpiredTime);
  // 				}
  // 			}
  // 		}
  // 	}, 1000);
  // 	return () => {
  // 		clearInterval(idInterval);
  // 	};
  // }, [hours, minutes, seconds, isExpiredTime]);

  return (
    <div className="w-full border  flex-auto">
      <main className="p-5 flex flex-col gap-y-6">
        <section className="flex items-center justify-between ">
          <span className="flex-1">
            <AiFillStar color="#DD1111" size={20} />
          </span>
          <span className=" flex-3 uppercase text-[20px] font-semibold text-[#505050] text-center">Daily Deal</span>
          <span className="flex-1"></span>
        </section>
        <section>
          <img className="w-full object-contain" src={dailyDealProduct?.thumbnail} alt="daily deal" />
        </section>
        <section className="flex flex-col items-center gap-y-3">
          <span>{dailyDealProduct?.title}</span>
          <span className="flex">{renderStars(dailyDealProduct?.totalRatings)}</span>
          {dailyDealProduct && <span>{`${formatCash(roundCash(dailyDealProduct?.price))} VND`}</span>}
        </section>

        <section className="flex justify-evenly items-center gap-2">
          <CountDown unit={"hours"} number={hours} />
          <CountDown unit={"minutes"} number={minutes} />
          <CountDown unit={"seconds"} number={seconds} />
        </section>

        <section className="flex items-center justify-center gap-x-2 bg-main hover:bg-black cursor-pointer p-2">
          <FiMenu color="white" />
          <button type="button" className=" text-white">
            OPTIONS
          </button>
        </section>
      </main>
    </div>
  );
};

export default memo(DealDaily);
