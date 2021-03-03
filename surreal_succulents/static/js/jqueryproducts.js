$( document ).ready(function() {
var host = "https://app.snipcart.com/api/products";
var secret = "ST_ZTg1YjU2ZTgtMmVjZi00ZGZlLWE2NmItOTAzMjE3MjczMGRkNjM3NDk5MzMxNTMzMzYwMTEz"
var id = "TREREIFE"
$.ajax({
  type:"GET",
  url: host,
  headers: {
    'Authorization': `Basic ${btoa(secret)}`,
    'Accept': 'application/json'
  },
  contentType: "application/json",
  dataType: 'json',
  success: function(result){

    var products = result.items
    var listproducts = ""
    console.log(products)
    $.each(products, function(i,val){
      var listproducts = products[i]
      console.log(listproducts)
      $('#stockTable').append("<tr><td id='tdId'>" + listproducts.userDefinedId + "</td><td id='tdName'>" + listproducts.name + "<button id='expandOptions'>></button></td><td id='tdSku'>" + listproducts.customFields[0].value + "</td><td id='tdStock'>" + listproducts.stock + "</tr><br>")
    })
    $('tr:not(:has(th)):not(:contains('TREREIFE'))").hide();
    $('th').parent
},
  error: function(error) {
  console.log(error)
}
});
});
