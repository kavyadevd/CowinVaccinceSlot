var ev;
function CallAPI(e) {
  ev= e;
 $.ajax({
        async: true,
        type: "GET",
        url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=389&date=31-03-2021",
        contentType: "application/json; charset=utf-8",
        async: false,
       success: OnSuccessDataFetch,
            failure: function (response) {
                console.log(response.d);
            }
    });
}

function OnSuccessDataFetch(response) {
    try {
        if (response == null || response.sessions == null) {
            document.getElementById('lblError1').innerHTML = "Data not found."
            return;
        }
        var BudgetData = (response.sessions);
        if (BudgetData.length < 1) {
            document.getElementById('lblError1').innerHTML = "Data not found."
            return;
        }
         if(BudgetData){
                var len = BudgetData.length;
                var txt = "";
                if(len > 0){
                    for(var i=0;i<len;i++){
                        if(BudgetData[i].available_capacity>0){
                            txt += '<tr><td>'+BudgetData[i].available_capacity+'</td><td>'+BudgetData[i].date+'</td><td>'+BudgetData[i].min_age_limit+'</td><td>'+BudgetData[i].vaccine+'</td><td colspan="3">' +BudgetData[i].slots.toString()+'</td><td colspan="2">'+BudgetData[i].name+'</td></tr>';
                        }
                    }
                    if(txt != ""){
                        $("#table").append(txt).removeClass("hidden");
                    }
                }
            }
            ev.stopPropagation();
            ev.preventDefault();
    }
    catch (ex) {
        console.log(ex);
    }
}



$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
    CallAPI();
});
