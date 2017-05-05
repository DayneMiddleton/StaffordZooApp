//Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {

    console.log('Service worker registered successfully');
  }).catch(function(err) {
    console.log('Service worker registration failed: ', err);
  });
}


//Preloader
var preloader;

function myFunction() {
    preloader = setTimeout(showPage, 200);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("appcontent").style.display = "block";

}


const TodaysSchedule = document.getElementById('TodaysScheduleJSONInfo');
if(footballMatchStats){
    fetch("events.json")
        .then(response => {
            return response.json();
        }).then(footballMatchJSONinfo => {
            const footballMatchJSONinfoHTML = footballMatchJSONinfo.map(event => {
                return ` <div class="card">
                        <div class="card__container">
                        <img src="${event.image}" alt="AfricanLionImage" longdesc="FeedLionsImageToday" class="Today">
                        <h1>${event.heading}</h1>
                        <h2>${event.text}</h2>
                        </div>
                        </div>
                        
`;
            }).join("\n");
            
            TodaysSchedule.innerHTML = TodaysScheduleJSONInfo;
        });
}


  	function html5_storage_support() {
  		//check to see if this browser support local storage: return true if so, false if not
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
  	function save() {
  		if (html5_storage_support()) {
  			//get the user-entered values from the two text fields:
  			var Name = document.getElementById("Name").value;
  			var Number = document.getElementById("Number").value;
            var Email = document.getElementById("Email").value;
            
  			//create two local-storage keys (name1, name2) and assign
  			//each the respective value from the text fields:
  			localStorage.setItem('Name',Name);
  			localStorage.setItem('Number',Number);
            localStorage.setItem('Email',Email);
  		}
  	}

  	function set() {
  		if (html5_storage_support()) {
  			//set the value of each text field from the stored values:
  			document.getElementById('Name').value = localStorage.getItem('Name');
  			document.getElementById('Number').value = localStorage.getItem('Number');
            document.getElementById('Email').value = localStorage.getItem('Email');
  		}
  	}