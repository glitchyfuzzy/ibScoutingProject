document.addEventListener("DOMContentLoaded", function() { // waits until dom is fully loaded before running all code
  const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMWIwODBjOWVkYzg0NDE3ZjE3NGEyMzFkNzk5NWZhZmFlZjhlNTM2Mjk5NmIyZGQwYzE3NGQ2YjMwMGU1ZjhhODA3ZTQ3N2U1OTM1NTkzOWYiLCJpYXQiOjE3MDQ3NDA3NjUuMzc2ODQzLCJuYmYiOjE3MDQ3NDA3NjUuMzc2ODQ3LCJleHAiOjI2NTE1MTE5NjUuMzcwOTEwMiwic3ViIjoiMTI0NjI5Iiwic2NvcGVzIjpbXX0.GcR7elkAPJ_qprvZw8_3hE12XXrDQm0a9DHa-E6YPM421pU-QJtx4ZYN2_kWPILCh8jNsJwYbS6y9YX3GR1-keF5vbTC35ss2sODe6dMcqb-NLAALSOPXVXhZ8Wp7IoACYolAQRZPTnKXc7ZlgZhta9lyHDE85komid-Lvxq1SCcIpTrTZNYtz6_ep5qjXPfxWyiCHqZs-u4cuDOGCX49qr3CoMejq8oRU888NiaOd8hQZ3HI40S7JK90WhIwd_7kogENAmD5uNY2C0esiI_M8RU7iKnGnMdI4dTBAxmbJBdQoe0df4YotE9MkpH8tFTfUKJnVdHDVTmza3KBpGGPlP_iRO94gDJAcOKGUyIcVfzj6kfqNNW_YzOwHnC90ql3Tlj6iLLSIBstlDU9cablBkJI0FePjVj6LGDFMw_RaA0IKzDAhCKKY8Pml3zTkQKMenYp-KosF4jQ8MHgwh5DRvWFQ9eLQ_hBhcKuzVVdtjiDMj-L7MOBs6Xi7hnjULlEVle5XRk1iTXJIu6z0qNY4U-KcPKLOpcctczuaLfQbdP97Ww-5rf2zppbNKBVgHMv6WhVpS6WSvtmMG7H0kVjiX_vjGBosNuE1WJUnenX_f7h_0qR_f0ozVBIva9DYjFf1-hJVlotI2E2-gh7paerZRkCXD6tzZvEzRIRR5HEZQ'; // api key
  const apiTeamsUrl = `https://www.robotevents.com/api/v2/events/52377/teams?registered=true&myTeams=false`; // api url
  const apiEventUrl = `https://www.robotevents.com/api/v2/events/52377`;
  const table = document.getElementById('spreadsheet'); // assigns variable to spreadsheet element
      
  let teamNamesArr = []; // team names goes in this array
  let teamNumsArr = []; // team numbers goes in this array
  let teamOrgsArr = []; // team organizations goes in this array
  let teamGradesArr = []; // // team grades goes in this array (high school or middle school)
  let teamCitiesArr = []; // team cities within a region goes in this array
  let teamRegionsArr = []; // team regions goes in this array

  // uses get method to get api data 
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  };
  

  fetch(apiEventUrl, requestOptions)
  .then(response => {
    // checks if respose is okay if not error is thown, if so program continues
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // returns data in json
  })
  .then(data => {
    function outputEventName() {
      const eventName = data.name; // get the event name from the response
      const eventNameElement = document.getElementById('eventname'); // get the element with ID 'eventname'
      eventNameElement.textContent = eventName; // set the content of the element with ID 'eventname'
    }

    outputEventName(); // calls function to output the event name
  })
  .catch(error => {
    console.error('Error:', error);
  })



  fetch(apiTeamsUrl, requestOptions)  // fetches all teams in events data using get method
    .then(response => {
      // checks if respose is okay if not error is thown, if so program continues
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // returns data in json
      return response.json();
    })
    .then(data => {
      let teamsArray = data.data; // converts json to array
      pushTeamsToArray(); // calls function that pushes team data into array
      addColumnsToTable(); // calls function thatadds array items to table

      // function to push team data into array
      function pushTeamsToArray() {
        for (let i = 0; i < teamsArray.length; i++) {
          teamNamesArr.push(teamsArray[i].team_name); // pushes into teamNamesArr
          teamNumsArr.push(teamsArray[i].number); // pushes into teamNumsArr
          teamOrgsArr.push(teamsArray[i].organization); // pushes into teamOrgsArr
          teamGradesArr.push(teamsArray[i].grade); // pushes into teamGradesArr
          teamCitiesArr.push(teamsArray[i].location.city); // pushes into teamCitiesArr
          teamRegionsArr.push(teamsArray[i].location.region); // pushes into teamRegionsArr
        }
      }
        // function to add the array items + notes columns to the table
        function addColumnsToTable() {
          for (let i = 0; i < teamsArray.length; i++) {
            const newRow = table.insertRow(-1); // Insert a row at the end of the table

            const newNameCell = newRow.insertCell(-1); // Insert a cell into a new column
            newNameCell.textContent = teamNamesArr[i]; // sets text content of newNameCell to current index in teamNamesArr

            const newNumCell = newRow.insertCell(-1); // Insert a cell into a new column
            newNumCell.textContent = teamNumsArr[i]; // sets text content of newNumCell to current index in teamNumsArr
        
            const newOrgCell = newRow.insertCell(-1); // Insert a cell into a new column
            newOrgCell.textContent = teamOrgsArr[i]; // sets text content of newOrgCell to current index in teamOrgsArr
        
            const newGradeCell = newRow.insertCell(-1); // Insert a cell into a new column
            newGradeCell.textContent = teamGradesArr[i]; // sets text content of newGradeCell to current index in teamGradesArr
        
            const newCityCell = newRow.insertCell(-1); // Insert a cell into a new olumn
            newCityCell.textContent = teamCitiesArr[i]; // sets text content of newCityCell to current index in teamCitiesArr
        
            const newRegionCell = newRow.insertCell(-1); // Insert a cell into a new column
            newRegionCell.textContent = teamRegionsArr[i]; // sets text content of newRegionCell to current index in teamRegionsArr

            const newOffenseCell = newRow.insertCell(-1);
            const offenseTextarea = document.createElement('textarea'); // Create a textarea element
            offenseTextarea.setAttribute('rows', '1'); // Set number of rows for textarea
            offenseTextarea.setAttribute('cols', '5'); // Set number of columns for textarea
            newOffenseCell.appendChild(offenseTextarea); // Append the textarea element to the cell

            const newLauncherCell = newRow.insertCell(-1);
            const launcherTextarea = document.createElement('textarea'); // Create a textarea element
            launcherTextarea.setAttribute('rows', '1'); // Set number of rows for textarea
            launcherTextarea.setAttribute('cols', '5'); // Set number of columns for textarea
            newLauncherCell.appendChild(launcherTextarea); // Append the textarea element to the cell

            const newManipulatorCell = newRow.insertCell(-1);
            const manipulatorTextarea = document.createElement('textarea'); // Create a textarea element
            manipulatorTextarea.setAttribute('rows', '1'); // Set number of rows for textarea
            manipulatorTextarea.setAttribute('cols', '5'); // Set number of columns for textarea
            newManipulatorCell.appendChild(manipulatorTextarea); // Append the textarea element to the cell

            const newElevationCell = newRow.insertCell(-1);
            const elevationTextarea = document.createElement('textarea'); // Create a textarea element
            elevationTextarea.setAttribute('rows', '1'); // Set number of rows for textarea
            elevationTextarea.setAttribute('cols', '5'); // Set number of columns for textarea
            newElevationCell.appendChild(elevationTextarea); // Append the textarea element to the cell

            const newNotesCell = newRow.insertCell(-1);
            const notesTextarea = document.createElement('textarea'); // Create a textarea element
            notesTextarea.setAttribute('rows', '5'); // Set number of rows for textarea
            notesTextarea.setAttribute('cols', '50'); // Set number of columns for textarea
            newNotesCell.appendChild(notesTextarea); // Append the textarea element to the cell
            }
          }
    })
    // runs if program catches an error
    .catch(error => {
      console.error('Error:', error); // logs error
    });
});
