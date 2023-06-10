//night mode
function toggleNightMode() {
    const body = document.body;
    const sections = document.getElementsByClassName('nightModeSection');
    const projectButton = document.getElementsByClassName('projectButton');
    const socialIcons = document.getElementsByClassName('socialIcons');

    body.classList.toggle("nightMode");

    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.toggle("nightModeSelection");
    }

    for (let i = 0; i < projectButton.length; i++) {
        projectButton[i].classList.toggle("nightModeButtons");
    }

    for (let i = 0; i < socialIcons.length; i++) {
        socialIcons[i].classList.toggle("nightModeButtons");
    }
}

//mobile nav
const navLinks = document.querySelectorAll('.mobileNavItem');
const hamburgerButton = document.querySelector('#hamburger');
const menuCloseButton = document.querySelector('#menuClose');
const menu = document.querySelector('.slideOutNav');

const closeMenu = () => {
    menu.classList.remove('open');
}

hamburgerButton.addEventListener('click', (e) => {
    menu.classList.add('open');
});

menuCloseButton.addEventListener('click', (e) => {
    closeMenu();
});

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        closeMenu()
    })
})


const formulaOneApp = {};

const yearInput = document.getElementById('year');

// Add the loadingElement property to the formulaOneApp object
formulaOneApp.loadingElement = document.getElementById('loading');

// Create a variable to store the user's input
let selectedYear;

// Add an event listener to the input element
yearInput.addEventListener('input', function (event) {
    // Retrieve the user's input value
    selectedYear = parseInt(event.target.value);

    console.log(selectedYear);

    // Call the API with the selected year
    formulaOneApp.getData(selectedYear);
    // Show the loading element
    formulaOneApp.loadingElement.style.display = 'block';
});

formulaOneApp.baseUrl = 'http://ergast.com/api/f1/';
formulaOneApp.driverChamp = document.getElementById('driverChamp');
formulaOneApp.constructorElement = document.getElementById('constructor');
formulaOneApp.champPoints = document.getElementById('champPoints');
formulaOneApp.runnerUp = document.getElementById('runnerUp');
formulaOneApp.runnerUpConstructor = document.getElementById('runnerUpConstructor');
formulaOneApp.runnerUpPoints = document.getElementById('runnerUpPoints');

formulaOneApp.getData = (year) => {
    formulaOneApp.clearData();

    // Hide the loading element after the data is processed
    formulaOneApp.loadingElement.style.display = 'none';

    const apiUrl = `${formulaOneApp.baseUrl}${year}/driverStandings.json`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            // Process the API response data
            const champName = `${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName} ${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName}`;
            const champTeam = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name;
            const champPointsData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
            const runnerUpName = `${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].Driver.givenName} ${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].Driver.familyName}`;
            const runnerUpTeam = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].Constructors[0].name;
            const runnerUpPointsData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].points;

            formulaOneApp.champName = champName;
            formulaOneApp.champTeam = champTeam;
            formulaOneApp.champPointsData = champPointsData;
            formulaOneApp.runnerUpName = runnerUpName;
            formulaOneApp.runnerUpTeam = runnerUpTeam;
            formulaOneApp.runnerUpPointsData = runnerUpPointsData;

            console.log(formulaOneApp.champPoints)

            formulaOneApp.processData();

            // Hide the loading element after the data is processed
            formulaOneApp.loadingElement.style.display = 'none';
        })
        .catch((error) => {
            console.log('Error:', error);
            // Hide the loading element in case of an error
            formulaOneApp.loadingElement.style.display = 'none';
        });
};

formulaOneApp.processData = () => {
    formulaOneApp.driverChamp.innerHTML = formulaOneApp.champName;
    formulaOneApp.constructorElement.innerHTML = formulaOneApp.champTeam;
    formulaOneApp.champPoints.innerHTML = formulaOneApp.champPointsData;
    formulaOneApp.runnerUp.innerHTML = formulaOneApp.runnerUpName;
    formulaOneApp.runnerUpConstructor.innerHTML = formulaOneApp.runnerUpTeam;
    formulaOneApp.runnerUpPoints.innerHTML = formulaOneApp.runnerUpPointsData;
};

formulaOneApp.clearData = () => {
    formulaOneApp.driverChamp.innerHTML = '';
    formulaOneApp.constructorElement.innerHTML = '';
    formulaOneApp.champPoints.innerHTML = '';
    formulaOneApp.runnerUp.innerHTML = '';
    formulaOneApp.runnerUpConstructor.innerHTML = '';
    formulaOneApp.runnerUpPoints.innerHTML = '';
};

// Loop to generate years
for (let year = 1950; year <= 2023; year++) {
    let option = document.createElement("option");
    option.text = year;
    option.value = year;
    yearInput.appendChild(option);
}
