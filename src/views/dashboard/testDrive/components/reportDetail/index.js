import VueI18n from 'vue-i18n';
import { getDateString3 } from "@/utils/date";

const i18n = new VueI18n({
    locale: process.env.VUE_APP_ENV == 'en' ? (localStorage.getItem('lang') || 'en-US') : 'zh-CN',
    messages: {
        'zh-CN': require('@/lang/zh'),
        'en-US': require('@/lang/en'),
    }
});

const emotion = {
    tooltip: {
        trigger: 'item',
        formatter: (data) => {
            return `${data.data.value}%`;
        },
    },
    legend: {
        y: "20px",
        textStyle: {
            fontSize: "12",
            color:["#000000"],
        },
        data:[i18n.t('m.report.happy'), i18n.t('m.report.normal_happy'), i18n.t('m.report.no_happy')]
    },
    series : [
        {
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value: 0, name: i18n.t('m.report.happy')},
                {value: 0, name: i18n.t('m.report.no_happy')},
                {value: 0, name: i18n.t('m.report.normal_happy')},

            ],
            color: ['#4dbd74', '#f86c6b', '#ffc107']
        }
    ]
};
const speed = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        show: true,
        data: [],
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        show: true,
        name: '',
        min: 0,
        max: 100,
        interval: 50,
        axisLabel: {
            show: false
        }
    },
    series: {
        yAxisIndex: 0,
        type: "line",
        smooth: true,
        itemStyle: {
            normal: {
                opacity: 0,
                color: "#3b5998",
                label: {
                    show: false
                }
            }
        },
        data: [],
        animation: true,
        symbol: "none",
        name: i18n.t('m.report.speed'),
        markArea: {
            data: [
            ]
        },
        markLine: {
            symbol: 'none',
            data: [
            ]
        }
    },
    grid: {
        x: 30,
        y: 40,
        x2: 20,
        y2: 80
    }
};
const accele = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        show: true,
        data: [],
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        show: true,
        name: '',
        min: -10,
        max: 10,
        interval: 10,
        axisLabel: {
            show: false
        }
    },
    series: {
        yAxisIndex: 0,
        type: "line",
        smooth: true,
        itemStyle: {
            normal: {
                opacity: 0,
                color: "#3b5998",
                label: {
                    show: false
                }
            }
        },
        data: [],
        animation: true,
        symbol: "none",
        name: i18n.t('m.report.accele'),
        markArea: {
            data: [
            ]
        },
        markLine: {
            symbol: 'none',
            data: [
            ]
        }
    },
    grid: {
        x: 30,
        y: 40,
        x2: 20,
        y2: 80
    }
};
const turns = {
    tooltip: {
        trigger: 'axis',
        formatter: (data) => {
            return data[0].axisValue + "<br />" + `${data[0].data > 0 ? i18n.t('m.report.leftStatus') : i18n.t('m.report.rightStatus')}`
        }
    },
    xAxis: {
        show: true,
        data: [],
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        show: true,
        name: '',
        min: -2,
        max: 2,
        interval: 2,
        axisLabel: {
            show:false
        }
    },
    series: {
        yAxisIndex: 0,
        type: "line",
        smooth: true,
        itemStyle: {
            normal: {
                opacity: 0,
                color: "#3b5998",
                lineStyle: {
                    width: 1
                },
                label: {
                    show: false
                }
            }
        },
        data: [],
        animation: true,
        symbol: "none",
        name: i18n.t('m.report.turnCard'),
        markArea: {
            data: [
            ]
        },
        markLine: {
            symbol: 'none',
            data: [
            ]
        }
    },
    grid: {
        x: 30,
        y: 40,
        x2: 20,
        y2: 80
    }
};
const pong = {
    tooltip: {
        trigger: 'axis',
        formatter: (data) => {
            return data[0].axisValue + "<br />" + "--"
        }
    },
    xAxis: {
        show: true,
        data: [],
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    yAxis: [
        {
            type: 'value',
            show: true,
            name: '',
            min: 10,
            max: 30,
            interval: 10,
            axisLabel: {
                show: false
            }
        }
    ],
    series: {
        yAxisIndex: 0,
        type: "line",
        smooth: true,
        lineStyle: {
            width: 0,
            color: 'rgba(0, 0, 0, 0)'
        },
        itemStyle: {
            normal: {
                opacity: 0,
                color: "#ccc",
                label: {
                    show: false
                }
            }
        },
        data: [],
        animation: true,
        symbol: "none",
        name: i18n.t('m.report.break'),
        markArea: {
            data: [
            ]
        },
        markLine: {
            symbol: 'none',
            data: [
            ]
        },
        markPoint: {
            symbol: 'circle',
            symbolSize: 14,
            itemStyle: {
                normal: {
                    color: 'red',
                    opacity: 0.8,
                    label: {
                        show: false
                    }
                }
            },
            data: [
            ]

        }
    },
    grid: {
        x: 24,
        y: 40,
        x2: 20,
        y2: 80
    }
};
const emotionStatus = {
    "0": "--",
    "10": i18n.t('m.report.emotion10'),
    "20": i18n.t('m.report.emotion20'),
    "30": i18n.t('m.report.emotion30')
};

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

let insertTable = (type, arrList, data) => {
    let speedTable = {
        "head": ['m.report.static', 'm.report.cut30', 'm.report.milege30', 'm.report.more60'],
    };
    let accTable = {
        "head": ['m.report.content_speed', 'm.report.acceleration', 'm.report.brake', '']
    };
    let turnTable = {
        "head": ['m.report.straight', 'm.report.turnCard', '', '']
    };
    let pongTable = {
        "head": ['m.report.normal_speed', 'm.report.pong', '', '']
    };
    let temp = [];
    for (let index of arrList) {
        temp.push(index != 0 && data[index] ? data[index] : {});
    }
    console.log(temp);
    switch (type) {
        case 'speed':
            speedTable["body"] = temp;
            return speedTable;
        case 'acc':
            accTable["body"] = temp;
            return accTable;
        case 'turn':
            turnTable["body"] = temp;
            return turnTable;
        case 'pong':
            pongTable["body"] = temp;
            return pongTable;
        default:
            break;
    }
};

let initEmotion = (data, type, highSpeed) => {
    let emotionList =[];
    let area = [];
    let line = [];
    data.map(item => {
        emotionList.push(item.emotion);
        if (item.emotion == 10 || item.emotion == 0) {
            line.push([
                {
                    xAxis: item.emotionStartTime ? getDateString3(item.emotionStartTime) : 0,
                    yAxis: type == 'speed' ? Math.ceil(highSpeed/2) : 20,
                    itemStyle: {
                        color: "#fbdc7f",
                        width: 2
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: (data) => {
                            return (data.xAxis ? data.xAxis : data.data.xAxis ) + "<br />" + emotionStatus["10"]
                        }
                    }
                },
                {
                    yAxis: type == 'speed' ? Math.ceil(highSpeed/2) : 20,
                    xAxis:item.emotionEndTIme ? getDateString3(item.emotionEndTIme) : 0
                }
            ])
        } else {
            area.push([{
                value: item.emotion,
                xAxis: item.emotionStartTime ? getDateString3(item.emotionStartTime) : 0,
                temp: item.emotion,
                yAxis: type == 'speed' ? (item.emotion == 20 ? Math.ceil(highSpeed/2) : 0) : (item.emotion == 20 ? 20 : 0),
                itemStyle: {
                    color: item.emotion == 20  ? "#a2dab6" : (item.emotion == 30 ? "#f8b2b1" : "#fbdc7f")
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (data) => {
                        return getDateString3(item.emotionStartTime) + "<br />" + emotionStatus[data.value]
                    }
                }
            }, {
                tooltip: {
                    trigger: 'item',
                    formatter: function (data) {
                        return data.value
                    }
                },
                value: item.emotion,
                yAxis: type == 'speed' ? (item.emotion == 20 ? Math.ceil(highSpeed) : Math.ceil(highSpeed/2)) : (item.emotion == 20  ? 30 : 20),
                xAxis:item.emotionEndTIme ? getDateString3(item.emotionEndTIme) : 0

            }])
        }
    });
    return {
        emotionList,
        area,
        line
    }
};

// 试驾报告
export  {
    emotion,
    speed,
    accele,
    turns,
    pong,
    initEmotion,
    insertTable
}
