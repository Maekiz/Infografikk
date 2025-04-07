const url = "https://data.ssb.no/api/v0/no/table/07849/";
const url2 = "https://data.ssb.no/api/v0/no/table/14020/";

const numberElement = document.getElementById("car-number");

const ctx = document.getElementById("myChart");

const ctx2 = document.getElementById("secondChart");

function calculatePresentage(fromNumber, toNumber) {
  const sum = toNumber - fromNumber;
  const preentage = (sum / toNumber) * 100;
  const total = Math.round(preentage, 0);
  console.log(total);
}

const query = {
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

const query2 = {
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
async function fetcData() {
  try {
    const response1 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const data1 = await response1.json();
    console.log(data1);
    const dataArray = data1.value;
    console.log(dataArray);

    // Sjekk lengden på dataArray før vi prøver å få tilgang til det
    if (dataArray.length > 15) {
      const lastvalue = dataArray[15];
      const secondlastvalue = dataArray[14];
      animation(lastvalue);
      numberElement.innerHTML = lastvalue;
      calculatePresentage(secondlastvalue, lastvalue);
    } else {
      console.warn("dataArray har ikke nok elementer");
    }

    const yearObject = data1.dimension.Tid.category.label;
    const yearArray = Object.values(yearObject);

    const labels = yearArray;

    const myData = {
      labels: labels,
      datasets: [
        {
          label: "Elektriske personbiler i Norge",
          data: dataArray.map((d) => parseFloat(d)), // Sørg for at dataArray har tall
          fill: false,
          borderColor: "#528C62",
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
  } catch (error) {
    console.log(error);
  }
}

async function fetcData2() {
  const response2 = await fetch(url2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query2),
  });
  const data2 = await response2.json();
  const dataArray = data2.value;
  console.log(dataArray);

  // Sjekk lengden på dataArray før vi prøver å få tilgang til det
  if (dataArray.length > 15) {
  } else {
    console.warn("dataArray har ikke nok elementer");
  }

  const monthObject = data2.dimension.Tid.category.label;
  const monthArray = Object.values(monthObject);
  console.log(dataArray);
  console.log(monthArray);

  const labels = monthArray;
  let la = ["2020: januar", "2020: februar"];
  const myData = {
    labels: labels,
    datasets: [
      {
        label: "Førstegangsregistrerte elektriske personbiler månedlig",
        data: dataArray.map((d) => parseFloat(d)), // Sørg for at dataArray har tall
        fill: false,
        borderColor: "#528C62",
        tension: 0.1,
      },
    ],
  };

  // Sjekk om ctx ikke er null
  if (ctx) {
    new Chart(ctx2, {
      type: "line",
      data: myData,
    });
  } else {
    console.error("Canvas elementet ble ikke funnet.");
  }
}

fetcData();
fetcData2();

async function animation(num) {
  for (let i = num - 250; i < num; i++) {
    numberElement.innerHTML = i;
    await delay(0.0000000001);
  }
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
Chart.defaults.font.size = 16;
