const records = []

function gatherEnteredData()
{
    let weight = Number(document.getElementById("weightEntryBox").value)
    let date = document.getElementById("dateEntryBox").value
    let height = Number(document.getElementById("heightEntryBox").value);

    records[records.length] = {weight, date, height}

    for(let i = 0; i < records.length; i++)
        if(records[i].height == 0)
            records[i].height = height;
        
    createGraph(records)
}

function createGraph(rec)
{
    rec.sort((a, b) => (a.date > b.date ? 1 : -1));
    
    const dateValues = []
    const weightValues = []
    const bmiValues = []
    for(let i = 0; i < rec.length; i++) {
        dateValues[dateValues.length] = rec[i].date
        weightValues[weightValues.length] = rec[i].weight
        if(rec[i].height != 0)
            bmiValues[bmiValues.length] = +( (( rec[i].weight )/( rec[i].height*rec[i].height ))*703 ).toFixed(2);
        else
            bmiValues[bmiValues.length] = 0;
    }

    new Chart("weightGraph", {
        type: "line",
        data: {
            labels: dateValues,
            datasets: [{
                label: 'Weight (lbs)',
                yAxisID: 'W',
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.5)",
                data: weightValues,
                lineTension:0.4
            },{
                label: 'BMI',
                yAxisID: 'B',
                type: 'line',
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(255,0,0,1.0)",
                borderColor: "rgba(255,0,0,0.5)",
                data: bmiValues,
                lineTension:0.4
            }]
        },
        options: {
            scales: {
                yAxes: [{
                  id: 'W',
                  type: 'linear',
                  position: 'left'
                }, {
                  id: 'B',
                  type: 'linear',
                  position: 'right'
                }]
              }

        }
    });
}

function downloadJSON()
{
    const jsonString = JSON.stringify(records);

    const downloadLink = document.createElement('a'); 
    downloadLink.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString)); 
    downloadLink.setAttribute('download', 'data.json');

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function loadJSON()
{
    const input = document.getElementById('fileLoader');
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const contents = JSON.parse(reader.result);
        
        records.length = 0;
        for(let i = 0; i < contents.length; i++)
            records[records.length] = contents[i]
        
        createGraph(records)
    };
    reader.readAsText(file);
}