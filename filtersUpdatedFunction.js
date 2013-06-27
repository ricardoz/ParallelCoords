/**
 * Created with JetBrains WebStorm.
 * User: Miriam Martin
 * Date: 26/06/13
 * Time: 23:53
 * To change this template use File | Settings | File Templates.
 */
var getCheckboxes = function(){
    return  document.getElementsByName("chk");
}


var filtersUpdated = function(){

    /*
     * gets all checkboxes
     * adds the corresponding filters with values
     */
    var chk_arr = getCheckboxes();


    var chklength = chk_arr.length;
    var filters = [];

    for(k=0;k< chklength;k++)
    {
        var box = chk_arr[k];
        var inn = "f"+k;
        var val = document.getElementsByName(inn)[0].value

        if (val == null){
            val = prompt(("Please enter a value for " + box.value));
            document.getElementsByName(inn)[0].value = val;
        }

        if(chk_arr[k].checked === true){
            var p;
            p = [allFilters[k], val];
            //alert("p " + p);
            filters.push(p);
        }
    }

    currentFilters = filters;

    //alert("cf " + currentFilters);

}

var update = function(){
    filtersUpdated();
    applyFilters();
    horseLinks = raceLinksFromHorse(currentHorse);

    for (var horseName in allHorses){

        var horse = allHorses[horseName];
        updateCircles(horse);
    }
}