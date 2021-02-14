$( document ).ready(function() {
$('#executespan').text("Execute");

$("#executeButton").click (function(e) {
  $(this).unbind('click');
  e.preventDefault();
  e.stopImmediatePropagation();
  $('#executespan').html("<a href='.'>Cancel</a>");

  var offset = $('#offsetinput').val()
  var limit = $('#limitinput').val()
  var status = $('#statusinput').val()
  var invoicenumber = $('#invoicenumberinput').val()
  var name = $('#nameinput').val()
  var host = 'https://app.snipcart.com/api/orders' + "?offset=" + offset + "&limit=" + limit + "&status=" + status + "&placedBy=" + name
  var puthost = 'https://app.snipcart.com/api/orders/'
  var refundhost = 'https://app.snipcart.com/api/v1/orders/'
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
              var string = result.items[i];
              var json = JSON.stringify(string.creationDate);
              var dateStr = JSON.parse(json);
              var date = new Date(dateStr).toString().substr(0,25);
              var final = obj[i];
              console.log(final);
              var shipaddress = final.shippingAddress;
              $('#apidata').append("<div id='invoicenumber'><button type='button' id='buttonclick' name='button2'><span id='buttonspan'>" + JSON.stringify(final.invoiceNumber) + "</span></button></div>" )
              $('#apidata').append("<div id='apiname'> <h4>" + JSON.stringify(shipaddress.fullName) + "</h4> </div>" )
              $('#apidata').append("<div id='apidate'> <h4>" + JSON.stringify(date) + "</h4> </div>" )
              $('#apidata').append("<div id='apistatus'> <h4>" + JSON.stringify(final.status) + "</h4> </div>" )
              $('#apidata').append("<div id='apishipping'><p>" + JSON.stringify(shipaddress.fullName) + "<br>" + JSON.stringify(shipaddress.address1) + "<br>" + JSON.stringify(shipaddress.address2) + "<br>" + JSON.stringify(shipaddress.city) + "<br>" + JSON.stringify(shipaddress.postalCode) + "<br>" + JSON.stringify(shipaddress.country) + "</p>")
              $('#apidata').append("<div id='apiprice'> <h4> £" + JSON.stringify(final.finalGrandTotal) + "<br>" + JSON.stringify(final.itemsCount) + " items</h4> </div>")

              var quotes = document.getElementById("apidata").innerHTML;
              var removequotes = quotes.replace(/"/g, '');
              document.getElementById("apidata").innerHTML = removequotes;
          }),
              $("#apidata").on("click","button", function(e) {
                $(this).unbind('click');
                e.preventDefault();
                e.stopImmediatePropagation();
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
                      $('#wrapper').append("<div id='orderhead'><span><h1>Order " + JSON.stringify(string.invoiceNumber) + "</h1></span></div></div>")
                      $('#orderhead').append("<button type='button' id='apieditbutton' name='apieditbutton'><span id='buttonspan'>Edit Order</span></button>")
                        $('#wrapper').append("<div id='apiorderinfotop'><h4>Placed On:</h4>" + date  + "<br><br><h4>Order Status:</h4><select class='form-control' name='Status' id='statusinput' disabled><option value='" + string.status + "' selected='true' disabled='disabled'>" + string.status + "</option><option value ='InProgress'>In progress</option><option value ='Processed'>Processed</option><option value ='Disputed'>Disputed</option><option value ='Delivered'>Delivered</option><option value ='Shipped'>Shipped</option><option value ='Pending'>Pending</option><option value ='Cancelled'>Cancelled</option></select></div>")
                      $('#wrapper').append("<div id='apiorderinfotop'><h4>Billing Address:</h4><textarea id='billingfullname' readonly>" + JSON.stringify(string.billingAddress.fullName) + "</textarea><br><textarea id='billingaddress1' readonly>" + JSON.stringify(string.billingAddress.address1) + "</textarea><textarea id='billingaddress2' readonly>" + JSON.stringify(string.billingAddress.address2) + "</textarea><br><textarea id='billingaddresscity' readonly>" + JSON.stringify(string.billingAddress.city) + "</textarea><br><textarea id='billingaddresspostcode' readonly>" + JSON.stringify(string.billingAddress.postalCode) + "</textarea><br><textarea id='billingaddresscountry' readonly>" + JSON.stringify(string.billingAddress.country) + "</textarea></p>")
                      $('#wrapper').append("<div id='apiorderinfotop'><h4>Shipping Address:</h4><textarea id='shippingfullname' readonly>" + JSON.stringify(string.shippingAddress.fullName) + "</textarea><br><textarea id='shippingaddress1' readonly>" + JSON.stringify(string.shippingAddress.address1) + "</textarea><textarea id='shippingaddress2' readonly>" + JSON.stringify(string.shippingAddress.address2) + "</textarea><br><textarea id='shippingaddresscity' readonly>" + JSON.stringify(string.shippingAddress.city) + "</textarea><br><textarea id='shippingaddresspostcode' readonly>" + JSON.stringify(string.shippingAddress.postalCode) + "</textarea><br><textarea id='shippingaddresscountry' readonly>" + JSON.stringify(string.shippingAddress.country) + "</textarea></p>")
                      $('#wrapper').append("<div id='apiorderinfotop'><h4>Customer Details</h4><img height='50px' width='50px' src=" + JSON.stringify(string.user.gravatarUrl) + "><br><div id='apicustomerdetails'>Email: <textarea id='customeremail' readonly>" + JSON.stringify(string.user.email) + "</textarea></div><div id='apicustomerdetails'>User ID: " + JSON.stringify(string.user.id) + "</div><div id='apicustomerdetails'>Previous Orders: " + JSON.stringify(string.user.statistics.ordersCount) + "</div>");
                      $('#wrapper').append("<div id='apiorderinfotop'><div id='apicustomerdetails'><h4>Delivery Note</h4><textarea id='deliverynote' readonly>" + JSON.stringify(string.customFields[0].value) + "</textarea></div>");
                      $('#wrapper').append("<div id='apiorderinfotop'></div>");
                      $('#wrapper').append("<div id='apiorderinfotop'></div>");
                      $('#wrapper').append("<div id='apiorderinfotop'></div>");


                      $('#wrapper').append("<div id='soldproducts'><h3>Products</h3><br>")
                      $('#soldproducts').append("<div id='solditems'><div><h4>SKU</h4></div><div><h4>Name</h4></div><div><h4>Quantity</h4></div><div><h4>Individual Price</h4></div><div><h4>Total</h4></div></div>")

                      var product = string.items
                      var eachqty = []
                      $.each(product, function(i, val){
                      var productlist = product[i];
                      var qtyId = product[i].uniqueId
                      $('#soldproducts').append("<div id='solditems'><div>" + JSON.stringify(productlist.customFields[0].value) + "</div><div>" + JSON.stringify(productlist.name) + "</div><div class='qtydiv'><span>" + JSON.stringify(productlist.quantity) + "</span></div><div>£" + JSON.stringify(productlist.price) + "</div><div>£" + JSON.stringify(productlist.totalPrice) + "</div></div>")
                      eachqty = JSON.stringify(qtyId);
                    });
                    $('#soldproducts').append("<br><div id='apirefunds'><h3>Refund</h3></div><br>")


                      $('#soldproducts').append("<br><div id='apiadditionalinfoheader'><h3>Additional Information</h3></div><br> <div id='apiaddinfo'><div><h4>Payment Details</h4>Type:" + JSON.stringify(string.paymentMethod) + "<br>Grand Total: £" + JSON.stringify(string.finalGrandTotal) + "<br>Status: " + JSON.stringify(string.paymentStatus) + "<br>Transaction ID: " + JSON.stringify(string.paymentTransactionId) + "</div><div><h4>Shipping Details</h4><br>Cost: £" + JSON.stringify(string.shippingFees) + "<br>Method: " + JSON.stringify(string.shippingMethod) + "<br>Tracking Number: <textarea id='trackingnumber' readonly>" + JSON.stringify(string.trackingNumber) + "</textarea>" );
                      $("#trackingnumber").text($("#trackingnumber").text().replace('null', ''));
                      var quotes = document.getElementById("wrapper").innerHTML;
                      var removequotes = quotes.replace(/"/g, '');
                      document.getElementById("wrapper").innerHTML = removequotes;
                      var quotes = document.getElementById("orderhead").innerHTML;
                      var removequotes = quotes.replace(/"/g, '');
                      document.getElementById("orderhead").innerHTML = removequotes;

                        $("#apieditbutton").click (function() {
                          $(this).unbind('click');

                          $('select').prop("disabled", false);
                          $('textarea, input').prop("readOnly", false);
                          $('textarea, input').css({"background-color" : "white"});
                          $('#plus').css({"display" : "block"});
                          $('#minus').css({"display" : "block"});
                          $('#orderhead').append("<button type='button' id='ammendorder' name='ammendorder'>Update</button>")
                          $('#apirefunds').append("<div id='refunddata'><button type='button' id='closerefund'>Close</button>Amount: <input type='text' value='' id='refundamount'></input><br>Reason for refund: <input type='text' value='' id='refundreason'></input><br><button type='button' id='submitrefund'>Submit</button><br>Notify Customer? <input type='checkbox' id='refundemail'></input></</div>")

                        $('select').on('change', function() {
                            var statusselect = this.value
                            var token = string.token;

                            $.ajax({

                                type: "PUT",
                                url: puthost + token,
                                headers: {
                                  'Authorization': `Basic ${btoa(secret)}`,
                                  'Accept': 'application/json'
                                },
                                contentType: "application/json",
                                dataType: 'json',
                                data: "{ status:'"+statusselect+"' }",
                                success: function(result){
                                  console.log(result)

                                },
                          });
                        });
                      });
                      var clicks = 0;
                      $('#apirefunds').click (function() {
                        if (clicks == 0)  {
                          ++clicks;
                          console.log(clicks)
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          var token = string.token;
                          var refundamount = $('#refundamount').val();
                          var refundreason = $('#refundreason').val()
                          $.ajax({
                            type: "GET",
                            url: refundhost + token + "/refunds",
                            headers: {
                              'Authorization': `Basic ${btoa(secret)}`,
                              'Accept': 'application/json'
                            },
                            contentType: "application/json",
                            dataType: 'json',
                            success: function(result){
                              console.log(result)
                            },
                            error: function(error) {
                              console.log(error)
                            }
                        });
                      } else {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                      $('#apirefunds').css({"height" : "200px !important"})
                      --clicks;

                      console.log(clicks)
                      }

                        $('#submitrefund').click (function() {
                          var r = confirm("Send refund?");
                        if(r == true) {
                          var refundamount = $('#refundamount').val();
                          var refundreason = $('#refundreason').val();
                          var refundbox = ''
                          if ($('#refundemail').is(":checked"))
                          {
                            var refundbox = true
                          }
                          else refundbox = false


                          console.log(refundbox)
                          $.ajax({
                            type: "POST",
                            url: refundhost + token + "/refunds",
                            headers: {
                              'Authorization': `Basic ${btoa(secret)}`,
                              'Accept': 'application/json'
                            },
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({
                              amount: refundamount,
                              comment: refundreason,
                              notifyCustomer: refundbox,
                            }),
                            success: function(result){
                              console.log(result)
                            },
                            error: function(error) {
                              console.log(error)
                            }
                          })
                        }else {
                          return false;
                        }

                      });


                      $("#ammendorder").click (function(e) {
                          var token = string.token;
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          $.ajax({
                              type: "PUT",
                              url: puthost + token,
                              headers: {
                                'Authorization': `Basic ${btoa(secret)}`,
                                'Accept': 'application/json'
                              },
                              contentType: "application/json",

                              dataType: 'json',
                              data: JSON.stringify({
                                billingAddress: {
                                    name:$('#billingfullname').val(),
                                    address1:$('#billingaddress1').val(),
                                    address2:$('#billingaddress2').val(),
                                    city:$('#billingaddresscity').val(),
                                    country:$('#billingaddresscountry').val(),
                                    postalCode:$('#billingaddresspostcode').val(),
                                  },
                                shippingAddress: {
                                  name:$('#shippingfullname').val(),
                                  address1:$('#shippingaddress1').val(),
                                  address2:$('#shippingaddress2').val(),
                                  city:$('#shippingaddresscity').val(),
                                  country:$('#shippingaddresscountry').val(),
                                  postalCode:$('#shippingaddresspostcode').val(),
                                },
                                user: {
                                  email:$('#customeremail').val(),
                                },
                                customFields: [
                                  {value:$('#deliverynote').val()},
                                ],





                              }),

                              success: function(result){
                                console.log(result)

                              },
                              error: function(error){
                                console.log(error);

                              }
                              });
                        });

                    });
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
