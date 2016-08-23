var aTable;

var displayDefects;

		
          		
		 //Object representation of the people who process Launch Critical (from now on "LC") defects
		 function contributor(name, lastLC, turn, hasInProgress, uid){
		 	this.name = name;
		 	this.lastLC = lastLC;
		 	this.turn = turn;
		 	this.hasInProgress = hasInProgress;
			this.uid = uid;
		 }

		 displayDefects = function(results) {
		 	var defectsInfo = "";
		 	var defect = "";
		 	var gather = [];
		 //String list of the people who process LC defects(from now on "Contributors")
		 var contrNames = ['Patricio P', 'Mario M', 'Franco B', 'Juan Barrionuevo', 'Merlin N', 'Jimena Barseghian', 'Gabriel Uanini', 'Alejandro Sosa', 'Guido C', 'Pablo Gimenez'];
		 var uids = ['ppage', 'mmunoz', 'fbostico', 'jbarrionuevo', 'mnunez', 'jbarseghian', 'guanini', 'asosa', 'gcresta', 'pgimenez'];
		 
		 var contributors = [];
		 //creating the list of contributors
		 for(i = 0 ; i < contrNames.length ; i++){
		 	contributors.push(new contributor(contrNames[i], new Date(1), 0, false, uids[i]));
		 }
		 //filtering all the defects to pull only LC that have an Owner
		 for (i=0 ; i < results.defects.length ; i++) {
		 	defect = results.defects[i];
		 	if(defect.Severity == 'Crash/Data Loss' && defect.Owner){
				gather.push(defect);
		 	}
		 }
		 //checking wheter the contributors have LC in progress and setting the newest LC they took 
		 for(i = 0 ; i < gather.length ; i++){
		 	for(j = 0 ; j < contributors.length ; j++){
		 		if(contributors[j].name == gather[i].Owner._refObjectName){
					if(gather[i].QCStatus == 'In Process' && gather[i].Assignee == contributors[j].uid){
		 				contributors[j].hasInProgress = true;
					}
		 			if(contributors[j].lastLC < new Date(gather[i].OpenedDate)){
		 				contributors[j].lastLC = new Date(gather[i].OpenedDate);
		 			}
		 		}
		 	}
		 }
		 
		 //Drawing some HTML stuff
		 var aDiv = document.getElementById("aDiv");
		 
		 aTable = document.getElementById("aTable");
         aTable.innerHTML = '';
		 aTable.innerHTML += '<tr><th>Name</th><th>Last LC</th><th>Next</th><th>Has In Progress?</th></tr>';
		 
		 //getting the oldest LC among all contributors
		 contributors.sort(function(a, b){
			return a.lastLC - b.lastLC;
			});
			
		for(i = 0 ; i < contributors.length ; i++){
		 	contributors[i].turn = i + 1;
		}
		
		//with all previous data, drawing the table
		 for(i = 0 ; i < contributors.length ; i++){
		 	if(contributors[i].turn == 1){
		 		var formatedTurn =  '<td bgcolor="#00FF00">' + contributors[i].turn + '</td>';
		 	}
		 	else{
		 		if(contributors[i].turn == 2){
					var formatedTurn =  '<td bgcolor="#FFD700">' + contributors[i].turn + '</td>';
				}
				else{
					if(contributors[i].turn == 3){
						var formatedTurn =  '<td bgcolor="#FF4500">' + contributors[i].turn + '</td>';
					}
					else{
						var formatedTurn = '<td>' + contributors[i].turn + '</td>';
						}
					}
				}
			
			

		 	if(contributors[i].hasInProgress){
		 		var formatedInProgress = '<td bgcolor="#00FF00">' + contributors[i].hasInProgress + '</td>';
		 	}
		 	else{
		 		var formatedInProgress = '<td>' + contributors[i].hasInProgress + '</td>';
		 	}

		 	var formatedDate = '<td>' + contributors[i].lastLC.getHours() + ':' + contributors[i].lastLC.getMinutes() + ' ' + contributors[i].lastLC.toDateString() + '</td>';

		 	aTable.innerHTML += '<tr> <td>' + contributors[i].name + '</td>'  + formatedDate 
		 	+  formatedTurn
		 	+ formatedInProgress +  '</tr>'
		 }
		 
		};
		
		 
		

	
	
	
	
		
