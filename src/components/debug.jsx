import React from "react";

function Debug() {
  const token = localStorage.getItem("authToken"); // make sure 'token' is the correct key
  const apiUrl = "/api/api/Admin/GetOPDOutstanding";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      CompName: "glob",
      AuthPswd: "5AA37B2E90AF6EA983D2C68B330809BE",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Response:", data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  return <div></div>;
}

export default Debug;
