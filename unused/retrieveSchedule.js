//Pass in the starting date for the schedule.
const axios = require("axios")
const bearer = process.env.BEARER
const data = process.env.DATA
module.exports = async(year, month, day)=> {
  var error;
  if(isNaN(year) || isNaN(month) || isNaN(day)){
    return error
  }
  const fullDate = `${year}-${month}-${day}`
  const schedule = await axios.request({
    url: `https://func-bm7-schedule-prod.azurewebsites.net/api/Schedule/Month-v1/${fullDate}`,
    headers: {
      "academiccareer": "RS1",
      "accept": "application/json",
      "authorization": bearer,
      "content-type": "application/json",
      "institution": "BNS01",
      "roid": "1a9be1f8-2a2b-4669-a548-4b24b9e44f35",
      "roleid": "4bcb81bd-46a8-4a09-a923-5e812cb7007b",
      "rolename": "Student",
      "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "https://newbinusmaya.binus.ac.id/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    data: "{\"roleActivity\":[{\"name\":\"Student\",\"userCode\":\"2501972455\",\"roleId\":\"4bcb81bd-46a8-4a09-a923-5e812cb7007b\",\"roleType\":\"student\",\"roleOrganizationId\":\"1a9be1f8-2a2b-4669-a548-4b24b9e44f35\",\"academicCareerId\":\"d98ce516-1068-4f75-8324-63587cc631f0\",\"academicCareer\":\"RS1\",\"academicCareerDesc\":\"Undergraduate\",\"institutionId\":null,\"institution\":\"BNS01\",\"institutionDesc\":\"BINUS University\",\"isPrimary\":true,\"isActive\":true}]}",
    "method": "POST",
    "mode": "cors"

  }).then((data, err)=>{
    if(data) return data.data
    if(err) return error
    // const jsondata = JSON.stringify(data.data)
    // fs.writeFileSync("schedule3.json", jsondata)
  }).catch(err =>{
    return error
  })

  return schedule[0]?.Schedule


}