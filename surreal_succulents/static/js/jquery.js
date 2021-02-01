$( document ).ready(function() {
$("#wrapper").on("click", "button", function() {
  var offset = $('#offsetinput').val()
  var limit = $('#limitinput').val()
  var status = $('#statusinput').val()
  var invoicenumber = $('#invoicenumberinput').val()
  var name = $('#nameinput').val()
  var host = 'https://app.snipcart.com/api/orders' + "?offset=" + offset + "&limit=" + limit + "&status=" + status + "&invoiceNumber=" + invoicenumber + "&placedBy=" + name
  let secret = 'ST_MjZlOGQ4YjUtMzQwNC00OGM5LWI0MWYtOTE0YzliZDg2ZjFlNjM3NDY5MTIzMTA5ODA2NzAy'

    $.ajax({
        type: "GET",
        url: host,
        headers: {
          'Authorization': `Basic ${btoa(secret)}`,
          'Accept': 'application/json'
        },
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            console.log(result);
            var obj = result.items;
            $.each(obj, function(i, val){
              var final = obj[i];
              var billaddress = final.billingAddress;
              console.log(final);
              $('#apidata').append("<h4>" + JSON.stringify(final.invoiceNumber) + "</h4> <br>" )
              $('#apidata').append("<p><h4>Billing Address:</h4> <br>" + JSON.stringify(billaddress.fullName) + "<br>" + JSON.stringify(billaddress.address1) + "<br>" + JSON.stringify(billaddress.address2) + "<br>" + JSON.stringify(billaddress.city) + "<br>" + JSON.stringify(billaddress.postalCode) + "<br>" + JSON.stringify(billaddress.country) + "<br>" + JSON.stringify(billaddress.phone) +"</p>")



          });
            alert(host);
          },
        error: function(error){
          console.log(error);
        }
    })
  });
});
