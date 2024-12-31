const fs = require('fs');
var jsonArrayMerchant;
var jsonArrayDungeonSports;
fs.readFile('merchant.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        jsonArrayMerchant = JSON.parse(data);
        fs.readFile('dungeonsports.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            try {
                jsonArrayDungeonSports = JSON.parse(data);
                const mergedArray = jsonArrayMerchant.concat(jsonArrayDungeonSports);
                const uniqueArray = mergedArray.filter((obj, index, self) =>
                    index === self.findIndex((t) => t.name === obj.name)
                  );
                const dataUniqueMerged = JSON.stringify(uniqueArray, null,2);
                fs.writeFile('merged.json', dataUniqueMerged, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('JSON data is saved.');
                }); 
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        });
    } catch (e) {
        console.error('Error parsing JSON:', e);
    }
});