const tableEl = $("table");
const saveBtn = $(".saveBtn");
const revBtn = $(".revert");
const dayEl = $("#currentDay");
const trList = tableEl.children().eq(0).children();

var stored = ["", "", "", "", "", "", "", "", ""];
if(JSON.parse(localStorage.getItem("scheduler"))===null){
    localStorage.setItem("scheduler", JSON.stringify(stored));
}else{
    stored = JSON.parse(localStorage.getItem("scheduler"));
}

for (let i = 0; i < trList.length; i++) {
    
    //console.log(stored[i])

    trList.eq(i).children().eq(1).children().eq(0).val(stored[i]);

    
}


saveBtn.on("click", function (e) {
    
    let rowNum = parseInt($(e.target).attr("id"));

    stored[rowNum] = trList.eq(rowNum).children().eq(1).children().eq(0).val();
    localStorage.setItem("scheduler", JSON.stringify(stored));

});
revBtn.on("click", function (e) {
    
    let rowNum = parseInt($(e.target).attr("id"));

    trList.eq(rowNum).children().eq(1).children().eq(0).val(stored[rowNum]);
    updateChart();
    localStorage.setItem("scheduler", JSON.stringify(stored));

});



function updateChart() {
    let now = moment();
    let hour = parseInt(now.format("HH"));

    for (let j = 0; j < trList.length; j++) {
        if(parseInt(trList.eq(j).attr("data-hour")) < hour){
            trList.eq(j).attr("id", "past");
        }else if(parseInt(trList.eq(j).attr("data-hour")) === hour){
            trList.eq(j).attr("id", "present");
        }else{
            trList.eq(j).attr("id", "future");
        }
    }
}

dayEl.text("Today is " + moment().format("dddd, MMMM Do, YYYY."));
updateChart()

var renderer = setInterval(function(){
    
    updateChart();

}, 60000);