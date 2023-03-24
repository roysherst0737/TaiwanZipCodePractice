// 定義各行政區的郵遞區號
const findZipCodes = async () => {
  try {
    const response = await fetch(`https://api.opencube.tw/twzipcode`, { method: 'GET' });
    const data = await response.json();
    const wholeData = data;
    const zipCodes = {};
    wholeData.data.forEach(item => {
      if (!zipCodes[item.city]) {
        zipCodes[item.city] = {};
      }
      zipCodes[item.city][item.district] = item.zip_code;
    });
    return zipCodes;
  } catch (error) {
    console.error(error);
  }
};

// 定義城市中的行政區
const findDistricts = async () => {
  try {
    const response = await fetch(`https://api.opencube.tw/twzipcode`, { method: 'GET' });
    const data = await response.json();
    const wholeData = data;
    const cities = wholeData.data.reduce((result, current) => {
      if (!result[current.city]) {
        result[current.city] = [];
      }
      result[current.city].push(current.district);
      return result;
    }, {});
    return cities;
  } catch (error) {
    console.error(error);
  }
};

// 使用 async/await 等待 Promise 解析後再執行
const getZipCodesAndCities = async () => {
  const zipCodes = await findZipCodes();
  const cities = await findDistricts();
  console.log(zipCodes, cities);
};

const wow = getZipCodesAndCities();

console.log(wow);
