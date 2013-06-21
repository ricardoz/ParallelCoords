// FIND INDEX AND UPDATE IFRAME
    var counter = 0;
    var course = "red";
    var allHorses = {}
    var currentHorse = 2;
    
    var horseLinks =[];
    var allLinks = [];
    var allFilters=[];

    function findIndex(arr,obj) {
 	var ind = arr.indexOf(obj);
 	if (ind > -1){
		return ind;
	} else {
		return counter;
	}

}

function updateIframe(index){
     	
     	
    
        if (index < 0){
            index += horseLinks.length;
        }
        
        counter = index;
        
        

        var url = horseLinks[index%horseLinks.length]['href'];
        
        
        document.getElementById('horseFrame').src = url;
        return false;
    }