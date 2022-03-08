
console.log("Last Update:",getCurrentTimeStamp());
const fetchLink =
  "https://api.covid19api.com/live/country/germany/status/confirmed/date/" +
  getCurrentTimeStamp();
class Request {
  constructor() {}
  async getActualCases() {
    const response = await fetch(fetchLink);
    const data = await response.json();
    return data;
  }
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function getCurrentTimeStamp() {
    const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()-1}T23:59:59Z`;
}
const request = new Request();
request
  .getActualCases()
  .then((response) => getCasesAndProvinces(response))
  .catch((err) => console.error(err));
const getCasesAndProvinces = (cases) => {
  cases
    .sort((a, b) => b.Confirmed - a.Confirmed)
    .map((caseAndProvince) => {
      console.log(
        `${caseAndProvince.Province} => ${formatNumber(
          caseAndProvince.Confirmed
        )}`
      );
    });
};

