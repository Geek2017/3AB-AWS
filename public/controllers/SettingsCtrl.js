'use strict';


angular.module('newApp').controller('SettingsCtrl', function($scope) {

    // console.log("Settings");

    // Get the modal
    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var accept = document.getElementById("accept");

    $("#editBtn").click(function() {
        modal.style.display = "block";
    });

    //var ref = firebase.database().ref('datasets/users');

    var userName, email, role, id;

    $scope.clickedUser = {};

    // $scope.data = $firebaseArray(ref);
    // ref.once('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //         // var childKey = childSnapshot.key();
    //         var childData = childSnapshot.val();
    //         // $scope.data = childSnapshot.val();
    //         // console.log($scope.data);

    //         username = childSnapshot.child('username').val();
    //         // fullname = childSnapshot.child('fullname').val();
    //         // address = childSnapshot.child('address').val();
    //         // country = childSnapshot.child('country').val();
    //         // number = childSnapshot.child('number').val();
    //         email = childSnapshot.child('email').val();
    //         role = childSnapshot.child('role').val();

    //     })
    // });

    $scope.data = [];

    $scope.arr = [];

    var settings = {
        "url": "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        var count = response.Count;
        // console.log(response);
        for (var i = 0; i < count; i++){

            $scope.arr[i] = {username: response.Items[i].username.S, password: response.Items[i].password.S, role: response.Items[i].role.S, action: "" }
            // console.log(response.Items[i])
            $scope.data.push($scope.arr[i]);
            
        }

        // console.log($scope.arr);

        var noOfContacts = $scope.arr.length;
		
		if(noOfContacts>0){
			
 
			// CREATE DYNAMIC TABLE.
			var table = document.createElement("table");
			table.style.width = '100%';
			table.setAttribute('border', '1');
			table.setAttribute('cellspacing', '0');
			table.setAttribute('cellpadding', '5');
			
			// retrieve column header ('Name', 'Email', and 'Mobile')
 
			var col = []; // define an empty array
			for (var i = 0; i < noOfContacts; i++) {
				for (var key in $scope.arr[i]) {
					if (col.indexOf(key) === -1) {
						col.push(key);
					}
				}
			}
			
			// CREATE TABLE HEAD .
			var tHead = document.createElement("thead");	
				
			
			// CREATE ROW FOR TABLE HEAD .
			var hRow = document.createElement("tr");
			
			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
			for (var i = 0; i < col.length; i++) {
					var th = document.createElement("th");
					th.innerHTML = col[i];
					hRow.appendChild(th);
			}
			tHead.appendChild(hRow);
			table.appendChild(tHead);
			
			// CREATE TABLE BODY .
			var tBody = document.createElement("tbody");	
			
			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
			for (var i = 0; i < noOfContacts; i++) {
			
					var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
					
					
					for (var j = 0; j < col.length; j++) {
						var td = document.createElement("td");
                        td.innerHTML = $scope.arr[i][col[j]];
                        
                        bRow.appendChild(td);
                        
					}
                    tBody.appendChild(bRow)
                        var entry = $scope.arr[i];
                        var buttons = [{
                            value: "Edit",
                            type: "button",
                            className: "btn btn-info mx-2"
                        },{
                            value: "Delete",
                            type: "button",
                            className: "btn btn-danger mx-2"
                        }];
                        // btn.type = buttons.values(type);
                        
                        for (let k = 0; k < buttons.length; k++) {
                            let button = buttons[k];
                            var btn = document.createElement('input');
                            btn.type = button.type;
                            btn.value = button.value;
                            btn.className = button.className;
                            btn
                            if(btn.value === "Edit") {
                                btn.onclick = (function(entry) {return function() {$scope.selectUser(entry);}})(entry);
                            } else {
                                btn.onclick = (function(entry) {return function() {$scope.selectUser2(entry);}})(entry);
                            }
                            td.appendChild(btn)[i];
                        }

                        // var entry2 = $scope.arr[i];
                        // var btn2 = document.createElement('br');
                        // btn.type = "button";
                        // btn.className = "btn btn-danger";
                        // btn.value = "Delete";
                        // btn.onclick = (function(entry2) {return function() {$scope.selectUser2(entry2);}})(entry2);
                        // td.appendChild(btn2);

                        // var entry3 = $scope.arr[i];
                        // var btn3 = document.createElement('input');
                        // btn.type = "button";
                        // btn.className = "btn btn-danger";
                        // btn.value = "Delete";
                        // btn.onclick = (function(entry3) {return function() {$scope.selectUser2(entry3);}})(entry3);
                        // td.appendChild(btn3);

                        
                    
 
			}
			table.appendChild(tBody);	
			
			
			// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
			var divContainer = document.getElementById("myContacts");
			divContainer.innerHTML = "";
			divContainer.appendChild(table);
			
		}

        // return $scope.arr;
        
        
      });
    //   const obj = {};

    //   for (let i = 0; i < $scope.data.length; i++) {
    //     obj[i] = $scope.data[i];
    // }

    //   console.log($scope.data);
    //   var arrayToString = JSON.stringify(Object.assign({}, $scope.data));  // convert array to string
    // var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
 
// console.log(stringToJsonObject);

      $scope.statuses = [
        {username: 'asdasdasds', role: 'status1'},
        {username: 'asdasdasdsad', role: 'status2'},
        {username: 'asdasdsadas', role: 'status3'}
      ];

    //   console.log($scope.statuses);

    $scope.selectUser = function(entry) {
        // console.log(users);
        console.log(entry);
        // $scope.clickedUser = entry;
        $("#editName").val(entry.username);
        $("#editPass").val(entry.password);
        $("#editRole").val(entry.role);
        id = entry;
        modal.style.display = "block";
    };

    $scope.selectUser2 = function(entry) {
        // console.log(users);
        $scope.clickedUser = entry;
        document.getElementById("deleteUser").innerText =  entry.username;
        id = entry;
        modal2.style.display = "block";
    };

    $scope.updateUser = function() {
        // var ref2 = firebase.database().ref("datasets/users/" + id.$id);
        // ref2.update({
        //     username: $scope.clickedUser.username,
        //     email: $scope.clickedUser.email,
        //     // country: $scope.clickedUser.country,
        //     // gender: $scope.clickedUser.gender,
        //     role: $scope.clickedUser.role
        // })
        // console.log($("#editName").val());
        // console.log($("#editPass").val());
        // console.log($("#editRole").val());

        var myData = JSON.stringify({
            // "domain": "www.done.com"
            "username": $("#editName").val(),
            "password": $("#editPass").val(),
            "role": $("#editRole").val(),
            // "password": Base64.encode(pwd.value),
            // "role": "ordinary"
        });
    
        $.ajax({
            type: "POST",
            dataType: "json",
            // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
            url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/users/{id}",
            data: myData,
            headers: {
                "Content-Type": "application/json"
            },
            success: function(data) {
                console.log(data);
                window.location.hash = "#/";
                window.location.hash = "#/settings";
                // console.log(window.location.hash);
    
            },
            error: function(error) {
                // console.log(error);
            }
        });
        

        modal.style.display = "none";

    };

    $scope.deleteUser = function() {
        // console.log(entry)
        // var ref = firebase.database().ref("datasets/users/" + id.$id);
        // ref.remove();
        // modal2.style.display = "none";
        // console.log(id.username);


        var settings = {
            "url": "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/users/" + id.username,
            "method": "DELETE",
            "timeout": 0,
        };
        $.ajax(settings).done(function(response) {
            console.log(response);
            modal2.style.display = "none";
        });
    };

    $scope.close = function() {
        modal.style.display = "none";
    };

    $scope.close2 = function() {
        modal2.style.display = "none";
    };


    // console.log(email);

 





});