import fetch from "node-fetch";

export const isAdminOrNot = (email) => {
  return fetch("http://localhost:8000/admin", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      email,
    },
  })
    .then((res) => res.json())
    .then((status) => {
      return status;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
