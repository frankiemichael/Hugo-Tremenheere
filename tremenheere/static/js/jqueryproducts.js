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

      var variants = listproducts.variants.length
      if (variants === 0) {
        $('#stockTable').append("<tr><td id='tdId'><span>" + this.userDefinedId + "</span></td><td id='tdName'><a style='text-decoration:none;color:black;'>" + listproducts.name + "</a></td><td id='tdSku'>" + listproducts.customFields[0].value + "</td><td id='tdStock'><input type='text' id='changeStock"+ i + "' value='" + listproducts.stock + "'></input></tr><br>")
      }else{
        console.log(this)
        $('#stockTable').append("<tr><td id='tdId'><span>" + this.userDefinedId + "</span></td><td id='tdName'><a style='text-decoration:none;color:black;'>" + this.name + "</a><button type='button' id='variantButton'>Variants ></button></td><td id='tdSku'>" + this.customFields[0].value + "</td><td id='tdStock'><input type='text' id='changeStock"+ i + "' value='" + this.stock + "'></input></tr><br>")
      }
    })
      $('input').on('change', function(){
        var idFind = $(this).parent().parent();
        var id = $(this).parent().parent().find('span').text();

        $.ajax({
          type:"PUT",
          url: host + "/" + id,
          headers: {
            'Authorization': `Basic ${btoa(secret)}`,
            'Accept': 'application/json'
          },
          contentType: "application/json",
          dataType: 'json',
          data: JSON.stringify({
            stock:$(this).val()
          }),

          success: function(result){
            console.log(result)
            console.log(this)



          },
          error: function(error) {
          console.log(error)
        }
        })

      })


    $('tr:not(:has(th)):not(:contains("TREREIFE"))').hide();


},
  error: function(error) {
  console.log(error)
}

});
});
