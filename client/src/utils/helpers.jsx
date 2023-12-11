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
  starNumber = Math.round(starNumber);
  for (let i = 0; i < +starNumber; i++) stars.push(<AiFillStar key={crypto.randomUUID()} color="orange" />);
  for (let j = 5; j > +starNumber; j--) stars.push(<AiOutlineStar key={crypto.randomUUID()} color="orange" />);
  return stars;
};

export const formatCash = (number) => Number(number?.toFixed(1)).toLocaleString();

export const roundCash = (number) => Math.round(number / 1000) * 1000;

export const secondsToMs = (d) => {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
};

export const validate = (payLoad, setInvalidFields) => {
  let invalidFields = 0;
  const formatedPayload = Object.entries(payLoad);
  for (let arr of formatedPayload) {
    if (arr[1].trim() === "") {
      invalidFields++;
      setInvalidFields((prev) => [...prev, { name: arr[0], msg: "This field is required" }]);
    }
  }

  for (let arr of formatedPayload) {
    switch (arr[0]) {
      case "email":
        const regexEmail = /^\S+@\S+\.\S+$/;
        if (!arr[1].match(regexEmail)) {
          invalidFields++;
          setInvalidFields((prev) => [...prev, { name: arr[0], msg: "Invalid Email" }]);
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          invalidFields++;
          setInvalidFields((prev) => [...prev, { name: arr[0], msg: "Password need to be greater than 6 characters" }]);
        }
        break;

      default:
        break;
    }
  }
  return invalidFields;
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
