import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CountDown } from "..";
import { apiGetProducts } from "../../api";
import withBaseComponent from "../../hocs/withBaseComponent";
import { getDealDaily } from "../../store/product/productSlice";
import { formatCash, renderStars, roundCash, secondsToMs } from "../../utils/helpers";
import icons from "../../utils/icons";
const DealDaily = ({ dispatch }) => {
  const { AiFillStar, FiMenu } = icons;

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isExpiredTime, setIsExpiredTime] = useState(false);
  const { dealDaily } = useSelector((state) => state.products);

  let idInterval;

  const fetchDailyDeal = async () => {
    const response = await apiGetProducts({
      limit: 20,
      sort: "-totalRatings",
    });
    if (response.success === true) {
      const pr = response.data[Math.round(Math.random() * 20)];

      dispatch(getDealDaily({ data: pr, time: Date.now() + 24 * 60 * 60 * 1000 }));

      // const today = `${moment().format("MM/DD/YYYY")} 0:00:00`;
      // const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      // const number = secondsToMs(seconds);
      // setHours(number.h);
      // setMinutes(number.m);
      // setSeconds(number.s);
      // } else {
      //   setHours(0);
      //   setMinutes(59);
      //   setSeconds(59);
    }
  };
  useEffect(() => {
    if (dealDaily?.time) {
      const remainingTime = dealDaily.time - Date.now();
      const number = secondsToMs(remainingTime);
      setHours(number.h);
      setMinutes(number.m);
      setSeconds(number.s);
    }
  }, [dealDaily]);
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    if (moment(moment(dealDaily?.time).format("MM/DD/YYYY")).isBefore(moment())) fetchDailyDeal();
  }, [isExpiredTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) setSeconds((prev) => prev - 1);
      else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setIsExpiredTime(!isExpiredTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [hours, minutes, seconds, isExpiredTime]);
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
          <img className="w-full object-contain" src={dealDaily?.data.thumbnail} alt="daily deal" />
        </section>
        <section className="flex flex-col items-center gap-y-3">
          <span>{dealDaily?.data.title}</span>
          <span className="flex">{renderStars(dealDaily?.data.totalRatings)}</span>
          {dealDaily && <span>{`${formatCash(roundCash(dealDaily?.data.price))} VND`}</span>}
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
export default withBaseComponent(memo(DealDaily));
