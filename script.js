var app = angular.module("firstApp",[]);
app.controller("myCtrl", function($scope) {

    var days = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var tableRowNum = 8;
    var tableColNum = 25;

    // create double array
    // each cell conatin location and class
    var i, j;
    var table = new Array(tableRowNum)

    // set the hours colum
    var row = new Array(tableColNum);
    row[0] = {info : days[0], class:"title-cell", i : 0, j : 0}
    for(j=1; j<tableColNum; j++){
      row[j]= {info : j-1, class:"title-hours-cell", i : 0, j : j}
    }
    table[0] = row;

    // set the days colums
    for(i=1; i<tableRowNum; i++){
        row = new Array(tableColNum);
        row[0] = {info: days[i], class:"title-days-cell", i : i, j : 0};
        for(j=1; j<tableColNum; j++){
            row[j]= {info : "", type:"regular", class:"regular-cell", i : i, j : j};
        }
        table[i] = row;
    }
    $scope.table = table;

    //create the function on click 
    $scope.onCellClick = function(currentCell) {

        //regular cell
        if(currentCell.class == "regular-cell"){
            table[currentCell.i][currentCell.j].class = "selected-cell"; 
        }
        else if(currentCell.class == "selected-cell"){
            table[currentCell.i][currentCell.j].class = "regular-cell"; 
    
        //days
        }else if(currentCell.class == "title-days-cell"){
            currentCell.class = "title-days-selected-cell";
            for (j=1; j <= tableColNum; j++)
                table[currentCell.i][j].class = "selected-cell"; 
        }else if(currentCell.class == "title-days-selected-cell"){
            currentCell.class = "title-days-cell";
             for (j=1; j <= tableColNum; j++)
                 table[currentCell.i][j].class = "regular-cell"; 

        //hours
        }else if(currentCell.class == "title-hours-cell"){
            currentCell.class = "title-hours-selected-cell";
            for (i=1; i <= tableRowNum; i++)
                table[i][currentCell.j].class = "selected-cell"; 
        }else if(currentCell.class == "title-hours-selected-cell"){
            currentCell.class = "title-hours-cell";
            for (i=1; i <= tableRowNum; i++)
                table[i][currentCell.j].class = "regular-cell"; 
        }
    };

});

app.directive('onLongPress', function($timeout) {
    return {
        restrict: 'A',
        scope: true,
        link: function($scope, $elm, $attrs) {
            $elm.bind('mousedown', function(evt) { 
                $scope.mousedown.test = true;
                $scope.$digest();
            });

            $elm.bind('mouseover', function(evt) { 
                console.log($scope.mousedown );
                if($scope.mousedown.test && $scope.cell.i > 0 && $scope.cell.j > 0){
                    $scope.table[$scope.cell.i][$scope.cell.j].class = "selected-cell";
                    $scope.$digest();
                 }
            });

            $elm.bind('mouseup', function(evt) { 
                $scope.mousedown.test = false;
            });
        }
    };
})



//create a directive
app.directive("hoursAndDaysTable", function() {
return {
        template : '<table class="table table-bordered" > <tr ng-repeat="row in table"> <td ng-repeat="cell in row" cell={{cell}} class={{cell.class}} on-long-press ng-click="onCellClick(cell)"> {{ cell.info }} </td> </tr>	</table>'
    };
});