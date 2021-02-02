$( document ).ready(function() {
$("#wrapper").on("click", "button", function() {
  $('#apidata').empty();
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
              var shipaddress = final.shippingAddress;
              console.log(final);
              $('#apidata').append("<div id='invoicenumber' <h4>" + JSON.stringify(final.invoiceNumber) + "</h4> </div>" )
              $('#apidata').append("<div id='apiname' <h4>" + JSON.stringify(shipaddress.fullName) + "</h4> </div>" )
              $('#apidata').append("<div id='apidate' <h4>" + JSON.stringify(final.creationDate) + "</h4> </div>" )
              $('#apidata').append("<div id='apistatus' <h4>" + JSON.stringify(final.status) + "</h4> </div>" )
              $('#apidata').append("<div id='apishipping'<p>" + JSON.stringify(shipaddress.fullName) + "<br>" + JSON.stringify(shipaddress.address1) + "<br>" + JSON.stringify(shipaddress.address2) + "<br>" + JSON.stringify(shipaddress.city) + "<br>" + JSON.stringify(shipaddress.postalCode) + "<br>" + JSON.stringify(shipaddress.country) + "</p>")
              var quotes = document.getElementById("apidata").innerHTML;
              var removequotes = quotes.replace(/"/g, '');
              document.getElementById("apidata").innerHTML = removequotes;


          });
            alert(host);
          },
        error: function(error){
          console.log(error);
        }
    })
  });
});
