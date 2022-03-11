let allData: any;


getAllData() {
const url = `assets/locations/locations.json`;
this.http.get(url).subscribe((response) => {
    allData = response;
}, err => {
    console.log(err);
})
}

getAllDataInternal() {
const url = `assets/locations/locations.json`;
return this.http.get(url);
}

getProvinces(): string[] {
return Object.keys(allData);
}

getDistricts(province: string): string[] {
try {
    const data = allData[province];
    return Object.keys(data);
} catch (error) {
    console.log(error);
    return [];
}
}

getSectors(province: string, district: string): string[] {
try {
    const data = allData[province][district];
    return Object.keys(data);
} catch (error) {
    console.log(error);
    return [];
}
}

getCells(province: string, district: string, sector: string): string[] {
try {
    const data = allData[province][district][sector];
    return Object.keys(data);
} catch (error) {
    console.log(error);
    return [];
}
}

getVillages(province: string, district: string, sector: string, cell: string): string[] {
try {
    const data = allData[province][district][sector][cell];
    return data
} catch (error) {
    console.log(error);
    return [];
}
}
