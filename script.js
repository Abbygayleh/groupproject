var PlayerRegistrationData = [];
var correct_response = 0;
var incorrect_response = 0;
var totalQuestions = 0;

function calculateAge() {
    var dobInput = document.getElementById('DOB').value;
    var dob = new Date(dobInput);
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }

    // Validate age to be between 8 and 12
    if (age < 8 || age > 12) {
        alert('You need to be between 8 and 12 years old to participate.');
        document.getElementById('age').value = '';
        
    } else {
        // Display the calculated age in the 'age' input field
        document.getElementById('age').value = age;
    }
}


function Register() {
    var Firstname = document.getElementById('Fname').value;
    var Lastname = document.getElementById('Lname').value;
    var Gmail = document.getElementById('mail').value;
    var dob = document.getElementById('DOB').value;
    var gender = document.getElementById('Gender').value;
    var AGE = parseInt(document.getElementById('age').value, 10);
    var Education = document.getElementById('edu').value;

    totalQuestions = 0;

    if (Firstname.trim() === '') {
        alert('Please enter your First name.');
        return;
    }

    if (Lastname.trim() === '') {
        alert('Please enter your Last name.');
        return;
    }

    if (Gmail.trim() === '') {
        alert('Please enter your Email.');
        return;
    }

    if (dob.trim() === '') {
        alert('Please enter your date of birth.');
        return;
    }

    if (Education.trim() === '') {
        alert('Please enter your Education.');
        return;
    }

    var player = {
        Firstname: Firstname,
        Lastname: Lastname,
        Gmail: Gmail,
        dob: dob,
        gender: gender,
        AGE: AGE,
        Education: Education,
    };

    PlayerRegistrationData.push(player);

    // Disable specific form elements after registration
    var formElementsToDisable = document.querySelectorAll("#registrationForm input:not(#answer):not([type='button']), #registrationForm textarea, #registrationForm select");
    formElementsToDisable.forEach(function (element) {
        element.disabled = true;
    });

    var buttonElement = document.querySelector("#registrationForm .cool-button");
    buttonElement.disabled = true;

    var playGameBtnElement = document.getElementById("playbtn");
    playGameBtnElement.disabled = false;

}


function PlayGame() {
    document.getElementById('answer').disabled = false;
    const int1 = Math.floor(Math.random() * 9) + 1;
    const int2 = Math.floor(Math.random() * 5) + 1;
    const correct_answer = int1 * int2;

    totalQuestions++;

    document.getElementById('equation').innerText = int1 + " * " + int2 + " = ?";
    document.getElementById('answer').value = '';

    document.getElementById('table').style.display = 'table';
    document.getElementById('playarea').style.display = 'block';

    document.getElementById('acceptButton').disabled = false;
    document.getElementById('nextButton').disabled = false;

    return correct_answer;
}

function CheckAnswer() {
    const user_input = document.getElementById('answer').value;

    if (isNaN(user_input)) {
        alert("Please enter a valid number.");
        return;
    }

    const correct_answer = PlayGame();

    if (user_input == correct_answer) {
        correct_response++;
        alert("Correct!!!");
    } else {
        incorrect_response++;
        alert("Incorrect :(");
    }

    var answers = {
        correct_response: correct_response,
        incorrect_response: incorrect_response
    };

    PlayerRegistrationData.push(answers);

    showAllStats();
}

function findPercentageScore() {
    // Clear the 'showpercentage' statistic display area
    document.getElementById('showpercentage').value = '';

    // Get the first player's data (if available)
    var firstPlayer = PlayerRegistrationData[0] || {};
    var firstName = firstPlayer.Firstname || '';
    var lastName = firstPlayer.Lastname || '';

    // Combine first name and last name if available
    var playerName = firstName + lastName;


    // Get number of correct answers
    var correctAnswers = correct_response;

    // Calculate percentage score
    var percentageScore;

    if (totalQuestions === 0) {
        percentageScore = 0;
    } else {
        percentageScore = (correctAnswers / totalQuestions) * 100;
    }
    

    // Get the current date
    var currentDate = new Date().toLocaleDateString();

    // Display the statistics in the 'showpercentage' textarea
    var statisticsMessage = "Player's Name: " + playerName + "\n" +
        "Total Number of Questions: " + totalQuestions + "\n" +
        "Number of Correct Answers: " + correctAnswers + "\n" +
        "Percentage Score: " + percentageScore.toFixed(2) + "%\n" +
        "Current Date: " + currentDate;

    document.getElementById('showpercentage').value = statisticsMessage;

    // Reset the form and re-enable input fields
    var formElements = document.querySelectorAll("input, textarea, select");
    formElements.forEach(function (element) {
        element.disabled = false;
        element.value = '';
    });

    // Enable the register button
    document.querySelector(".cool-button").disabled = false;
}


