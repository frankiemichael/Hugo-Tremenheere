$( document ).ready(function() {
$("#wrapper").on("click", "button", function() {
  $('#apidata').empty();
  var offset = $('#offsetinput').val()
  var executeButton = $('#executeButton').text("Execute");
  var limit = $('#limitinput').val()
  var status = $('#statusinput').val()
  var invoicenumber = $('#invoicenumberinput').val()
  var name = $('#nameinput').val()
  var host = 'https://app.snipcart.com/api/orders' + "?offset=" + offset + "&limit=" + limit + "&status=" + status + "&placedBy=" + name
  let secret = 'ST_MjZlOGQ4YjUtMzQwNC00OGM5LWI0MWYtOTE0YzliZDg2ZjFlNjM3NDY5MTIzMTA5ODA2NzAy' //hide this!!!!!!
    $.ajax({
        type: "GET",
        url: host + "&invoiceNumber=" + invoicenumber,
        headers: {
          'Authorization': `Basic ${btoa(secret)}`,
          'Accept': 'application/json'
        },
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            var obj = result.items;
            $.each(obj, function(i, val){
              var final = obj[i];
              var shipaddress = final.shippingAddress;
              $('#apidata').append("<div id='invoicenumber'><button type='button' id='buttonclick' name='button2'><span id='buttonspan'>" + JSON.stringify(final.invoiceNumber) + "</span></button></div>" )
              $('#apidata').append("<div id='apiname'> <h4>" + JSON.stringify(shipaddress.fullName) + "</h4> </div>" )
              $('#apidata').append("<div id='apidate'> <h4>" + JSON.stringify(final.creationDate) + "</h4> </div>" )
              $('#apidata').append("<div id='apistatus'> <h4>" + JSON.stringify(final.status) + "</h4> </div>" )
              $('#apidata').append("<div id='apishipping'><p>" + JSON.stringify(shipaddress.fullName) + "<br>" + JSON.stringify(shipaddress.address1) + "<br>" + JSON.stringify(shipaddress.address2) + "<br>" + JSON.stringify(shipaddress.city) + "<br>" + JSON.stringify(shipaddress.postalCode) + "<br>" + JSON.stringify(shipaddress.country) + "</p>")
              var quotes = document.getElementById("apidata").innerHTML;
              var removequotes = quotes.replace(/"/g, '');
              document.getElementById("apidata").innerHTML = removequotes;
          }),
              $("#apidata").on("click", "button", function() {
                  var openinvoicenumber = $(this).parent().text();
                  $.ajax({
                    type: "GET",
                    url: host + "&invoiceNumber=" + openinvoicenumber,
                    headers: {
                      'Authorization': `Basic ${btoa(secret)}`,
                      'Accept': 'application/json'
                    },
                    contentType: "application/json",
                    dataType: 'json',
                    success: function(result){
                      var string = result.items[0]
                      console.log(string)
                      $('#apidata').empty();
                      executeButton = $('#executeButton').text("Back");
                      $('#apidata').append("<div id='apiname'> <h4>" + JSON.stringify(string.billingAddress.fullName) + "</h4> </div>" )
                      $('#apidata').append("<div id='apidate'> <h4>" + JSON.stringify(string.creationDate) + "</h4> </div>" )
                      $('#apidata').append("<div id='apistatus'> <h4>" + JSON.stringify(string.status) + "</h4> </div>" )
                      $('#apidata').append("<div id='apishipping'><p>" + JSON.stringify(string.billingAddress.fullName) + "<br>" + JSON.stringify(string.billingAddress.address1) + "<br>" + JSON.stringify(string.billingAddress.address2) + "<br>" + JSON.stringify(string.billingAddress.city) + "<br>" + JSON.stringify(string.billingAddress.postalCode) + "<br>" + JSON.stringify(string.billingAddress.country) + "</p>")

                      var quotes = document.getElementById("apidata").innerHTML;
                      var removequotes = quotes.replace(/"/g, '');
                      document.getElementById("apidata").innerHTML = removequotes;
                    }

                  });



          });
          },
        error: function(error){
          console.log(error);
        }
    })

  })

});
