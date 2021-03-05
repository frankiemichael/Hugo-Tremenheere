$( document ).ready(function() {
var host = "https://app.snipcart.com/api/products";
var secret = "ST_ZTg1YjU2ZTgtMmVjZi00ZGZlLWE2NmItOTAzMjE3MjczMGRkNjM3NDk5MzMxNTMzMzYwMTEz"
var id = "TREREIFE"
var jsonbin = "$2b$10$1mozpYSw1gbKNBFXQKDvIeCGZLXpnq.HC7uUTsuYPDfJ9KaLa7QeC"
$.ajax({
  type:"GET",
  headers: {
    "secret-key": "$2b$10$1mozpYSw1gbKNBFXQKDvIeCGZLXpnq.HC7uUTsuYPDfJ9KaLa7QeC",
  },
  url: "https://api.jsonbin.io/b/604242c80866664b1089501d/6",

  contentType: "application/json",
  dataType: 'json',
  success: function(result){
    console.log(result)
    var products = ""
    $.each(result, function(i,val){
      var products = result[i]
      console.log(products)
      var variants = products[0].variants.length
      var variantdata = products[0].variants
      var productdata = products[0]
      console.log(productdata)
      if (variants === 0) {
        $('#stockTable').append("<tr><td id='tdId'><span>" + productdata.id + "</span></td><td id='tdName'><a style='text-decoration:none;color:black;'>" + productdata.name + "</a></td><td id='tdSku'><input type='text' value='" + productdata.sku + "'></input></td><td id='tdStock'><input type='text' id='changeStock"+ i + "' value='" + products.stock + "'></input></tr><br>")

      }else{
        $('#stockTable').append("<tr><td id='tdId'><span>" + productdata.id + "</span></td><td id='tdName'><a style='text-decoration:none;color:black;'>" + productdata.name + "</a></td><td id='tdSku'><input type='text' value='" + productdata.sku + "'></input></td><td id='tdStock'><button type='button' id='editVariants'>Edit Variants</button></tr><br>")

      }



    })
  },
  error: function(error){
    console.log(error)
  }
});
$('input').on('change', function(){
  var id
})
$.ajax({
  type:"PUT",
  headers: {
    "secret-key": "$2b$10$1mozpYSw1gbKNBFXQKDvIeCGZLXpnq.HC7uUTsuYPDfJ9KaLa7QeC",
    "versioning":"false"
  },
  url: "https://api.jsonbin.io/b/604242c80866664b1089501d/6",

  contentType: "application/json",
  dataType: 'json',
  success: function(result){
    console.log(result)
  },
  error: function(error){
    console.log(error)
  }
});
return






$.ajax({
  type:"GET",
  url: host,
  headers: {
    "secret-key": "$2b$10$1mozpYSw1gbKNBFXQKDvIeCGZLXpnq.HC7uUTsuYPDfJ9KaLa7QeC"
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