function showAllStats() {
    // Clear the display area
    document.getElementById('showallplayers').value = '';

    // Iterate through each player's data in the PlayerRegistrationData array
    PlayerRegistrationData.forEach(function (player, index) {
        var playerName = player.Firstname + ' ' + player.Lastname;
        var age = player.AGE;

        var questionsAndAnswers = '';
        var playerStats = PlayerRegistrationData[index + 1]; // Player's stats are stored in the next entry

        // Calculate percentage score
        var totalQuestions = playerStats ? playerStats.correct_response + playerStats.incorrect_response : 0;
        var percentageScore = totalQuestions === 0 ? 0 : (playerStats.correct_response / totalQuestions) * 100;

        // Display the data in the showallplayers display area
        var playerDataString = playerName + ', ' + age + ', ' + ', Percentage Score: ' + percentageScore.toFixed(2) + '%\n';

        document.getElementById('showallplayers').value += playerDataString;
    });
}

function showCharts() {
    // Clear the showcharts div
    document.getElementById('showcharts').innerHTML = '';

    // Count instances and calculate percentages for gender
    var totalPersons = PlayerRegistrationData.length;
    var femaleCount = 0;

    for (var i = 0; i < totalPersons; i++) {
        if (PlayerRegistrationData[i].gender === 'Female') {
            femaleCount++;
        }
    }

    var maleCount = totalPersons - femaleCount;

    var percentageFemale = (femaleCount / totalPersons) * 100;
    var percentageMale = (maleCount / totalPersons) * 100;

    // Create bar chart for gender
    var genderChart = `
        <table>
            <tr>
                <td><img src="Barchart.PNG" width="${percentageFemale}%" title="Female: ${percentageFemale}%" alt="Female"></td>
                <td><img src="Barchart.PNG" width="${percentageMale}%" title="Male: ${percentageMale}%" alt="Male"></td>
            </tr>
            <tr>
                <td>Female</td>
                <td>Male</td>
            </tr>
        </table>
    `;

    // Count instances and calculate percentages for percentage scores
    var percentageRanges = ['<50', '50-59', '60-69', '70-79', '80-89', '90-99', '100'];
    var percentageCounts = [0, 0, 0, 0, 0, 0, 0];

    for (var j = 0; j < totalPersons; j++) {
        var player = PlayerRegistrationData[j];
        var percentage = (player.correct_response / (player.correct_response + player.incorrect_response)) * 100;

        if (percentage < 50) {
            percentageCounts[0]++;
        } else if (percentage >= 50 && percentage <= 59) {
            percentageCounts[1]++;
        } else if (percentage >= 60 && percentage <= 69) {
            percentageCounts[2]++;
        } else if (percentage >= 70 && percentage <= 79) {
            percentageCounts[3]++;
        } else if (percentage >= 80 && percentage <= 89) {
            percentageCounts[4]++;
        } else if (percentage >= 90 && percentage <= 99) {
            percentageCounts[5]++;
        } else {
            percentageCounts[6]++;
        }
    }

    // Create bar chart for percentage scores
    var percentageChart = `
        <table>
            <tr>
                <td><img src="Barchart.PNG" width="${percentageCounts[0]}%" title="<50: ${percentageCounts[0]}%" alt="<50"></td>
                <td><img src="Barchart.PNG" width="${percentageCounts[1]}%" title="50-59: ${percentageCounts[1]}%" alt="50-59"></td>
                <td><img src="Barchart.PNG" width="${percentageCounts[2]}%" title="60-69: ${percentageCounts[2]}%" alt="60-69"></td>
                <td><img src="Barchart.PNG" width="${percentageCounts[3]}%" title="70-79: ${percentageCounts[3]}%" alt="70-79"></td>
                <td><img src="Barchart.PNG" width="${percentageCounts[4]}%" title="80-89: ${percentageCounts[4]}%" alt="80-89"></td>
                <td><img src="Barchart.PNG" width="${percentageCounts[5]}%" title="90-99: ${percentageCounts[5]}%" alt="90-99"></td>
                <td><img src="Barchart.PNG" width="${percentageCounts[6]}%" title="100: ${percentageCounts[6]}%" alt="100"></td>
            </tr>
            <tr>
                <td>&lt;50</td>
                <td>50-59</td>
                <td>60-69</td>
                <td>70-79</td>
                <td>80-89</td>
                <td>90-99</td>
                <td>100</td>
            </tr>
        </table>
    `;

    // Display the charts in the showcharts div
    document.getElementById('showcharts').innerHTML = genderChart + percentageChart;
}

// Call the showCharts function every 5 seconds
setInterval(showCharts, 5000);

// Initial call to display the charts when the page loads
showCharts();

