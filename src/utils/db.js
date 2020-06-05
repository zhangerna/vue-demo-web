
export function formatNumber(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

export function rotateImage(link, type, cb) {
    if(link && link !== ''){
        let image = new Image();
        image.src = link;
        image.onload = function () {
            let rate = image.height / image.width;
            if(image.width < image.height){
                cb(1,type,rate)
            }else{
                cb(0,type,rate)
            }
        };
    }
}

export function findIndex(data, data2, type) {
    let obj = {};
    data.map((item, index) => {
        if (type == "country" && item.countryId == data2) {
            obj = {index, item};
        } else if (type == "provice" && item.provicesId == data2) {
            obj = {index, item};
        } else if (type == "city" && item.cityId == data2) {
            obj = {index, item};
        } else if (type == "area" && item.areaId == data2) {
            obj = {index, item};
        }
    });
    return obj;
}

export function checkNull(data) {
    return data ? data : 0;
}

// <!-- syn  综合-->
// <!--2-高速行驶时长 >60-->
// <!--3-低速行驶时长 <30-->
// <!--8-颠簸次数-->
// <!--9-中速行驶时长-->
// <!--10-怠速-->
// <!--11-匀速时长-->
// <!--12-加速次数-->
// <!--13-减速次数-->
// <!--14-直行时长-->
// <!--15-转向次数-->
// <!--16-平稳行驶时长-->
export function driveType2content() {
    return {
        "1": "m.report.start_before",
        "2": "m.report.more60",
        "3": "m.report.cut30",
        "4": "m.report.acc_time",
        "5": "m.report.brake",
        "6": "m.report.turn_time",
        "7": "m.report.pong",
        "8": "m.report.pong",
        "9": "m.report.milege30",
        "10": "m.report.static",
        "11": "m.report.content_speed",
        "12": "m.report.acceleration",
        "13": "m.report.brake",
        "14": "m.report.straight",
        "15": "m.report.turnCard",
        "16": "m.report.normal_speed"
    }
}
