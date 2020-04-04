const axios = require("axios").default;
require("bootstrap");
require("typeface-asap");

const kasusTotalDom = document.getElementById("kasus-total");
const kasusSembuhDom = document.getElementById("kasus-sembuh");
const kasusMeninggalDom = document.getElementById("kasus-meninggal");
const lastUpdateDom = document.getElementById("last-update");

const fillKasusData = (
  total = "----",
  sembuh = "----",
  meninggal = "----",
  lastUpdate = "----"
) => {
  kasusTotalDom.innerHTML = total;
  kasusSembuhDom.innerHTML = sembuh;
  kasusMeninggalDom.innerHTML = meninggal;
  lastUpdateDom.innerHTML = lastUpdate;
};

fillKasusData();
axios
  .get("https://kawalcovid19.harippe.id/api/summary")
  .then(res => res.data)
  .then(data => {
    fillKasusData(
      data.confirmed.value,
      data.recovered.value,
      data.deaths.value,
      new Date(data.metadata.lastUpdatedAt).toLocaleDateString()
    );
  })
  .catch(err => fillKasusData());
