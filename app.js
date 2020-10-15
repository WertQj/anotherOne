const UserRepository = require('./repositories/userRepository');
const PlanetRepository = require('./repositories/planetsRepository');
const Planet = require('./models/planets');
const readlineSync = require('readline-sync');
const userRepo = new UserRepository('./data/users.json');
const planetRepo = new PlanetRepository('./data/planets.json');

function checkIfNumber(id) {
    if (!isNaN(id)) {
        return 0;
    }
    return 1;
}

function Get_users() {
    const Users = userRepo.getUsers();
    console.log("All users:");
    Users.forEach(item => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log("id: " + item.id + "\nlogin: " + item.login + "\nfullname: " + item.fullname);

    });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

function Get_user(input) {
    if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
        const User = userRepo.getUserById(parseInt(input.substr(input.lastIndexOf('/') + 1)));
        console.log("User:");
        if (User == null) {
            console.log("User with this id doesn't exist");
        }
        else {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            console.log("id: " + User.id + "\nlogin: " + User.login + "\nfullname: " + User.fullname);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        }
    }
    else {
        console.log("Something wrong with id");
    }

}

function Get_Planets() {
    const Planets = planetRepo.getPlanet();
    console.log("Planet list:");
    Planets.forEach(item => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log("id: " + item.id + "\nsat: " + item.sat + "\nname: " + item.name +"\ndiscoverer:" +item.discoverer + "\nmass:" + item.mass);

    });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

function Get_Planet(input) {
    if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
        const Planet = planetRepo.getPlanetById(parseInt(input.substr(input.lastIndexOf('/') + 1)));
        console.log("Planet:");
        if (Planet == null) {
            console.log("Planet with this id doesn't exist");
        }
        else {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("id: " + Planet.id + "\namong of sat's: " + Planet.sat + "\nname: " + Planet.name + "\ndiscoverer:" + Planet.discoverer + + "\nmass:" + Planet.mass);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        }
    }
    else {
        console.log("Something wrong with id");
    }

}

function Delete_Planet(input) {
    try {
        if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
            planetRepo.deletePlanet(parseInt(input.substr(input.lastIndexOf('/') + 1)));
            console.log("Planet was deleted");
        }
        else {
            console.log("Something wrong with id");
        }
    }
    catch (err) {
        console.error(err);
    }
}

function Update_Planet(input) {
    if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
        const Planet = planetRepo.getPlanetById(parseInt(input.substr(input.lastIndexOf('/') + 1)));
        if (Planet == null) {
            console.log("Planet with this id doesn't exist");
        }
        else {
            Planet.discoverer = readlineSync.question('Old name of discoverer: ' + Planet.discoverer + '\nEnter new planet discoverer: ');
            Planet.name = readlineSync.question('Old name: ' + Planet.name + '\nEnter new planet name: ');
            Planet.sat = readlineSync.question('Numbers of sats was: ' + Planet.sat + '\nEnter new number: ');
            Planet.mass = readlineSync.question('Old mass is: ' + Planet.mass + '\nEnter new planet mass: ');
            if (checkIfNumber(mass) == 0) {
                if (parseInt(mass) > 0) {
                    Planet.mass = parseInt(mass);
                }
                else {
                    console.log("It's impossible\nPlanet wasn`t updated");
                    return 1;
                }
            }

        }
            let time = new Date();
            Planet.timeDownload = time.toISOString();
            planetRepo.updatePlanet(Planet);
            console.log("Planet was updated");
    }
    else {
        console.log("Something wrong with id");
    }
}

function Add_Planet() {
    const discoverer = readlineSync.question('Enter planet discoverer: ');
    const name = readlineSync.question('Enter planet name: ');
    const sat = readlineSync.question('Enter number of sats: ');
    const mass = readlineSync.question('Enter planet mass: ');
    if (checkIfNumber(mass) == 0) {
        if (parseInt(mass) > 0) {
            Planet.mass = parseInt(mass);
        }
        else {
            console.log("It's impossible\nPlanet wasn`t updated");
            return 1;
        }
    }

    let time = new Date();
    const id = 0;
    const planet = new Planet(id, discoverer, name, sat, time.toISOString(),mass);
    const id_of_planet = planetRepo.addPlanet(planet);
    console.log("Planet was added with id: " + id_of_planet);
}

function Menu(input) {
    if (input === 'get/users') {
        Get_users();
    }
    else if (input.includes('get/user/')) {
        Get_user(input);
    }
    else if (input === 'get/planets') {

        Get_Planets();
    }
    else if (input.includes('get/planet/')) {
        Get_Planet(input);
    }

    else if (input.includes('delete/planet/')) {
        Delete_Planet(input);
    }

    else if (input.includes('update/planet/')) {
        Update_Planet(input);
    }
    else if (input === 'add/planet') {
        Add_Planet();
    }
    else {
        console.log("Wrong command");
    }
}

while (true) {
    try {
        const input = readlineSync.question('Enter command or press Enter to leave: ').trim();
        if (input.length === 0) break;
        Menu(input);
    }
    catch (err) {
        console.log(err);
    }
}
