module.exports.createSenior = function(req, res){
    readFromDB((doctors) =>{
        for(let doctor of doctors){
            doctor.isSenior = false
        }
        var data = req.body
        createNewDoctor(data.name, data.age, true, null, (newDoctor) =>{
            return res.send(newDoctor)
        })
    })
    
}



module.exports.update = function(req, res){
    for(let doctor of doctors_arr){
        if(doctor.id == req.params.id){
            doctor.name = req.body.name;
            doctor.age = req.body.age
            return res.send(doctor)
        }
    }
    return res.send('Not found')
}

module.exports.deleteDoctor = function(req, res){
    for(let doctor of doctors_arr){
        if(doctor.id == req.params.id){
            let index = doctors_arr.indexOf(doctor)
            doctors_arr.splice(index, 1)
            return res.send('deleted')
        }
    }

    return res.send('Not found')
}