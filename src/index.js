const axios = require("axios").default;
require("bootstrap");
require("typeface-asap");

const kasusTotalDom = document.getElementById("kasus-total");
const kasusSembuhDom = document.getElementById("kasus-sembuh");
const kasusMeninggalDom = document.getElementById("kasus-meninggal");
const lastUpdateDom = document.getElementById("last-update");

const fillKasusData = (
  data,
  wilayah
) => {
  const odp = data[`odp_${wilayah}`] || '---';
  const pdp = data[`pdp_${wilayah}`] || '---';
  const positif = data[`positif_${wilayah}`] || '---';
  const mati = data[`mati_${wilayah}`] || '---';

  if (wilayah !== 'nasional') {
    document.getElementById(`kasus-odp-${wilayah}`).innerHTML = odp;
    document.getElementById(`kasus-pdp-${wilayah}`).innerHTML = pdp;
  }
  document.getElementById(`kasus-positif-${wilayah}`).innerHTML = positif;
  document.getElementById(`kasus-mati-${wilayah}`).innerHTML = mati;
};

const fillDefaultKasusData = () => {
  // default value
  fillKasusData({},'kota');
  fillKasusData({},'kab');
  fillKasusData({},'jabar');
  fillKasusData({},'nasional');
}

axios
  .get("https://api-covid-cirebon.now.sh")
  .then(res => res.data[0])
  .then(data => {
    fillKasusData(data,'kota');
    fillKasusData(data,'kab');
    fillKasusData(data,'jabar');
    fillKasusData(data,'nasional');

    document.getElementById(`last-update`).innerHTML = new Date(data.last_updated).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  })
  .catch(err => fillDefaultKasusData());
