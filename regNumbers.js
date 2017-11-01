module.exports = function(registrations) {

    var RegModel = registrations.dbregplates

    const blank = function(req, res, next) {
        registrations.dbregplates.find({}, function(err, done) {
            if (err) {
                return done(err);
            }
            res.render('registrationNumbers/add', {
                done
            })
        })
    }

    const addNoPlate = function(req, res, done) {
        var regPlates = req.body.plates.toUpperCase()
        var data = {
            numberplates: req.body.plates.toUpperCase()
        }
        if (!data || !data.numberplates) {
            req.flash("error", "Text Field should not be blank");
            res.render('registrationNumbers/add');
        }
            if (data.numberplates !== undefined) {
                registrations.dbregplates.findOne({
                    numberplates: req.body.plates.toUpperCase()
                }, function(err, regNum){
                    if(err){
                        return done(err);
                    }
if(regNum === null){
            registrations.dbregplates.create({
                numberplates: regPlates
            }, function(err, plates) {
                if (err) {
                    return done(err);
                }

                if (plates) {
                    registrations.dbregplates.find({}, function(err, plates) {
                        if (err) {
                            return done(err);
                        }
                        var output = {
                            enteredPlates: plates
                        }
                        console.log(output);
                        res.render("registrationNumbers/add", output);
                    })
                }
            })
        }
            if(regNum !== null){
                req.flash("error", "Registration Number already Exits!");
                res.render('registrationNumbers/add');
                console.log("Plate exists")
            }
        })
        }else{
            res.render('registrationNumbers/add')
        }

        }


    const filter = function(req, res, done) {
        var loc = req.body.loc;
        console.log(loc);

        registrations.dbregplates.find({
            numberplates: {
                '$regex':'.*' + loc
            }
        }, function(err, plateFilter) {
            if (err) {
                return done(err);

            } else {
                var filtered = {
                    forTown: plateFilter
                }
                console.log(filtered);
                console.log(plateFilter);
                res.render("registrationNumbers/add", filtered);
            }

        })
    }

    const clear = function(req,res, done){
        registrations.dbregplates.remove({}, function(err,done){
            if (err){
                return done(err)
            }
            res.render('registrationNumbers/add');
        })
    }
    return {
        blank,
        addNoPlate,
        filter,
        clear
    }
}
