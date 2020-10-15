const Planet = require('../models/planets');
const JsonStorage = require('../jsonStorage');

const fs = require('fs');
class PlanetRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
        this.filePath = filePath;
    }
    addPlanet(planet) {
        const jsonArr = this.storage.readItems();
        planet.id = this.storage.nextId;
        jsonArr.items.push(planet);
        this.storage.writeItems(jsonArr);
        this.storage.incrementNextId();
        return this.storage.nextId - 1;
    }

    getPlanet() {
        const items = this.storage.readItems().items;
        return items;
    }

    getPlanetById(id) {
        const items = this.storage.readItems().items;
        let planet = null;
        items.forEach(item => {
            if (item.id === id) {
                planet = new Planet(item.id, item.discoverer , item.name, item.sat, item.timeDownload, item.mass);
            }
        });
        return planet;
    }

    updatePlanet(planet) {
        const planetArray = this.storage.readItems();
        let exist = false;
        planetArray.items.forEach(element => {
            if (element.id == planet.id) {
                exist = true;
            }
        });
        if (exist) {
            planetArray.items[planetArray.items.findIndex(item => item.id === planet.id)] = planet;
            this.storage.writeItems(planetArray);
        }
        else {
            throw 'Not found element with such id';
        }
    }
    deletePlanet(planet_id) {
        const planetArray = this.storage.readItems();
        let exist = false;
        planetArray.items.forEach(element => {
            if (element.id == planet_id) {
                exist = true;
            }
        });
        if (exist) {
            planetArray.items = planetArray.items.filter(item => item.id !== planet_id);
            this.storage.writeItems(planetArray);
            fs.writeFileSync(this.filePath, JSON.stringify(planetArray, null, 4), (err) => {
                if (err) throw err;
            });
        }
        else {
            throw 'Not found element with such id';
        }
    }
};

module.exports = PlanetRepository;