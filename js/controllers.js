angular.module('app.controllers', [])
  
.controller('rateACarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('previousRatingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

$scope.$on("$ionicView.enter", populateList);
}])
      
.controller('vroomsyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 
var photoFileHandle;

//open camera function
function openCam(){
    var options = {quality: 80,
    destinationType: Camera.DestinationType.File_URI
    };
    navigator.camera.getPicture(onSuccess, onFail, options);
}

//when image taken, set carimg on rating page to temporary filename
function onSuccess(tempFilename)
{
    var image = document.getElementById("carImg");
    image.setAttribute("src", tempFilename);
    alert(tempFilename);
    window.resolveLocalFileSystemURI(tempFilename, gotFileHandle, onFail);
}

//get filehandle and new location to move the file to
function gotFileHandle(fileHandle){
    photoFileHandle = fileHandle;
    var destination = "file:///data/data/com.phonegap.helloworld/files/files/";
    window.resolveLocalFileSystemURI(destination, gotDestination, onFail);
}

//move the file to above destination
function gotDestination(destinationDirectory){
    photoFileHandle.moveTo(destinationDirectory, photoFileHandle.name, moveSuccessful, onFail);
}

//alert when successful and set the carImg to new stored location
function moveSuccessful(fileHandle){
    alert("File moved to " + fileHandle.toURL());
    var viewerImage = document.getElementById("carImg");
    viewerImage.src = fileHandle.toURL();
}

//alert when image move was unsuccessful
function onFail(error)
{
    alert("Failed: " + error);
}

//enable Geolocation 
function geoLocate(){
    navigator.geolocation.getCurrentPosition(whenSuccess, whenError);
}

//when successful give an alert with logitude and latitude
function whenSuccess(position){
    alert('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n');
}

//alert if an error occurs
function whenError(){
    alert('Error!');
}

//creates the array and object in the array for the cars
var carsArray = [];
var currentCar ={};

function buildObject(){
    
    //grabing all the values from the ratings input fields and storing as variables
    var make = document.getElementById("getMake").value;
    var model = document.getElementById("getModel").value;
    var type = document.getElementById("getType").value;
    var performance = document.getElementById("getPerformance");
    var performanceSelected = performance.options[performance.selectedIndex].value;
    var comfort = document.getElementById("getComfort");
    var comfortSelected = comfort.options[comfort.selectedIndex].value;
    var value = document.getElementById("getValue");
    var valueSelected = value.options[value.selectedIndex].value;
    var overAll = document.getElementById("getoverAll");
    var overAllSelected = overAll.options[overAll.selectedIndex].value;
    var image = document.getElementById("carImg").src;
    
   // placing the above values variables into an object
    currentCar = {
        make: make, 
        model: model, 
        Type: type,
        performance: performanceSelected,
        value: valueSelected,
        overAll: overAllSelected,
        comfort: comfortSelected,
        image: image,
    };
    //pushing that object into the array
    carsArray.push(currentCar);
    submit();
}

//saving the data to the local storage
function saveToStorage(){
var stringArray = JSON.stringify(carsArray);
localStorage.setItem("storedArray", stringArray);
}

function submit() {
    saveToStorage();
}

//function to start the dynamic list
function populateList(){
    
    //parsing array back from JSON
    var rawtext = localStorage.getItem("storedArray");
        carsArray = JSON.parse(rawtext);
    
    //grabbing list and setting style
    var insertInto = document.getElementById("previousRatings-list7");
    insertInto.setAttribute("style", "padding-top:40px; padding-bottom:40px;");
    insertInto.innerHTML = "<br>";
    
    //looping through the array, for every car object creating a new item and populating the fields
    for (var i=0; i < carsArray.length; i++) {
        var newListItem = document.createElement("ion-item");
        newListItem.setAttribute("class", "assertive item item-body");
        insertInto.appendChild(newListItem);
        
        var newListImage = document.createElement("img");
        newListImage.setAttribute("src", carsArray[i].image);
        newListImage.setAttribute("style", "width:175px; height:250px; float:left;");
        newListItem.appendChild(newListImage);
        
        var carMake = document.createElement("h2");
        carMake.setAttribute("class", "style");
        carMake.innerHTML = carsArray[i].make;
        newListItem.appendChild(carMake);
        
        var carModel = document.createElement("h2");
        carModel.setAttribute("class", "style");
        carModel.innerHTML = carsArray[i].model;
        newListItem.appendChild(carModel);
        
        var carType = document.createElement("h2");
        carType.setAttribute("class", "style");
        carType.innerHTML = carsArray[i].Type;
        newListItem.appendChild(carType);
        
        var overallRating = document.createElement("p");
        overallRating.innerHTML = carsArray[i].overAll;
        newListItem.appendChild(overallRating);
        
        var performanceRating = document.createElement("p");
        performanceRating.innerHTML = "Performance: " + carsArray[i].performance;
        newListItem.appendChild(performanceRating);
        
        var comfortRating = document.createElement("p");
        comfortRating.innerHTML = "Comfort: " + carsArray[i].comfort;
        newListItem.appendChild(comfortRating);
        
        var valueRating = document.createElement("p");
        valueRating.innerHTML = "Value: " + carsArray[i].value;
        newListItem.appendChild(valueRating);
    }
}

//clear data doesnt work
function clearData(){
   //localStorage.clear();
}