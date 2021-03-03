$( document ).ready(function() {
var host = "https://app.snipcart.com/api/products";
var secret = "ST_ZTg1YjU2ZTgtMmVjZi00ZGZlLWE2NmItOTAzMjE3MjczMGRkNjM3NDk5MzMxNTMzMzYwMTEz"
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
      $('#apidata').append("<table><tr><td id='tdId'>" + listproducts.userDefinedId + "</td><td id='tdName'>" + listproducts.name + "<button id='expandOptions'>></button></td><td id='tdSku'>" + listproducts.customFields[0].value + "</td><td id='tdStock'>" + listproducts.stock + "</tr></table>")
    })
},
  error: function(error) {
  console.log(error)
}
});
});
