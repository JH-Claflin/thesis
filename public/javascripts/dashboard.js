import {NATIONAL_LABS, MSI_CATEGORIES, MSIPP_PROGRAMS, CLASSIFICATIONS } from "./constants.js";
const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab-content');



tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = document.getElementById(tab.dataset.tab);

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    tabContent.forEach(content => {
      content.classList.remove('active');
    });

    tab.classList.add('active');
    targetTab.classList.add('active');
  });
});




//########### Chart Info ###############
export let fetchData = async () => {

    let chartData;
    try {
        const response = await fetch('/data');

    if(!response.ok) {
        throw new Error('Data can not be retrieved');
    }
        const data = await response.json();
        chartData = JSON.parse(JSON.stringify(data));

    } catch (error) {
        console.error('Error fetching data: ', error)
    }

    // console.table(chartData)

    // let totalNumberOfRecords = chartData.length

    let msiTypePieData = pieChartData(MSI_CATEGORIES, chartData, 'msi_type');
    let msiProgPieData = pieChartData(MSIPP_PROGRAMS, chartData, 'msipp_prog');
    let majorDrilldownData = drillDownPieChart(chartData, 'major');
    let programOverview = groupStackedBarGraph(NATIONAL_LABS, CLASSIFICATIONS, MSIPP_PROGRAMS, chartData)

    // console.table(msiProgPieData);
    // console.table(majorDrilldownData)
    // console.table(msiTypePieData)
    console.table(programOverview);
    
    
    return {msiTypePieData, msiProgPieData, majorDrilldownData, programOverview}
    

}

// fetchData();
// console.log(fetchData())

const pieChartData = (listOfLabels, dataToParse, groupBy) => {
    let labels;
    let labelsName;
    let labelsAbbr;
    
    const groupedPropertyArray = groupByProperty(dataToParse, groupBy)
    let labelAndValue = []
    let groupedObjects;
    let yValue;

    if(listOfLabels[0].hasOwnProperty('abbreviation')){
        labelsAbbr = labelProperties(listOfLabels, 'abbreviation');
        labelsName = labelProperties(listOfLabels, 'name')

        for(let i = 0; i < listOfLabels.length; i++){
            groupedObjects = groupedPropertyArray.get(labelsAbbr[i])

            if(groupedObjects === undefined){
                yValue = 0
            } else {
                yValue = groupedObjects.length
            }

            labelAndValue.push({
                name: labelsAbbr[i],
                name2: labelsName[i],
                y: yValue
            })
        }
    } else {
        labels = labelProperties(listOfLabels, 'name')
        let labelDBFormat = labels.map(label => label.toUpperCase())

        for(let i = 0; i < listOfLabels.length; i++){
            groupedObjects = groupedPropertyArray.get(labelDBFormat[i])

            if(groupedObjects === undefined){
                yValue = 0
            } else {
                yValue = groupedObjects.length
            }

            labelAndValue.push({
                name: labels[i],
                y: yValue
            })
        }
    }


    return labelAndValue
}


//Function to sort for drilldown pie chart, threshold is 10%
const drillDownPieChart = (dataToParse, groupBy) => {
    const uniqueMajors = [...new Set(labelProperties(dataToParse, groupBy))]
    const totalNumberOfRecords = dataToParse.length

    const groupedPropertyArray = groupByProperty(dataToParse, groupBy)
    let labelAndValue = [];
    let otherLabelAndValue = [];
    let otherYValue = 0;
    let groupedObjects;
    let yValue;

    for(let i = 0; i < dataToParse.length; i++){
        groupedObjects = groupedPropertyArray.get(uniqueMajors[i])

        if(groupedObjects === undefined){
            yValue = 0
        } else {
            yValue = groupedObjects.length
        }
        
        let percentage = ((yValue/(totalNumberOfRecords))*100).toFixed(2);
        
        if (yValue != 0) {
            if (percentage >= 0.1){
                labelAndValue.push({
                    name: labelFormatting(uniqueMajors[i]),
                    y: yValue,
                    drilldown: null
                })
            } else {
                otherYValue += yValue
                otherLabelAndValue.push({
                    name: labelFormatting(uniqueMajors[i]),
                    y: parseFloat(percentage)
                })
            }
        }

    }

    if (otherYValue > 0) {
        labelAndValue.push({
            name: 'Other',
            y: otherYValue,
            drilldown: 'Other'
        });
    }

    return {labelAndValue, otherLabelAndValue, otherYValue}
}

const groupStackedBarGraph = (xAxis, bars, stacks, dataToParse) => {
    // const xAxisName = labelProperties(xAxis, 'name');
    const xAxisAbbr = labelProperties(xAxis, 'abbreviation');
    const Classification = labelProperties(bars, 'name');
    const programStack = labelProperties(stacks, 'name');
    let sortedLabs;
    let sortedClassification;
    let sortedPrograms;
    let dataValue = 0;
    let seriesData = []

    //TODO: To get the correct numbers to show on the bar graph, get the number of students that are to the lab based on index of classification
    /**
     * Classification => Stack
     * Name => MSIPP Program
     * Data => Length Array Containing Program
     */

    for(let i = 0; i < Classification.length; i++) {
        let classificationStack = Classification[i];
        sortedClassification = dataToParse.filter(obj => obj.classification == dbValueFormat(Classification[i]))

        for(let i = 0; i < programStack.length; i++) {
            let programName = programStack[i];
            let data = [];
            sortedPrograms = sortedClassification.filter(obj => obj.msipp_prog == dbValueFormat(programStack[i]))

            for(let i = 0; i < xAxis.length; i++) {
                sortedLabs = sortedPrograms.filter(obj => obj.national_lab == xAxisAbbr[i]);
                dataValue = sortedLabs.length > 0 ? sortedLabs.length : 0;

                data.push(dataValue)
            }

            // console.log(`${classificationStack}\n ${programName}\n Array => ${data}`)

            seriesData.push({
                name: `${classificationStack.slice(0,4)}. ${programName}`,
                data: data,
                stack: classificationStack
            })

        }
    }


    return seriesData;

}






//Grouping Objects that share a property
const groupByProperty = (arr, property) => {
    const groups = new Map();

    arr.forEach(obj => {
        const groupKey = obj[property];
        if (!groups.has(groupKey)) {
            groups.set(groupKey, []);
        }
            groups.get(groupKey).push(obj);
});

    return groups;
}

//Applying changes to labels
const labelProperties = (list, property) => {
    return list.map(item => item[property])
}

//Label formatting
export const labelFormatting = (str) => {
    str = str.toLowerCase()
    const words = str.split(' ')
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    
    return capitalizedWords.join(' ');
}

const dbValueFormat = (str) => {
    return str.toUpperCase();
}












//Data to be sent to the charts
export const chartInfo = await fetchData();









