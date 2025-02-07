const url = "https://data.ssb.no/api/v0/no/table/07849/";

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
      const lastvalue = dataArray[15];
      const secondlastvalue = dataArray[14];
      animation(lastvalue)
      numberElement.innerHTML = lastvalue;
      calculatePresentage(secondlastvalue, lastvalue);
    } else {
      console.warn("dataArray har ikke nok elementer");
    }

    const yearObject = data.dimension.Tid.category.label;
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
  })
  .catch((error) => {
    console.error("Feil ved henting av data:", error);
  });


async function animation(num) {
  for (let i=num-250; i <num; i++){
    numberElement.innerHTML = i
    await delay(0.0000000001)
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

Chart.defaults.font.size = 16;