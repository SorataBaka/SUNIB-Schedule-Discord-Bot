const axios = require("axios")
const bearer = process.env.BEARER

module.exports = async(client) =>{
    var error;
    const fetch = await axios.request({
        url: "https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/ClassSession/Upcoming/student",
        headers: {
            "academiccareer": "RS1",
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
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
        "body": null,
        "method": "GET",
        "mode": "cors"
    }).then((data, err)=>{
        if(err) return error
        const obj = data.data
        return obj
    }).catch(err =>{
        return error
    })
    return fetch
}