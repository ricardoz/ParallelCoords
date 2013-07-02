// Check if race matches course
// Return boolean to wnable combinations
var filterByCourse = function(race,value){
	return race['course'].toLowerCase() === value.toLowerCase();
}

var filterByValue;

filterByValue = function (race,value) {
    var bool = race['value'] > value;

    return bool;
};


var filterByClass = function(race,value){
 
 
 	var re = new RegExp("\\d{1}");

 	var digit = re.exec(race['raceClass']);

 	var bool = digit <= value;
 	
	return bool;

}

var filterByDistance = function(race,value){

    var diff = Math.abs(race['furlongs'] -  value);

    return diff <= 1;

}


allFilters.push(filterByCourse);
allFilters.push(filterByValue);
allFilters.push(filterByClass);
allFilters.push(filterByDistance);



var pc = function(horse){

           width=1500;
    height=570;
 	// Create an SVG for our chart.
var svg = d3.select("body").append("svg")
  .attr("width", 1500)
  .attr("height", 570)
  .append("g")
  .attr("transform", "translate(40,20)");

    svg.append("text")
        .attr("x", (width/2))
        .attr("y", 0 - (-10))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(horse["name"]);


    rs = horse['races']; 
	
	var getData = function(i){
     	d=[];
     	
     	var race = rs[i];
     	
     	
     	
		for(i=0;i<dims.length;i++){
			
			var t1 =  race[dims[i]];
			
			if (t1===undefined)
			{
				
			}
			
			d.push(t1);
		}
		
		return d;
	}

	
	
    data = [];

    for (j=0; j< rs.length;j++){
        data.push(getData(j));
    }
        //[getData(x) for (x in rs)];
	
	
	
	
	
	

    
    var labels = dims;
    var pcData = data;
    
    
    
    var csv = { 'header' : labels, 'data' : pcData };
    
    var tid = "ParChart" // horse['sName']
    
    
    
    var pcChart = new ParallelCoordinates(
  {
   
   
    'parent'      : svg,
    'id'          : tid,
    'class'       : "ParChart",
    'csv'         :
    {
      'header' : labels,
      'data'   : data
    },
    'normalize'   : false,
    'opacity'     : 50,
    'xoffset'     : 20,
    'yoffset'     : 120,
    'width'       : 1200,
    'height'      : 400,
    'axisLabels'  :
    	{
      'stagger'          : true,
      'yoffset'          : -9,
      'staggeredYOffset' : -25
    	}
  	}
  );

pcChart.attr("csv.data", data); 
pcChart.attr("normalize", pcData.length <= 1);

pcChart.render();
	
}

var createChart = function(horse){


 	//raceLinksFromHorse(horse,allFilters);
 
  	var w= 400;
 	var h = 400;
 	var padding = 30;
 	var dataset = horse['races'];
 	
 	
 	
 	/*
 	 * position in the race
 	 */
 	var xScale = d3.scale.linear()
								 .domain([0, 20+2])
								 .range([padding, w - padding]);


    /*
     * rpr
     */
	var yScale = d3.scale.linear()
								 .domain([0, overallMax + 10])
								 .range([h-padding,padding]);

			
	
 	//Define X axis
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .ticks(7)
							  
							  

			//Define Y axis
			var yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient("left")
							  .ticks(7)
 
 	
	var svg = d3.select("#chart")
			.append("svg")
            .attr("width", w)
            .attr("height", h);

    horse['svg'] = svg;
			
			svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 50)
        .attr("text-anchor", "middle") 
			.style("font-size", "16px") 
        	.style("text-decoration", "underline")  
        	.text(horse['name']);


    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
           
    var circles = svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle");
   
   circles.attr("cx", function(d) {
    	
        return xScale(d['pos']);
   })
   .attr("cy", function(d) {
    	var v = d['rpr'];
    	if(isNaN(d['rpr'])){
    	 alert(typeof(v) + "  nan " + v);
			v = overallMin
		}
        return yScale(v); 
   })
   .attr("r", function(d){
	return Math.sqrt(d['value']+9);
})
   .style("fill", function(d) {
    	if (d['bool']){
			return 'red';
		} 
		
		return 'yellow';
        
   })
   .on("mouseover", function(d) { 
    //alert("in " + div);     
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html(prettyPrintOneRace(d))  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px"); 
				
				  
            })                  
        .on("mouseout", function(d) {
		       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        })
		.on("click", function(d,i) { 
		       
            alert(d['href']	);   
        });
   
   
   
   //Create X axis
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);

			//Create Y axis
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);


        
  
}

var updateCircles = function(horse){
    var svg = horse['svg'];
    var dataset = horse['races'];

    var circles = svg.selectAll("circle");


    circles.style("fill", function(d) {

        if (d['bool']){
            return 'blue';
        }

        return 'green';

    })

}
