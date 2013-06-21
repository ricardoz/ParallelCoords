<script>
		//min max foreac horse
		var overallMin = 2000;
		var overallMAx = 0;
		var theStart = true;
		var xLabel = 'furlongs'
		var xMin = 2000;
		var xMax =0;
		
		
		
		var setMinAndMax = function(allTheHorses){
		 	var min = 2000;
			var max = 0;
			
		
			
			
			 
		 
			for (var horseName in allTheHorses){
			 
			 
		
			 var horse = allTheHorses[horseName];
			 
			 horse['sName'] = horse['name'].replace(/\s/g, "");
			 
			 

				var races = horse['races'];

				
				for (j = 0; j<races.length; j++){

					var d = races[j]['rpr'];
					var e = races[j][xLabel];
					var s =races[j]['distNext'];
					if (races[j]['pos']<2){
						races[j]['dist']=parseFloat(s.slice(0,s.indexOf('L')));
					} else {
						races[j]['dist']=0-parseFloat(s.slice(0,s.indexOf('L')));
					}
					
					
					
					
					if (e < min){
							xMin = e;
						}
						if (d > max){
							xMax = e;
						}

					if (!isNaN(d)){
	
					 	d = parseInt(d);
					 
					 	races[j]['rpr'] = d;
						if (d < min){
							min = d;
						}
						if (d > max){
							max = d;
						}
						
					
					}
					
				}
			}
			
			
			overallMin = min;
			overallMax = max;
		}
		
		
	</script>