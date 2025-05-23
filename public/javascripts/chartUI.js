import { chartInfo } from "./dashboard.js";
import { NATIONAL_LABS } from "./constants.js";

const NATIONAL_LABS_ABBR = NATIONAL_LABS.map(obj => `${obj.abbreviation}`);
setInterval(chartInfo, 300000);

// console.log(NATIONAL_LABS_NAME);

  //#####################################  Highcharts JS ################################

const chartStyle = {
    fontSize : {
        xxxs: '0.8em',
        xxs: '1em',
        xs: '1.2em',
        sm: '1.4em',
        md: '1.6em',
        lg: '1.8rem'
    },
    creditSetting: false,
    backgroundColor: null,
    chartSize: {
        width: null,
        height: null,
        pieChartSize: '85%',
        donutChartHole: '45%',
        barChartSize: '85%',
    },
    textProperty: {
        textOutline: 'none',
        textShadow: '0.125em 0.125em 0.25em rgba(0,0,0,0.4)'
    },
    labelProperty: {
        labelDistance: '-30%'
    },
    borderRadius: {
        borderRadius_none: 'none',
        borderRadius_xs: 2.5,
        borderRadius_sm: 5,
        borderRadius_md: 10,
        borderRadius_lg: 15,
    },
    classificationColors: {
        senior: 'red',
        junior: 'green',
        sophomore: 'orange',
        freshman: 'purple'
    },
    shadow: true,
  
  }
  
  
  /*-----------------------Institution Type Chart--------------------------*/
  
  Highcharts.chart('institutionType', {
    chart: {
        type: 'pie',
        backgroundColor: chartStyle.backgroundColor,
        width: chartStyle.chartSize.width,
        height: chartStyle.chartSize.height
    },
    title: {
        text: 'Institution Type',
        style: {
            fontSize: chartStyle.fontSize.sm
        },
    },
    subtitle: {
        text: 'Each slice represents a <br/> minority support institution (MSI)',
        align:'center',
        style: {
            fontSize: chartStyle.fontSize.xxs,
        },
        floating: false
    },
    tooltip: {
        headerFormat: '<b><span style="font-size:12px">{series.name}</span></b><br/>',
        pointFormat: '<span style="color:{point.color}">{point.name2}</span>: <br/>' +
            '<b>{point.percentage:.2f}%</b> of total<br/>',
        backgroundColor: 'rgba(0, 0, 0, .75)',
        borderWidth: 2,
        style: {
            color: '#CCCCCC'
        }
        
    },
    credits: {
        enabled: chartStyle.creditSetting
    },
    plotOptions: {
        pie : {
            size: chartStyle.chartSize.pieChartSize,
            innerSize: chartStyle.chartSize.donutChartHole
        },
        series: {
            borderRadius: chartStyle.borderRadius.borderRadius_sm,
            allowPointSelect: true,
            dataLabels: [ 
            { //The Percentage Label
                enabled: true,
                distance: chartStyle.labelProperty.labelDistance,                
                formatter: function() {
                    const name = this.point.name;
                    // const percentage = (Math.round(this.y*100)/100).toFixed(1);
                    const percentage = this.percentage.toFixed(1)
                    let label = `<span style="color: white;"><b>${name}</b></span><br/>${percentage}%<br/>`;
                    if (percentage < 7) {
                        label = ``
                    } else if (percentage <= 10) {
                        label = `<span style="color: white;"><b>${name}</b><br/>`
                    }
                    return label;
                },
                style: {
                    fontSize: chartStyle.fontSize.sm,
                    textOutline: chartStyle.textProperty.textOutline,
                    opacity: 0.7,
                    align: 'center',
                    color: 'black',
                    textShadow: chartStyle.textProperty.textShadow,
                },
                
            }
        ],
        shadow: chartStyle.shadow
        }
    },
    series: [
        {
            name: 'Minority Serving Institution (MSI)', //Tool Tip Text
            data: chartInfo.msiTypePieData,
        }
    ]
  });
  

/*-----------------------MSIPP Program Chart--------------------------*/

