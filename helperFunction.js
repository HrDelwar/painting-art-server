import fetch from "node-fetch";

export const isAdminOrNot = (email) => {
  return fetch("https://arcane-beach-78410.herokuapp.com/admin", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      email,
    },
  })
    .then((res) => res.json())
    .then((status) => {
      console.log("status", status);
      return status;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
