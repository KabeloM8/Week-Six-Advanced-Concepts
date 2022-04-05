var studentsAvg = [];

function calcAverage(results, index) {
    return Math.round(((parseInt(results.data[index].Algebra) + parseInt(results.data[index].Calculus)
        + parseInt(results.data[index].Databases) + parseInt(results.data[index].Programming))/4)*10)/10;
}

function getGrade(avg) {
    if (80 <= avg && avg < 100){
        return 'A';
    }
    else if (70 <= avg && avg < 80){
        return 'B';
    }
    else if (60 <= avg && avg < 70){
        return 'C';
    }
    else if (50 <= avg && avg < 60){
        return 'D';
    }
    else if (40 <= avg && avg < 50){
        return 'E';
    }
    else if (0 <= avg && avg < 40){
        return 'F';
    }
    else{
        return 'Unknown'
    }
}

function readFile() {
    try {
        Papa.parse(document.getElementById('uploadFileInput').files[0],
        {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results){
                console.log('results', results);
                for(i = 0; i < results.data.length; i++){
                    
                    //Set students average
                    let avg = calcAverage(results, i);
    
                    // Get grade
                    let grade =  getGrade(avg);
                    
                    // Set students average csv data
                    studentsAvg[i] = {
                        Firstname: results.data[i].Firstname,
                        Surname: results.data[i].Surname,
                        Avarage: avg,
                        Grade: grade
                    }
                }
    
                // Create table for input csv data
                createTable('csvInputTable', results.meta['fields'], results.data);
    
                document.getElementById('inputTableLabel').style.display = 'block';
                document.getElementById('showAvg').style.display = 'block';
                
                console.info('Successfully loaded file!');
            }
        });
    } catch (error) {
        console.error('A read file error occured', error);
    }
}

function showAvg() {
    // Create table for output csv data
    createTable('csvOutputTable', Object.keys(studentsAvg[0]), studentsAvg)

    document.getElementById('outputTableLabel').style.display = 'block';
    document.getElementById('saveFile').style.display = 'block';
}

function saveFile() {
    try {
        studentsAvgCsv = Papa.unparse({
            data: studentsAvg
        });
    
        var csvData = new Blob([studentsAvgCsv], {type: 'text/csv;charset=utf-8;'});
        var csvURL =  null;
        if (navigator.msSaveBlob)
        {
            csvURL = navigator.msSaveBlob(csvData, 'output.csv');
        }
        else
        {
            csvURL = window.URL.createObjectURL(csvData);
        }
    
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.download = 'output.csv';
        tempLink.click();
        
        console.info('Successfully saved file!');
    } catch (error) {
        console.error('A save file error occured', error);
    }
}

function createTable(tableID , header, data){
    csvTable = document.getElementById(tableID);
    csvTable.innerHTML = "";

    // Set table header
    csvTable.insertAdjacentHTML(
        "afterbegin",
        `
            <thead>
                <tr>
                    ${header.map((text) => `<th>${text}</th>`).join("")}
                </tr>
            </thead>
        `
    );

    // Set table body
    const rowsHtml = data.map((row) => {
    return `
                <tr>
                    ${Object.keys(row).map((text,) => `<td>${row[text]}</td>`).join("")}
                </tr>
            `;
    });

    csvTable.insertAdjacentHTML(
    "beforeend",
    `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `
    );
}