Highcharts.chart('msippProgram', {
    chart: {
        type: 'pie',
        backgroundColor: chartStyle.backgroundColor,
        width: chartStyle.chartSize.width,
        height: chartStyle.chartSize.height
    },
    title: {
        text: 'MSIPP Program',
        style: {
            fontSize: chartStyle.fontSize.sm
        },
        
    },
    subtitle: {
        text: 'Each slice represents a <br/> MSIPP program',
        align:'center',
        style: {
            fontSize: chartStyle.fontSize.xxs,
        },
        floating: false
    },
    tooltip: {
        headerFormat: '<b><span style="font-size:12px">{series.name}</span></b><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: </br>' +
            '<b>{point.percentage:.2f}%</b> of total<br/>',
        backgroundColor: 'rgba(0, 0, 0, .75)',
        borderWidth: 2,
        style: {
            color: '#CCCCCC'
        }
    },
    credits: {
        enabled: chartStyle.creditSetting
    },
    plotOptions: {
        pie : {
            size: chartStyle.chartSize.pieChartSize,
            innerSize: chartStyle.chartSize.donutChartHole
        },
        series: {
            borderRadius: chartStyle.borderRadius.borderRadius_sm,
            allowPointSelect: true,
            dataLabels: [ 
            { //The Percentage Label
                enabled: true,
                distance: chartStyle.labelProperty.labelDistance,                
                formatter: function() {
                    const name = this.point.name;
                    // const percentage = (Math.round(this.y*100)/100).toFixed(1);
                    const percentage = this.percentage.toFixed(1);
                    let label = `<span style="color: white;"><b>${name}</b></span><br/>${percentage}%<br/>`;
                    if (percentage < 7) {
                        label = ``
                    } else if (percentage <= 10) {
                        label = `<span style="color: white;"><b>${name}</b><br/>`
                    }
                    return label;
                },
                style: {
                    fontSize: chartStyle.fontSize.sm,
                    textOutline: chartStyle.textProperty.textOutline,
                    opacity: 0.7,
                    align: 'center',
                    color: 'black',
                    textShadow: chartStyle.textProperty.textShadow,
  
                }   
            },
            
        ],
        shadow: chartStyle.shadow
        }
    },
    series: [
        {
            name: 'MSIPP Program', //Tool Tip Text
            data: chartInfo.msiProgPieData
        }
    ]
  });
  
const tooltipText = '<b>Additional Information:</b><br>This is some extra text to display on hover.';


/*-----------------------Program Overview Chart--------------------------*/

  
  Highcharts.chart('programOverview', {
  
    column: {
        size: chartStyle.chartSize.barChartSize
    },
  
    chart: {
        type: 'column',
        backgroundColor: chartStyle.backgroundColor,
        width: chartStyle.chartSize.width,
        height: chartStyle.chartSize.height,
        zooming: {
            type: 'xy'
        },
        panning: true,
        panKey: 'shift'
    },
  
    legend: {
        enabled: true,
        floating: false,
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'bottom',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: chartStyle.borderRadius.borderRadius_sm,
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: chartStyle.shadow,
        itemWidth: 100,
        itemMargin: 5,
        itemHoverStyle: {
            color: '#007bff',
        },
    },
  
    title: {
        text: 'Program Overview',
        align: 'center',
        style: {
            fontSize: chartStyle.fontSize.sm
        } 
    },
  
    subtitle: {
        text: 'In a bar group, each bar represents a classification:<br/><b>Freshman, Sophomore, Junior, Senior, Graduate</b>',
        align:'center',
        style: {
            fontSize: chartStyle.fontSize.xs
        } 
    },
  
    credits : {
        enabled: chartStyle.creditSetting
    },
  
    xAxis: {
        title: {
            text: 'National Laboratories',
            style: {
                fontSize: chartStyle.fontSize.xxs,
                fontWeight: 'bold',
                align: 'center'
            }
        },
        categories: NATIONAL_LABS_ABBR, //Grouped Bars Categories (This would be for my Labs) (x-axis)
        labels: {
            style: {
                color: '#050316',
                fontSize: chartStyle.fontSize.xxxs,
            }
        },
        crosshair: true,
        accessibility: {
            description: 'National Laboratories'
        }
    },
  
    yAxis: { //The Total Amount of Students Count (y-axis)
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of Participates',
            style: {
                fontSize: chartStyle.fontSize.xxs,
                fontWeight: 'bold'
            }
        },
        stackLabels: {
            enabled: true
        },
        labels: {
            style: {
                color: 'white',
                align: 'center'
            }
        },
    },
  
    tooltip: {
        formatter: function() {
            const key = this.key;
            const percentage = this.percentage.toFixed(2);
            const series = this.series.name;
            const key_name = NATIONAL_LABS.filter(obj => obj.abbreviation == key).map(obj => obj.name);
            const stackTotal = this.point.stackTotal;
            const yValue = this.y;

            let label = `<b>${key_name} (${key})</b><br/>${series}: ${yValue}<br/>Total: ${stackTotal} (${percentage}%)<br/>`;
            return label;
        },
        backgroundColor: 'rgba(0, 0, 0, .75)',
        borderWidth: 2,
        style: {
            color: '#CCCCCC'
        }
    },
  
    plotOptions: {
        column: {
            stacking: 'normal',
            borderRadius: chartStyle.borderRadius.borderRadius_xs,
            dataLabels: {
                enabled: false
            },
            groupPadding: 0.1,
            pointPadding: 0.05,
        },
        series: {
            shadow: chartStyle.shadow
        }
    },
  
    series: chartInfo.programOverview
  });
  




