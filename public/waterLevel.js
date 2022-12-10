console.log("Welcome to waterlevel js");

// const waterLevelArr = [
// {
//   date: new Date().toLocaleDateString(),
//   time: new Date().toLocaleTimeString(),
//   waterLevel: 6,
//   status: "warning",
//   latitude: "16.23456 N",
//   longitude: "80.4567 E",
// },
// ];

waterLevelArr = [];

function createElementAndAssignAttributes(newEle, className = "", value = "") {
  const ele = document.createElement(newEle);
  if (className) ele.className = className;
  if (value) ele.innerHTML = value;

  return ele;
}

function appendChildInParent(parentEle, childEle) {
  parentEle.append(childEle);
}

// Create the fragment
let parentFrag = document.createDocumentFragment();

function addWaterLevelDetails(waterLevelReport) {
  waterLevelReport.forEach((obj, index) => {
    console.log(obj);
    console.log(index);
    const { date, time, waterLevel, status, latitude, longitude } = obj;
    // create new div parent for child
    const newParentDiv = createElementAndAssignAttributes(
      "div",
      `row row-margin ${index % 2 === 0 ? "even-row-color" : "odd-row-color"}`
    );

    const childFrag = document.createDocumentFragment();

    childFrag.appendChild(
      createElementAndAssignAttributes("div", `item`, date)
    );
    childFrag.appendChild(
      createElementAndAssignAttributes("div", `item`, time)
    );
    childFrag.appendChild(
      createElementAndAssignAttributes("div", `item`, waterLevel)
    );
    childFrag.appendChild(
      createElementAndAssignAttributes("div", `item`, status)
    );
    childFrag.appendChild(
      createElementAndAssignAttributes("div", `item`, latitude)
    );
    childFrag.appendChild(
      createElementAndAssignAttributes("div", `item`, longitude)
    );

    appendChildInParent(newParentDiv, childFrag);
    parentFrag.appendChild(newParentDiv);
  });
  const parentDiv = document.querySelector("#row-item");
  appendChildInParent(parentDiv, parentFrag);
}

function getDataFromServer(path) {
  if (!!window.EventSource) {
    console.log("Browser Support EventSource");

    let source = new EventSource(path);

    source.addEventListener(
      "message",
      function (e) {
        console.log("data", e.data);
        if (e.data !== "Welcome") {
          const waterLevelData = JSON.parse(e.data);
          console.log("waterLevelData", waterLevelData);
          addWaterLevelDetails(waterLevelData);
        }
      },
      false
    );

    source.addEventListener(
      "open",
      function (e) {
        console.log("Connected with Server");
        fetch(`http://localhost:3000/waterLevelDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            waterLevel: 4,
            status: "normal",
            latitude: "16.23456 N",
            longitude: "80.4567 E",
          }),
        });
      },
      false
    );

    source.addEventListener("error", function (e) {
      console.log("e.eventPhase", e.eventPhase);
      source.close();
    });
  } else {
    alert(
      "EventSource is not supported, Please run the application in Chrome. if fails in Chrome, kindly update Chrome Browser"
    );
  }
}

getDataFromServer(`waterLevelReports`);

// async function getWaterLevelReport() {
//   try {
//     const hostName = window.location.hostname;
//     console.log("host name is", hostName);

//     // let url =
//     //   hostName === "localhost"
//     //     ? `http://localhost:3000/waterLevelReports`
//     //     : `https://water-level-report.vercel.app/waterLevelReports`;

//     // const response = await fetch(url);
//     // let waterLevelReport = await response.json();
//     // console.log("waterLevelReport is ", waterLevelReport);
//     // await fetch(`http://localhost:3000//waterData`);
//   } catch (error) {
//     console.log("Error", error);
//   }
// }

// getWaterLevelReport();
