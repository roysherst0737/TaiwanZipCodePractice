fetch(`https://api.opencube.tw/twzipcode`, { method: 'GET'})
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

        // 目的：讓下拉式選單顯示縣市並賦值
        // 做法：定義一個叫做city的常數，並用迴圈抓cities給city，再create一個option,將city的值賦給option
        const citySelect = document.getElementById('city-select');
        for (const city in cities) {
            const option = document.createElement('option');
            option.value = city;
            option.innerText = city;
            citySelect.appendChild(option);
        }

        // 目的：讓下拉式選單顯示行政區並賦值
        // 做法：選擇縣市後，定義一個叫做district的常數，並用迴圈抓cities[selectedCity]給district，再create一個option,將district的值賦給option
        const districtSelect = document.getElementById('district-select');
        const zipCodeInput = document.getElementById('zip-code-input');
        citySelect.addEventListener('change', () => {
            const selectedCity = citySelect.value;
            districtSelect.innerHTML = '';
            for (const district of cities[selectedCity]) {
                const option = document.createElement('option');
                option.value = district;
                option.innerText = district;
                districtSelect.appendChild(option);
            }
            const selectedDistrict = districtSelect.value;
            if (selectedCity && selectedDistrict) {
                zipCodeInput.value = zipCodes[selectedCity][selectedDistrict];
                zipCodeInput.disabled = false;
            } else {
                alert('請選擇縣市及行政區');
            }
        });

        // 目的：行政區選擇後，直接顯示郵遞區號
        // 做法：選完行政區之後，二元陣列找對應的郵遞區號
        districtSelect.addEventListener('change', () => {
            const selectedCity = citySelect.value;
            const selectedDistrict = districtSelect.value;
            if (selectedCity && selectedDistrict) {
                zipCodeInput.value = zipCodes[selectedCity][selectedDistrict];
                zipCodeInput.disabled = false;
            } else {
                alert('請選擇縣市及行政區');
            }
        });

        // 郵遞區號輸入後，直接顯示對應的行政區
        // 做法：兩個迴圈確認縣市&行政區後，若那個郵遞區號有對應到正確的縣市&行政區就顯示出來，沒有就跳alert
        zipCodeInput.addEventListener('change', () => {
            const enteredZipCode = zipCodeInput.value;
            let found = false;
            for (const city in zipCodes) {
                for (const district in zipCodes[city]) {
                    if (zipCodes[city][district] === enteredZipCode) {
                        citySelect.value = city;
                        districtSelect.innerHTML = '';
                        for (const districtOption of cities[city]) {
                            const option = document.createElement('option');
                            option.value = districtOption;
                            option.innerText = districtOption;
                            districtSelect.appendChild(option);
                        }
                        districtSelect.value = district;
                        zipCodeInput.disabled = false;
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            if (!found) {
                alert('郵遞區號錯誤，請重新輸入');
            }
        });

        // 按下Input按鈕後跳出alert顯市所選資料
        const alertButton = document.getElementById('input');
        alertButton.addEventListener('click', () => {
            if (citySelect.value && districtSelect.value && zipCodeInput.value) {
                alert(['縣市:「' + citySelect.value + '」', ' 行政區:「' + districtSelect.value + '」', ' 郵遞區號:「' + zipCodeInput.value + '」']);
            } else {
                alert('請選擇縣市及行政區，或直接輸入郵遞區號');
            }
        })
    })
    .catch(error => console.error(error));