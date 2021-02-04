$( document ).ready(function() {
$('#executespan').text("Execute");
$("#wrapper").on("click", "button", function() {
  $('#executespan').html("<a href='.'>Cancel</a>");
  var offset = $('#offsetinput').val()
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
              console.log(final);
              var shipaddress = final.shippingAddress;
              $('#apidata').append("<div id='invoicenumber'><button type='button' id='buttonclick' name='button2'><span id='buttonspan'>" + JSON.stringify(final.invoiceNumber) + "</span></button></div>" )
              $('#apidata').append("<div id='apiname'> <h4>" + JSON.stringify(shipaddress.fullName) + "</h4> </div>" )
              $('#apidata').append("<div id='apidate'> <h4>" + JSON.stringify(final.creationDate) + "</h4> </div>" )
              $('#apidata').append("<div id='apistatus'> <h4>" + JSON.stringify(final.status) + "</h4> </div>" )
              $('#apidata').append("<div id='apishipping'><p>" + JSON.stringify(shipaddress.fullName) + "<br>" + JSON.stringify(shipaddress.address1) + "<br>" + JSON.stringify(shipaddress.address2) + "<br>" + JSON.stringify(shipaddress.city) + "<br>" + JSON.stringify(shipaddress.postalCode) + "<br>" + JSON.stringify(shipaddress.country) + "</p>")
              $('#apidata').append("<div id='apiprice'> <h4> £" + JSON.stringify(final.finalGrandTotal) + "<br>" + JSON.stringify(final.itemsCount) + " items</h4> </div>")

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
                      var string = result.items[0];
                      var json = JSON.stringify(string.creationDate);
                      var dateStr = JSON.parse(json);
                      var date = new Date(dateStr).toString().substr(0,25);



                      $('#apidata').remove();
                      $('#apihead').remove();
                      $('#executespan').text("");
                      $('#executespan').append("<a href='.'>Back</a>");
                      $('#wrapper').append("<div id='orderhead'><span><h1>Order " + JSON.stringify(string.invoiceNumber) + "</h1></span></div>")

                      $('#wrapper').append("<div><h4>Placed On:</h4><br>" + date  + "<br><br><h4>Order Status:</h4>" + JSON.stringify(string.status) + "</div>")
                      $('#wrapper').append("<div><h4>Billing Address:</h4><br>" + JSON.stringify(string.billingAddress.fullName) + "<br>" + JSON.stringify(string.billingAddress.address1) + ", " + JSON.stringify(string.billingAddress.address2) + "<br>" + JSON.stringify(string.billingAddress.city) + "<br>" + JSON.stringify(string.billingAddress.postalCode) + "<br>" + JSON.stringify(string.billingAddress.country) + "</p>")
                      $('#wrapper').append("<div><h4>Shipping Address:</h4><br>" + JSON.stringify(string.shippingAddress.fullName) + "<br>" + JSON.stringify(string.shippingAddress.address1) + ", " + JSON.stringify(string.shippingAddress.address2) + "<br>" + JSON.stringify(string.shippingAddress.city) + "<br>" + JSON.stringify(string.shippingAddress.postalCode) + "<br>" + JSON.stringify(string.shippingAddress.country) + "</p>")
                      $('#wrapper').append("<div><h4></h4><br>")
                      $('#wrapper').append("<div id='soldproducts'><h4>Products:</h4><br>")

                      var product = string.items
                      $.each(product, function(i, val){
                      var productlist = product[i];
                      $('#soldproducts').append("<div id='solditems'>" + JSON.stringify(productlist.name) + "£" + JSON.stringify(productlist.price))
                      });

                      var quotes = document.getElementById("wrapper").innerHTML;
                      var removequotes = quotes.replace(/"/g, '');
                      document.getElementById("wrapper").innerHTML = removequotes;
                      var quotes = document.getElementById("orderhead").innerHTML;
                      var removequotes = quotes.replace(/"/g, '');
                      document.getElementById("orderhead").innerHTML = removequotes;
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
