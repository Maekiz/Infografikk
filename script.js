const url = "https://data.ssb.no/api/v0/no/table/07849/";

const numberElement = document.getElementById("car-number");

const payload = {
  query: [
    {
      code: "Region",
      selection: {
        filter: "vs:Landet",
        values: ["0"],
      },
    },
    {
      code: "DrivstoffType",
      selection: {
        filter: "item",
        values: ["5"],
      },
    },
    {
      code: "ContentsCode",
      selection: {
        filter: "item",
        values: ["Personbil1"],
      },
    },
  ],
  response: {
    format: "json-stat2",
  },
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`feil! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const dataArray = data.value;
    console.log(dataArray);
  })
  .catch((error) => {
    console.error("Feil ved henting av data:", error);
  });
