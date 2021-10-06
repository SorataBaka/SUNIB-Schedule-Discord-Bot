const axios = require("axios")
module.exports = class StudentInstance {
    constructor(PARAMETERS){
        if(typeof PARAMETERS != "object") throw "Invalid parameter data type" 
        const{ academicCareer, institution, role, bearer, cookie } = PARAMETERS
        if(!academicCareer || !institution || !role || !bearer || !cookie) throw "Invalid parameters provided"
        this.bearer = bearer
        this.cookie = cookie
        this.academicCareer = academicCareer
        this.institution = institution
        this.role = role

        this.roleActivity = {
            "roleActivity" : [
                {
                    "academicCareer": this.academicCareer,
                    "institution": this.institution,
                }
            ]
        }
        this.headers = {
            "academiccareer": this.academicCareer,
            "accept": "application/json",
            "authorization": this.bearer,
            "content-type": "application/json",
            "institution": this.institution,
            "roid": "1a9be1f8-2a2b-4669-a548-4b24b9e44f35",
            "roleid": "4bcb81bd-46a8-4a09-a923-5e812cb7007b",
            "rolename": "Student",
        }   
    }
    schedule = async(year, month, day) =>{
        if(!year && !month && !day){
            const currentDate = new Date().toLocaleString("id-ID", {timeZone: "Asia/Jakarta"})
            year = parseInt(currentDate.split(" ")[0].split("/")[2])
            month = parseInt(currentDate.split(" ")[0].split("/")[1])
            day = parseInt(currentDate.split(" ")[0].split("/")[0])
        }
        var error;
        if(isNaN(year) || isNaN(month) || isNaN(day)) throw "Invalid data type for schedule function."
        const fullDate = `${year}-${month}-${day}`
        const schedule = await axios.request({
            method: "POST",
            url: `https://func-bm7-schedule-prod.azurewebsites.net/api/Schedule/Month-v1/${fullDate}`,
            mode: "cors",
            referrer: "https://newbinusmaya.binus.ac.id/",
            referrerPolicy: "strict-origin-when-cross-origin",
            headers: this.headers,
            data: this.roleActivity
            
        }).then((data, err) => {
            if(data) return data.data
            if(err) return error
        }).catch(err => {
            console.log(err)
            return error
        })
        return schedule[0]?.Schedule
    }
    fetch = async(OPTION) => {
        if(typeof OPTION != "object") throw "Invalid data type for OPTION"
        if(!OPTION || !OPTION.status) throw "Insufficient options"
        var optionArray = OPTION.status.toLowerCase().split("")
        optionArray[0] = optionArray[0].toUpperCase()
        optionArray = optionArray.join("")
        var error;
        const fetchupcoming = await axios.request({
            method: "GET",
            url: `https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/ClassSession/${optionArray}/student`,
            referrer: "https://newbinusmaya.binus.ac.id",
            referrerPolicy: "strict-origin-when-cross-origin",
            mode: "cors",
            headers: this.headers,
        }).then((data, err) => {
            if(err) return error
            const obj = data.data
            if(obj.data) return obj.data[0]
            return obj
        }).catch(err => {
            return error
        })
        return fetchupcoming
    }
}