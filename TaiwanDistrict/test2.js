fetch(`https://api.opencube.tw/twzipcode`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        const wholeData = data;
        const zipCodes = {};
        wholeData.data.forEach(item => {
            if (!zipCodes[item.city]) {
                zipCodes[item.city] = {};
            }
            zipCodes[item.city][item.district] = item.zip_code;
        })
        console.log(zipCodes);
    })
    .catch(error => console.error(error));