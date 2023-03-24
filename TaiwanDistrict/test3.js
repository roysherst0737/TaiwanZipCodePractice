fetch(`https://api.opencube.tw/twzipcode`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        
        const wholeDataForZipCodes = data;
        const zipCodes = {};
        wholeDataForZipCodes.data.forEach(item => {
            if (!zipCodes[item.city]) {
                zipCodes[item.city] = {};
            }
            zipCodes[item.city][item.district] = item.zip_code;
        })
        console.log(zipCodes);
        
        const wholeDataForDistricts = data;
        const cities = wholeDataForDistricts.data.reduce((result, current) => {
            if (!result[current.city]) {
              result[current.city] = [];
            }
            result[current.city].push(current.district);
            return result;
          }, {});
          
          console.log(cities);
    })
    .catch(error => console.error(error));