
		//min max foreac horse

		var tsMin = 2000;
		var tsMax = 0;
		var theStart = true;
		var xLabel = 'furlongs';
		var tsArray = [];
		var rprArray = [];
		
		
		
		
		
		var setMinAndMax = function(allTheHorses){
		 	
			
			for (var horseName in allTheHorses){
				var min = 2000;
				var max = 0;
				
				var xMin = 2000;
				var xMax =0;
		
			 	var horse = allTheHorses[horseName];
			 
				horse['sName'] = horse['name'].replace(/\s/g, "");

				var races = horse['races'];

				
				for (j = 0; j<races.length; j++){

					var rpr = races[j]['rpr'];
					var ts = races[j]['ts'];
					var e = races[j][xLabel];
					var s =races[j]['distNext'];
					if (races[j]['pos']<2){
						races[j]['dist']=parseFloat(s.slice(0,s.indexOf('L')));
					} else {
						races[j]['dist']=0-parseFloat(s.slice(0,s.indexOf('L')));
					}
					
					
					
					
					if (rpr < min){
							xMin = rpr;
					}
					if (rpr > max){
							xMax = rpr;
					}
					
					if (ts < min){
							Min = rpr;
					}
					if (ts > max){
							Max = rpr;
					}

					if (!isNaN(rpr)){
	
					 	rpr = parseInt(rpr);
					 
					 	races[j]['rpr'] = rpr;
						if (rpr < min){
							min = rpr;
						}
						if (rpr > max){
							max = rpr;
						}
						
					} else {
						rprArray.push(races[j]);
					}
					
					if (!isNaN(ts)){
	
					 	ts = parseInt(ts);
					 
					 	races[j]['ts'] = ts;
						if (ts < min){
							xMin = ts;
						}
						if (ts > max){
							xMax = ts;
						}
						
					} else {
						tsArray.push(races[j]);
					}
					
				}
				
				if (xMin < overallMin){
				overallMin = xMin;
				}
			
				if (xMax > overallMax){
					overallMax = xMax;
					
				}
				
				if (min < tsMin){
					tsMin = min;
				}
			
				if (max > tsMax){
					tsMax = max;
					
				}
			}
			
			
			for(i=0; i<tsArray.length;i++){
				tsArray[i]['ts'] = tsMin;
				
			}
			for(i=0; i<rprArray.length;i++){
				rprArray[i]['rpr'] = overallMin;
				
			}
		}
		