/*-----------------------Major DrillDown Chart--------------------------*/
  
  Highcharts.chart('majorDrilldown', {
    pie: {
        size: chartStyle.chartSize.pieChartSize,
    },
    chart: {
        type: 'pie',
        backgroundColor: chartStyle.backgroundColor,
        width: chartStyle.chartSize.width,
        height: chartStyle.chartSize.height,
    },
    title: {
        text: 'Major Within MSIPP',
        align: 'center',
        style: {
            fontSize: chartStyle.fontSize.sm
        },
    },
    credits: {
        enabled: chartStyle.creditSetting
    },
    subtitle: {
        text: 'Click the slices to view other majors involved.',
        align: 'center',
        style: {
            fontSize: chartStyle.fontSize.xs
        },
    },
  
    accessibility: {
        announceNewData: {
            enabled: true
        },
        point: {
            valueSuffix: '%'
        }
    },
  
    plotOptions: {
        series: {
            borderRadius: chartStyle.borderRadius.borderRadius_md,
            allowPointSelect: false,
            dataLabels: [
                {
                    enabled: true,
                    distance: chartStyle.labelProperty.labelDistance,
                    formatter: function() {
                        const name = this.point.name;
                        const percentage = this.percentage.toFixed(1)
                        const series = this.series.name;

                        //!%%%%%%%%%%%%%%%%
                        let label = `<span style="color: white;"><b>${name}</b></span>`;
                        // if (name != 'Other' && series != 'Other'){
                        //     if (percentage < 10) {
                        //         label = `<span style="color: white;"></span>`
                        //     } else if(percentage > 10 && percentage <= 20) {
                        //         label = `<span style="color: white;"><b>${name}</b><br/></span>`
                        //     }
                        // }
                        if (name != 'Other' && series != 'Other'){
                            if (percentage < 5) {
                                label = ``
                            } else if (percentage <= 15) {
                                label = `<span style="color: white;"><b>${name}</b></span>`
                            } else {
                                label = `<span style="color: white;"><b>${name}</b></span><br/>${percentage}%<br/>`
                            }
                        }
                        return label;
  
                        // return label;
                    },


                    style: {
                        fontSize: chartStyle.fontSize.sm,
                        textOutline: chartStyle.textProperty.textOutline,
                        opacity: 0.7,
                        align: 'center',
                        color: 'black',
                        textShadow: chartStyle.textProperty.textShadow,
                    },
                }
            ],
            shadow: chartStyle.shadow
        }
    },
  
    tooltip: {
        headerFormat: '<b><span style="font-size:12px">{series.name}</span></b><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: </br>' +
            '<b>{point.percentage:.2f}%</b> of total<br/>',
        backgroundColor: 'rgba(0, 0, 0, .75)',
        borderWidth: 2,
        style: {
            color: '#CCCCCC'
        }
    },
  
    series: [
        {
            name: 'Majors Within MSIPP',
            colorByPoint: true,
            allowPointSelect: true,
            data: chartInfo.majorDrilldownData.labelAndValue
        }
    ],
    drilldown: {
        activeDataLabelStyle: {
            textDecoration: 'none',
            color: 'blue'
        },
        breadcrumbs: {
            buttonTheme: {
                fill: '#f7f7f7',
                padding: 12,
                stroke: '#cccccc',
                'stroke-width': 2,
            },
            floating: true,
            position: {
                align: 'right'
            },
            showFullPath: false,
        },
        series: [
            {
                name: 'Other',
                id: 'Other',
                allowPointSelect: true,
                data: chartInfo.majorDrilldownData.otherLabelAndValue
            },
  
        ]
    }
  });
  
