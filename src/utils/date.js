/**
 * 时间戳转换为年月日时分秒日期字符串
 * @param time
 * @returns {string}
 */
export function getDateString(time) {
    var date = new Date(time);
    var Y = date.getFullYear() + ' ';
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
    return  M + '/' + D + '/' + Y + ' ' + h +':'+ m;
}


export function getDateStringWeek(time) {
    var date = new Date(time);
    var Y = date.getFullYear() + ' ';
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
    var k= "周" +"日一二三四五六".charAt(date.getDay());
    return M + '/' + D + '/' + Y + k ;
}
export function getDateStringEnglish(time) {
    var date = new Date(time);
    var Y = date.getFullYear() + ' ';
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
    var k= "周" +"日一二三四五六".charAt(date.getDay());
    return  Y + '/' + M + '/' + D + ' ' + h +':'+ m;
}

export function getDateStringChinese(time) {
    var date = new Date(time);
    var Y = date.getFullYear() + ' ';
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
    return  Y + '年' + M + '月' + D + '日 ' +  h +':'+ m;
}

/**
 * 时间戳转换为年月日字符串
 * @param time
 * @returns {string}
 */
export function getYMDString(time) {
    var date = new Date(time);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate(): date.getDate();
    return Y + '-' + M + '-' + D;
}

/**
 * 将日期字符串转换为时间戳
 * @param strtime
 * @returns {number}
 */
export function convertDateToTime(strtime) {
    // strtime.replace(/-/g, '/')
    var date = new Date(strtime);
    return date.getTime();
}

/**
 * 获取两个日期之间的天数
 * @param time1
 * @param time2
 * @returns {number}
 */
export function getDaysBetweenDate(time1, time2) {

    return Math.ceil( (time2 - time1) / 1000 / 3600 / 24)
}


export function getYMDFormart(date) {
    let dt = new Date(date);
    let m=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec");
    let w=new Array("Sun","Mon","Tus","Wed","Thu","Fri","Sat");
    let mn=dt.getMonth();
    let wn=dt.getDay();
    let dn=dt.getDate();
    return w[wn]+" , "+m[mn]+" "+dn+" , "+dt.getFullYear();
}

export function formatIdDate(str){
    if(str.length === 8){  //8位数的转换
        let a = str.slice(0,4);
        let b = str.slice(4,6);
        let c = str.slice(6,8);
        return a+'/'+b+'/'+c
    }else if(str.length === 17){  //带有区间的17位数的转换
        let a = str.slice(0,4);
        let b = str.slice(4,6);
        let c = str.slice(6,8);
        let d = str.slice(9,13);
        let e = str.slice(13,15);
        let f = str.slice(15,17);
        return a+'/'+b+'/'+c+' - '+d+'/'+e+'/'+f
    }
}


export function formatUserBirthDate(str,self){ //出生日期的转换，格式：1994年08月12日
    if(str.length === 8){
        let a = str.slice(0,4);
        let b = str.slice(4,6);
        let c = str.slice(6,8);
        return a+ self.$t('m.report.year')+b+self.$t('m.report.month')+c+self.$t('m.report.day')
    }
}

export function formatUserIdcardExpireDate(str){ //身份证有限期的转换，格式：2010.08.09-2020.08.09
    if(str.length === 17){
        let a = str.slice(0,4);
        let b = str.slice(4,6);
        let c = str.slice(6,8);
        let d = str.slice(9,13);
        let e = str.slice(13,15);
        let f = str.slice(15,17);
        return a+'.'+b+'.'+c+' - '+d+'.'+e+'.'+f
    }
}

export function formatUserLicenseBirthDate(str){ //驾照上出生日期的转换，格式：1994-08-12
    if(str.length === 8){
        let a = str.slice(0,4);
        let b = str.slice(4,6);
        let c = str.slice(6,8);
        return a+'-'+b+'-'+c
    }
}


export function formatUserLicenseExpireDate(str,self){ //驾照上有限期的转换，格式：2010-08-09 至 2020-08-09
    if(str.length === 16){
        let a = str.slice(0,4);
        let b = str.slice(4,6);
        let c = str.slice(6,8);
        let d = str.slice(8,12);
        let e = str.slice(12,14);
        let f = str.slice(14,16);
        return a+'-'+b+'-'+c+ self.$t('m.cloud.to') +d+'-'+e+'-'+f
    }
}

export function calAge(birthday) {
    let birYear = birthday.slice(0, 4);
    let year = new Date().getFullYear();
    return year - birYear;
}


export function calDriveAge(date) {
    let d1 = new Date(date.slice(0, 4), date.slice(4, 5), date.slice(5, 6)).getTime();
    let d2 = new Date().getTime();
    let diff = d2 - d1;
    let year = Math.floor(diff / ( 24 * 3600 * 1000 * 365 ) );
    let month = Math.floor(diff - year / ( 1000 * 3600 * 24 * 30 )) % 12;
    return {
        year: year,
        month: month
    }
}

export function getDateString2(time) {
    let date = new Date(time);
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    return  M + '/' + D + '/' + Y;
}

export function timeInspect(time1, time2) {
    var date1 = new Date(time1);
    var Y1 = date1.getFullYear() + ' ';
    var M1 = (date1.getMonth() + 1 < 10 ? '0'+(date1.getMonth()+1) : date1.getMonth()+1);
    var D1 = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate() ;
    var h1 = date1.getHours() < 10 ? '0' + date1.getHours() : date1.getHours() ;
    var m1 = date1.getMinutes() < 10 ? '0' + date1.getMinutes()  : date1.getMinutes();

    var date2 = new Date(time2);
    var Y2 = date2.getFullYear() + ' ';
    var M2 = (date2.getMonth() + 1 < 10 ? '0'+(date2.getMonth()+1) : date2.getMonth()+1);
    var D2 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate() ;
    var h2 = date2.getHours() < 10 ? '0' + date2.getHours() : date2.getHours() ;
    var m2 = date2.getMinutes() < 10 ? '0' + date2.getMinutes()  : date2.getMinutes();
    return  `${h1}:${m1}~${h2}:${m2}`
}

export function getDateString3(time) {
    var date = new Date(time);
    var Y = date.getFullYear() + ' ';
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds()  : date.getSeconds();
    return  h +':'+ m + ':' + s;
}

export function getDateString4(time) {
    var date = new Date(time);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds()  : date.getSeconds();
    return  Y + '/' + M + '/' + D + '  ' +  h +':'+ m;
}

export function getMinutesBetween(seconds) {
    return (seconds / 60 / 1000).toFixed(0)
}

export function filterCardTime(time) {
    let y = time.slice(0,4);
    let m = time.slice(4, 6);
    let d = time.slice(6, 8);
    return `${y}/${m}/${d}`;
}
