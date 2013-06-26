var getOptionBox = function(){
      return   document.getElementById("horses");
}

// set current horse from index of option list
var setCurrentHorse = function(){
    var mylist= getOptionBox();
    currentHorse = allHorses[mylist.options[mylist.selectedIndex].text];
}

var addHorseNameToTable = function(){
    var mylist= getOptionBox();
    document.getElementById("horseName").innerHTML="<strong>"+mylist.options[mylist.selectedIndex].text+"</strong>";
}

var changeHorse = function()
{

    setCurrentHorse();
    addHorseNameToTable();
}
