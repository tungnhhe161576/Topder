import moment from "moment";

export const getRegexEmail = () => {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return re;
};

export const getRegexPassowrd = () => {
  const re = /^(?=.*[A-Z])(?=.*[a-z])(?!(.*\d.*\d))[A-Za-z\d]{6}$/;
  return re;
};

export const getRegexPhoneNumber = () => {
  const phoneRegex = /^(0|\+?\d{1,3})\d{9,10}$/;

  return phoneRegex;
};

export function getRegexNumber() {
  const re = /^[0-9]+$/;
  return re;
}

export const getRegexDOB = (dateString) => {
  return moment(dateString, "DD/MM/YYYY", true).isValid();
};

export const formatNumberToK = (number) => {
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(+number);

  return formattedAmount;
};

export const formatNumber = (number) => {
  var formattedNumber = number.toLocaleString("en-US").replace(/,/g, ".");
  return formattedNumber;
};

export const randomNumber = () => {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};
