const url = "https://data.ssb.no/api/v0/no/table/14020/";

const numberElement = document.getElementById("car-number");

const ctx = document.getElementById("myChart");

function calculatePresentage(fromNumber, toNumber) {
  const sum = toNumber - fromNumber;
  const preentage = (sum / toNumber) * 100;
  const total = Math.round(preentage, 0);
  console.log(total);
}

const query = {
  query: [
    {
      code: "TypeRegistrering",
      selection: {
        filter: "item",
        values: ["N"],
      },
    },
    {
      code: "DrivstoffType",
      selection: {
        filter: "item",
        values: ["19"],
      },
    },
    {
      code: "ContentsCode",
      selection: {
        filter: "item",
        values: ["Personbiler"],
      },
    },
    {
      code: "Tid",
      selection: {
        filter: "item",
        values: [
          "2020M01",
          "2020M02",
          "2020M03",
          "2020M04",
          "2020M05",
          "2020M06",
          "2020M07",
          "2020M08",
          "2020M09",
          "2020M10",
          "2020M11",
          "2020M12",
          "2021M01",
          "2021M02",
          "2021M03",
          "2021M04",
          "2021M05",
          "2021M06",
          "2021M07",
          "2021M08",
          "2021M09",
          "2021M10",
          "2021M11",
          "2021M12",
          "2022M01",
          "2022M02",
          "2022M03",
          "2022M04",
          "2022M05",
          "2022M06",
          "2022M07",
          "2022M08",
          "2022M09",
          "2022M10",
          "2022M11",
          "2022M12",
          "2023M01",
          "2023M02",
          "2023M03",
          "2023M04",
          "2023M05",
          "2023M06",
          "2023M07",
          "2023M08",
          "2023M09",
          "2023M10",
          "2023M11",
          "2023M12",
          "2024M01",
          "2024M02",
          "2024M03",
          "2024M04",
          "2024M05",
          "2024M06",
          "2024M07",
          "2024M08",
          "2024M09",
          "2024M10",
          "2024M11",
          "2024M12",
        ],
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
  body: JSON.stringify(query),
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

    // Sjekk lengden på dataArray før vi prøver å få tilgang til det
    if (dataArray.length > 15) {
    } else {
      console.warn("dataArray har ikke nok elementer");
    }

    const monthObject = data.dimension.Tid.category.label;
    const monthArray = Object.values(monthObject);

    i = 0;
    while (i <= dataArray.length - 1) {
      if (i % 3 !== 0) {
        dataArray.splice(i, 1);
        monthArray.splice(i, 1);
      }
      i++;
    }
    console.log(dataArray);
    console.log(monthArray);

    const labels = monthArray;

    const myData = {
      labels: labels,
      datasets: [
        {
          label: "Nyregistrerte elektriske personbiler i Norge",
          data: dataArray.map((d) => parseFloat(d)), // Sørg for at dataArray har tall
          fill: false,
          borderColor: "rgb(51, 187, 85)",
          tension: 0.1,
        },
      ],
    };

    // Sjekk om ctx ikke er null
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: myData,
      });
    } else {
      console.error("Canvas elementet ble ikke funnet.");
    }
  })
  .catch((error) => {
    console.error("Feil ved henting av data:", error);
  });
