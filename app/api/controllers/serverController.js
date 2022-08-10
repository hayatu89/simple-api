'use strict';
exports.howOld = function (req, res) {
    if (dateValidation(req.params.dob) === true) {
        var dob = new Date(req.params.dob+"T00:00");
        if (dob.getTime()> Date.now()) {
            res.status(400).send({
                status: false,
                message:'Invalid Date. Choose days in the past not future'});
        }
        res.send({
            status:true,
            data: {
                age: calculateAge(req.params.dob)
            },
            message: 'successful'
        });
    } else {
        res.status(400).send({
            status: false,
            message:'Invalid Format. Valid format is YYYY-MM-DD'});
    }
}

//Validate Date format
function dateValidation(dateString){      
    let dateformat = /^[+-]?\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;      
          
    if(dateString.match(dateformat)){

        let operator = dateString.split('-');      
         
        let datepart = [];      
        if (operator.length>1){      
            datepart = dateString.split('-');      
        }      
        let year= parseInt(datepart[0]);      
        let month = parseInt(datepart[1]);      
        let day = parseInt(datepart[2]);      
                 
        let ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];      
        if (month==1 || month>2){      
            if (day>ListofDays[month-1]){           
                return false;      
            }      
        }else if (month==2){      
            let leapYear = false;      
            if ( (!(year % 4) && year % 100) || !(year % 400)) {      
                leapYear = true;      
            }      
            if ((leapYear == false) && (day>=29)){      
                return false;      
            }else      
            if ((leapYear==true) && (day>29)){          
                return false;      
            }      
        }      
    }else{           
        return false;      
    }      
    return true;      
}  
function calculateAge(dob) {
    var birthDate = new Date(dob+"T00:00");
    var difference = Math.abs(Date.now() - birthDate.getTime());
    var age = new Date(difference);
    var days = Number(Math.abs(age.getDay()));
    var months = Number(Math.abs(age.getMonth()+1));
    var years = Number(Math.abs(age.getFullYear()-1970));
    var text = ({
        days: days == 1 ? "day" : "days",
        months: months == 1 ? "month" : "months",
        years: years == 1 ? "year" : "years"
    });
    var msg = years + " " + text.years + " " + months + " " + text.months + " " + days + " " + text.days;
    return msg;
} 