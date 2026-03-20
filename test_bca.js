const fs = require('fs');

let oldData = {
  Math: {
    "UNIT 1": { video: "v1", notes: "n1", pdf: "", assignment: "", homework: "" }
  }
};

let allSubjects = {
  "Discrete Maths": oldData.Math
};

let defaultData = {
  "BCA": { "DDU": {}, "AKTU": {} }
};

for (let course in defaultData) {
  for (let branch in defaultData[course]) {
    for (let i = 1; i <= 6; i++) {
      defaultData[course][branch][i] = JSON.parse(JSON.stringify(allSubjects));
    }
  }
}

let data = {
  "BCA": {
    "DDU": {
      // simulate firebase payload
      "_initialized": true
    },
    "AKTU": {}
  }
};

const enforceBCA = (targetData) => {
  if (!targetData["BCA"]) {
    targetData["BCA"] = JSON.parse(JSON.stringify(defaultData["BCA"]));
  } else {
    ['DDU', 'AKTU'].forEach(branch => {
      if (!targetData["BCA"][branch]) {
        targetData["BCA"][branch] = JSON.parse(JSON.stringify(defaultData["BCA"][branch]));
      } else {
        for (let i = 1; i <= 6; i++) {
          if (!targetData["BCA"][branch][i] || (Object.keys(targetData["BCA"][branch][i]).length === 0 && !targetData["BCA"][branch][i]._initialized)) {
            targetData["BCA"][branch][i] = JSON.parse(JSON.stringify(defaultData["BCA"][branch][i]));
          }
        }
      }
    });
  }
};

enforceBCA(data);

let html = "";
let sems = data["BCA"]["DDU"];
for (let s in sems) {
    if (s === "_initialized") continue;
    html += `<div class="box" onclick="openStudentLevel('semester', '${s}')">📅 Semester ${s}</div>`;
}

console.log("HTML generated for DDU:", html);
console.log(data["BCA"]["DDU"]);
