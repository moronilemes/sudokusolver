$(function(){
    
    var sudokuChartMap = {};
    var readyChunck = [];
    var countEmpty = 0; // This first version will only check readiness
    
    function readSudokuChart(){

        var cellCounter = 0;
        $('.cell').each(function(){

            sudokuChartMap[cellCounter] =  [$(this).attr('id').substr(0,1), $(this).attr('id').substr(1,1), $(this).attr('id').substr(2,1), $(this).html().trim()] ;
            cellCounter++;
            
        });
        console.log(sudokuChartMap);
        loopSudokuChart();
    }
    
    function loopSudokuChart(){
        
        for (i = 1; i <= 9; i++){  
            parameterListLine = [];
            parameterListColumn = [];
            parameterListGrid = [];
            parameterListLine.push('L' + i);
            parameterListColumn.push('C' + i);
            parameterListGrid.push('G' + i);
            //console.log('Volta ' + i);
            $.each(sudokuChartMap, function (index, value) { 
                if (value[0] === i.toString()){
                    //console.log(index + ' => ' + value);
                    parameterListLine.push(value[3]);
                }
                if (value[1] === i.toString()){
                    //console.log(index + ' => ' + value);
                    parameterListColumn.push(value[3]);
                }
                if (value[2] === i.toString()){
                    //console.log(index + ' => ' + value);
                    parameterListGrid.push(value[3]);
                }
            });
//            console.log(parameterListLine);
//            console.log(parameterListColumn);
//            console.log(parameterListGrid);
            checkChunck(parameterListLine);
            checkChunck(parameterListColumn);
            checkChunck(parameterListGrid);
            
        }
        if (readyChunck.length === 27){
            console.log('this sudoku is ready');
        }
    }
    
    function checkChunck(chunck){
        //console.log('checkChunck. Checking: ' + chunck[0]);
        var chunckName = chunck[0];
        
        
        // Verifies readiness of the chunck
        if (readyChunck.indexOf(chunckName) === -1){
            for (j = 1; j <= 9; j++){
                //console.log(chunck[j])
                if (chunck[j] === ''){
                    countEmpty++;
                }
                //console.log(chunck[i]);
            }
        }
        
        //console.log('countEmpty >> ' + countEmpty);
        if (countEmpty === 0){
            readyChunck.push(chunckName); 
        }
    }
    
    function checkCell(){
        $.each(sudokuChartMap, function (index, value) {
            if (value[3] === ''){
                
                var possibleValueList = [];
                
                
                for (i = 1; i <= 9; i++){  
                    var possibleValue = true;
                    //console.log('Pode ser o ' + i + '?');
                    //console.log('i > ' + toType(i));
                    
                    $.each(sudokuChartMap, function (index2, value2) {    
                        
                        //if(value[0] === value2[0] && i === value2[3]){
                        if(value[0] === value2[0] && (i.toString()) === (value2[3])){
                            console.log('Found on same line');
                            possibleValue = false;
                        }
                        if(value[1] === value2[1] && (i.toString()) === (value2[3])){
                            console.log('Found on same column');
                            possibleValue = false;
                        }
                        if(value[2] === value2[2] && (i.toString()) === (value2[3])){
                            console.log('Found on same grid');
                            possibleValue = false;
                        }
                    });
                    //console.log(possibleValue);
                    if(possibleValue){
                        possibleValueList.push(i);                                              
                    } //else {
                        //console.log('Pode não.');
                    //}
                }
                
                if (possibleValueList.length === 1){
                    var thisGuy = "#"+value[0]+value[1]+value[2];
                    $(thisGuy).html(possibleValueList[0]);
                    $(thisGuy).parent().removeClass('bg-warning');
                    $(thisGuy).parent().addClass('bg-success');
                    thisGuy = "#p"+value[0]+value[1]+value[2];
                    $(thisGuy).html('');
                } else if (possibleValueList.length === 0){
                    console.log('Testing: ' + index + ' ' + value);
                    console.log('tá bugado');
                } else {
                    var thisGuy = "#p"+value[0]+value[1]+value[2];
                    console.log('Testing: ' + index + ' ' + value);
                    console.log('possible values: ' + possibleValueList);
                    $(thisGuy).html(possibleValueList);
                    $(thisGuy).parent().addClass('bg-warning');
                }
                
            }
        });
    }
    
    $('.resolve-sudoku-btn').click(function(){
        readSudokuChart();
        checkCell();
    });
    

});
