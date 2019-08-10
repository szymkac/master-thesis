class DeviceData {
    constructor(dataString) {
        const splited = dataString.split(',');

        if (splited.length === 16) {
            this.valid = true;
            this.f = [
                Number(splited[0]),
                Number(splited[1]),
                Number(splited[2]),
                Number(splited[3]),
                Number(splited[4]),
                Number(splited[5])
            ];
            this.fl = parseInt(splited[6]);
            this.a = [
                Number(splited[7]),
                Number(splited[8]),
                Number(splited[9])
            ];
            this.g = [
                Number(splited[10]),
                Number(splited[11]),
                Number(splited[12])
            ];
            this.m = [
                Number(splited[13]),
                Number(splited[14]),
                Number(splited[15])
            ];
        }
        else
            this.valid = false;
    }
}

export default DeviceData;