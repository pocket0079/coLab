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

const yearInput = document.getElementById('year');
const driverChamp = document.getElementById('driverChamp');
const constructor = document.getElementById('constructor');
const champPoints = document.getElementById('champPoints');
const runnerUp = document.getElementById('runnerUp');
const runnerUpConstructor = document.getElementById('runnerUpConstructor');
const runnerUpPoints = document.getElementById('runnerUpPoints');

const loadingElement = document.getElementById('loading');

// Create a variable to store the user's input
let selectedYear;

// Add an event listener to the input element
yearInput.addEventListener('input', function (event) {
    // Retrieve the user's input value
    selectedYear = parseInt(event.target.value);

    // Call the API with the selected year
    formulaOneApp.getData(selectedYear);
    // Show the loading element
    loadingElement.style.display = 'block';
});

const formulaOneApp = {};

formulaOneApp.baseUrl = 'http://ergast.com/api/f1/';

formulaOneApp.getData = (year) => {

    formulaOneApp.clearData();

    // Hide the loading element after the data is processed
    loadingElement.style.display = 'none';

    const apiUrl = `${formulaOneApp.baseUrl}${year}/driverStandings.json`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            // Process the API response data
            formulaOneApp.champName = `${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName} ${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName}`;

            formulaOneApp.champTeam = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name;

            formulaOneApp.champPoints = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;

            formulaOneApp.runnerUpName = `${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].Driver.givenName} ${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].Driver.familyName}`;

            formulaOneApp.runnerUpTeam = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].Constructors[0].name;

            formulaOneApp.runnerUpPoints = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1].points;

            formulaOneApp.processData(data);

            // Hide the loading element after the data is processed
            loadingElement.style.display = 'none';
        })
        .catch((error) => {
            console.log('Error:', error);
            // Hide the loading element in case of an error
            loadingElement.style.display = 'none';
        });
};

formulaOneApp.clearData = () => {
    driverChamp.innerHTML = '';
    constructor.innerHTML = '';
    champPoints.innerHTML = '';
    runnerUp.innerHTML = '';
    runnerUpConstructor.innerHTML = '';
    runnerUpPoints.innerHTML = '';
};

formulaOneApp.processData = () => {
    driverChamp.innerHTML = formulaOneApp.champName;
    constructor.innerHTML = formulaOneApp.champTeam;
    champPoints.innerHTML = formulaOneApp.champPoints;
    runnerUp.innerHTML = formulaOneApp.runnerUpName;
    runnerUpConstructor.innerHTML = formulaOneApp.runnerUpTeam;
    runnerUpPoints.innerHTML = formulaOneApp.runnerUpPoints;
};
