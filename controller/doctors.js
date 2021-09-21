const fs = require('fs')


function createNewDoctor(name, age, senior=false, salary=null, cb){
    readFromDB((doctors) => {
        let newDoctor = {
            id: doctors.length + 1,
            name: name,
            age: age,
            isSenior: senior,
            salary: salary
        }
        saveInDB(newDoctor, (doctor) =>{
            cb(doctor)
        })
    })
}

function readFromDB(cb){
    fs.readFile('./data.txt', (err, data) => {
        cb(JSON.parse(data.toString()));
    }) 
}

function saveInDB(newDoctor, cb){
    readFromDB((doctors) =>{
        let doctor = {...newDoctor, id: doctors.length + 1}
        doctors.push(doctor);
        fs.writeFile("./data.txt", JSON.stringify(doctors), () => {
            cb(doctor);
        })
    }) 
}

function getByID(id, cb){
    readFromDB((doctors) => {
        for(let doctor of doctors){
            if(doctor.id == id){
                return cb(doctor)
            }
        }
        cb(null)
    })
}






module.exports.index = function (req, res){
    readFromDB((doctors) => {
        res.send(doctors)
    })
}

module.exports.create = function(req, res){
    var data = req.body
    createNewDoctor(data.name, data.age, false, null, (newDoctor) =>{
        return res.send(newDoctor)
    })
}

module.exports.details = function(req, res){
    getByID(req.params.id, (doctor) =>{
        if(doctor == null){
            return res.send("not found")
        }
        return res.send(doctor)
    })
}
