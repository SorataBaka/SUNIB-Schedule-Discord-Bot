const axios = require("axios");

const subjectsAndLinksDict = {
    "linear_algebra": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/MATH6030001/020730/2110/LEC/20007",
    "program design method": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/COMP6798001/022009/2110/LEC/22202",
    "Character building pancasila": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/CHAR6013001/021583/2110/LEC/21695",
    "Algorithm And Programming": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/COMP6047001/020538/2110/LAB/23619",
    "ESSE": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/EESE0001/002394/2110/LEC/13276",
    "Indonesian": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/LANG6027001/020841/2110/LEC/20475",
    "Discrete Math": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/MATH6025001/020727/2110/LEC/19976",
    "statistic": "https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/STAT6171001/021813/2110/LEC/21973",

};
module.exports = {
    ///returns a dictionary of [Key:subject ,value assignment json]
    async retrieveAssignment() {
        assignmentNameAndAssignment = {};
        for (var subject in subjectsAndLinksDict) {

            //get inidividual and group assignment
            for (var i = 1; i <= 2; i++) {
                url = subjectsAndLinksDict[subject] + "/" + "0" + i;
                assignmentType = "";
                if (i == 1) {
                    assignmentType = "Individual";
                }
                else if (i == 2) {
                    assignmentType = "Group";
                }
                try {
                    const result = await axios.request({
                        url: url,
                        headers: {
                            'Connection': 'keep-alive',
                            'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
                            'Accept': '*/*',
                            'X-Requested-With': 'XMLHttpRequest',
                            'sec-ch-ua-mobile': '?0',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
                            'sec-ch-ua-platform': '"Windows"',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'cors',
                            'Sec-Fetch-Dest': 'empty',
                            'Referer': 'https://binusmaya.binus.ac.id/newStudent/',
                            'Accept-Language': 'en',
                            'Cookie': process.env.COOKIE,
                        },
                        "referrer": "https://newbinusmaya.binus.ac.id/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                    })
                    if (result.data.length > 0) {

                        assignmentName = subject + "(" + assignmentType + " assignment" + ")"
                        assignmentNameAndAssignment[assignmentName] = result.data;
                    }
                } catch (error) {
                    console.log("error");
                    console.error(error);
                }

            }
        }
        return assignmentNameAndAssignment;
    },

};
