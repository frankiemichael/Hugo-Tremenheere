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
            var bulkactions = ''
            $('#apidata').append("<select id='orderprintselect'> <option selected='true' disabled='true'>Bulk Actions</option><option value='packingslip'>Print Packing Slips</option><option value='pickinglist'>Print Pick List</option></select>")
            $('#apidata').on('change','select', function(){
              //var orderprintselect = $('#orderprintselect').val()
              var bulkactions = this.value
              $('.orderprintbutton').attr("id", bulkactions)
            });

            $('#apidata').append("<button class='orderprintbutton' type='button' id=''>Go</button><table id='apiTable'><th><h3>Invoice Number</h3><input id='selectAllOrders' type='checkbox'></input></th><th><h3>Name</h3></th><th><h3>Date</h3></th><th><h3>Status</h3></th><th><h3>Shipping Address</h3></th><th><h3>Price / Items</h3></th>")
            $.each(obj, function(i, val){
              var string = result.items[i];
              var json = JSON.stringify(string.creationDate);
              var dateStr = JSON.parse(json);
              var date = new Date(dateStr).toString().substr(0,25);
              var final = obj[i];
              console.log(final);
              var shipaddress = final.shippingAddress;
              $('#apiTable').append("<tr><td><button type='button' id='buttonclick' name='button2'><span id='buttonspan'><br>" + JSON.stringify(final.invoiceNumber) + "</span></button><input type='checkbox' id='orderSelect'></input></td><td> <h4>" + JSON.stringify(shipaddress.fullName) + "</h4> </td><td> <h4>" + JSON.stringify(date) + "</h4> </td><td> <h4>" + JSON.stringify(final.status) + "</h4> </td><td><p>" + JSON.stringify(shipaddress.fullName) + "<br>" + JSON.stringify(shipaddress.address1) + "<br>" + JSON.stringify(shipaddress.address2) + "<br>" + JSON.stringify(shipaddress.city) + "<br>" + JSON.stringify(shipaddress.postalCode) + "<br>" + JSON.stringify(shipaddress.country) + "</p></td><td> <h4> £" + JSON.stringify(final.finalGrandTotal) + "<br>" + JSON.stringify(final.itemsCount) + " items</h4> </td>" )

              var quotes = document.getElementById("apidata").innerHTML;
              var removequotes = quotes.replace(/"/g, '');
              document.getElementById("apidata").innerHTML = removequotes;
              $('#selectAllOrders').on('change', function() {
                if ($('#selectAllOrders').is(':checked')){

                $('input:checkbox').not(this).prop('checked', this.checked);
                console.log($('input:checkbox').val())

                $.each(obj, function(i, val) {
                  var data = obj[i]
                  var shipaddress = data.shippingAddress
                  var rowId = "tablerow" + ivNumber
                  var tableId = "printTable" + data.invoiceNumber
                  console.log(tableId)
                  $('#printPDF').append("<div class='page'><div style='position:absolute;'><img style='postition:absolute;height:75px;width:75px;' src='/uploads/logocut.png'></div><div id='orderNumberPrint'><h3>Order "+JSON.stringify(data.invoiceNumber)+ "</h3></div><div id='addressPDF'><p>" + JSON.stringify(shipaddress.fullName) + "<br>" + JSON.stringify(shipaddress.address1) + "<br>" + JSON.stringify(shipaddress.address2) + "<br>" + JSON.stringify(shipaddress.city) + "<br>" + JSON.stringify(shipaddress.postalCode) + "<br>" + JSON.stringify(shipaddress.country) + "</p></div><div id='printShippingMethod'><h4>Shipping Method</h4>"+ JSON.stringify(data.shippingMethod) +"</div><div id='printItems'><table id ='"+tableId+"'><tr><th>SKU</th><th>Name</th><th>Quantity</th></table></div></div>")
                  var productData = data.items

                  $.each(productData, function(i, val){
                    var order = productData[i]
                    var rowId = "tablerow" + ivNumber
                    var product = order
                    console.log(product)
                    var productSku = product.customFields[0].value
                    var productName = product.name
                    var productQuantity = product.quantity
                    $('#'+tableId+'').append("<tr><td id='skuTd'>"+JSON.stringify(productSku) + "</td><td id='nameTd'>" + JSON.stringify(productName) + "</td><td id='quantityTd'>" + JSON.stringify(productQuantity) + "</td>")
                    $('#pickingListTable').append("<tr id='"+rowId+"'><td id='skuTd'>"+JSON.stringify(productSku) + "</td><td id='nameTd'>" + JSON.stringify(productName) + "</td><td id='quantityTd'>" + JSON.stringify(productQuantity) + "</td>")


                  });
                })
              }else {
                $('#printPDF').empty()
                $("input:checkbox").prop('checked', $(this).prop("checked"));
                console.log($('input:checkbox').val())
              }
              });
              //$('#apiTable td input').on('change', function() {
              //  var check = $('#apiTable').find('input[type=checkbox]:checked').length;
                //console.log(check);


                var ivNumber = ''
                var checks = 1
                $('#apiTable td input').on('change', function() {
                  if($(this).is(':checked')){
            //      if (checks != 1){
              //      ++checks


              //    }else{
              //      --checks
              //      console.log(checks)
                var ivNumber = $(this).parent().text()
                var tableId = "printTable" + ivNumber
                var rowId = "tablerow" + ivNumber
                console.log(tableId);
                console.log(ivNumber);
                $.ajax({
                    type: "GET",
                    url: host + "&invoiceNumber=" + ivNumber,
                    headers: {
                      'Authorization': `Basic ${btoa(secret)}`,
                      'Accept': 'application/json'
                    },
                    contentType: "application/json",
                    dataType: 'json',
                    success: function(result){

                      var data = result.items[0];
                    //  console.log(result)
                      var shipaddress = data.shippingAddress
                      $('body').css({'margin' : '0', 'padding' : '0', 'font' : '12pt "Tahoma"'})
                      $('*').css({'box-sizing' : 'border-box', '-moz-box-sizing' : 'border-box'})
                      var divId = "page" + ivNumber
                      $('#printPDF').append("<div class='page'><div style='position:absolute;'><img style='postition:absolute;height:75px;width:75px;' src='/uploads/logocut.png'></div><div id='orderNumberPrint'><h3>Order "+JSON.stringify(data.invoiceNumber)+ "</h3></div><div id='addressPDF'><p>" + JSON.stringify(shipaddress.fullName) + "<br>" + JSON.stringify(shipaddress.address1) + "<br>" + JSON.stringify(shipaddress.address2) + "<br>" + JSON.stringify(shipaddress.city) + "<br>" + JSON.stringify(shipaddress.postalCode) + "<br>" + JSON.stringify(shipaddress.country) + "</p></div><div id='printShippingMethod'><h4>Shipping Method</h4>"+ JSON.stringify(data.shippingMethod) +"</div><div id='printItems'><table id ='"+tableId+"'><tr><th>SKU</th><th>Name</th><th>Quantity</th></table></div></div>")
                      $('#printPicking').append("")
                      console.log()
                      var productData = data.items

                      $.each(productData, function(i, val){
                        var order = productData[i]
                        var product = order
                        console.log(product)
                        var productSku = product.customFields[0].value
                        var productName = product.name
                        var productQuantity = product.quantity
                        $('#'+tableId+'').append("<tr><td id='skuTd'>"+JSON.stringify(productSku) + "</td><td id='nameTd'>" + JSON.stringify(productName) + "</td><td id='quantityTd'>" + JSON.stringify(productQuantity) + "</td>")
                        $('#pickingListTable').append("<tr id='"+rowId+"'><td id='skuTd'>"+JSON.stringify(productSku) + "</td><td id='nameTd'>" + JSON.stringify(productName) + "</td><td id='quantityTd'>" + JSON.stringify(productQuantity) + "</td>")


                      });
                    },
                    error: function(error) {
                      console.log(error)
                    }
                  });

            //  }
         }else{

           var ivNumber = $(this).parent().text()
           var tableId = "printTable" + ivNumber
           var rowId = "tablerow" + ivNumber
           console.log(tableId)
           $('#'+tableId+'').parent().parent().remove()
           $('#'+rowId+'').remove()

         }
          });
        });

        $('#apidata').on('click','#packingslip',function() {
          $("h1").empty();
          $("form").empty();
          $("#apidata").empty();
          $("#wrapper").css({'position':'absolute', 'height' : '0'})
          $("#wrapper").append("<a style='position:absolute;height:0;' href='.'>Go back</a>")
          $("#printPDF").removeAttr('hidden');
          var quotes = document.getElementById("printPDF").innerHTML;
          var removequotes = quotes.replace(/"/g, '');
          document.getElementById("printPDF").innerHTML = removequotes;
        });
        $('#apidata').on('click','#pickinglist',function() {
          $("h1").empty();
          $("form").empty();
          $("#apidata").empty();
          $("#wrapper").css({'position':'absolute', 'height' : '0'})
          $("#wrapper").append("<a style='position:absolute;height:0;' href='.'>Go back</a>")
          $("#printPicking").removeAttr('hidden');
          var quotes = document.getElementById("printPicking").innerHTML;
          var removequotes = quotes.replace(/"/g, '');
          document.getElementById("printPicking").innerHTML = removequotes;

        });

              $('#refundbutton').off('click');
              $("td").on("click","button", function() {
                $(".form-inline").remove();
                $('#refundbutton').on('click');
                $(this).off('click');
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
                      $('#wrapper').css({'left' : '0'});
                      $('#printPDF').remove();
                      $('#displayOrdersHeading').remove();
                      $('#apidata').remove();
                      $('#apihead').remove();
                      $('#executespan').text("");
                      $('#wrapper').append("<div id='orderhead'><span><h1>Order " + JSON.stringify(string.invoiceNumber) + "</h1></span></div></div>")
                      $('#orderhead').append("<button type='button' id='apieditbutton' name='apieditbutton'><span id='buttonspan'>Edit Order</span></button>")
                      $('#orderhead').append("<a id='backButton' href='.'>Back</a>")
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
                      console.log(productlist)
                      var qtyId = product[i].uniqueId
                      $('#soldproducts').append("<div id='solditems'><div>" + JSON.stringify(productlist.customFields[0].value) + "</div><div>" + JSON.stringify(productlist.name) + "</div><div class='qtydiv'><span>" + JSON.stringify(productlist.quantity) + "</span></div><div>£" + JSON.stringify(productlist.price) + "</div><div>£" + JSON.stringify(productlist.totalPrice) + "</div></div>")
                      eachqty = JSON.stringify(qtyId);
                    });
                    $('#soldproducts').append("<br><div id='apirefunds'><div id='refundbutton'><h3 id='refundtitle'>Refund ↓</h3></div></div><br>")


                      $('#soldproducts').append("<br><div id='apiadditionalinfoheader'><h3>Additional Information</h3></div><br> <div id='apiaddinfo'><div><h4>Payment Details</h4>Type:" + JSON.stringify(string.paymentMethod) + "<br>Total: <span id='grandTotal'>£" + JSON.stringify(string.finalGrandTotal) + "</span><span id='adjustedAmount'>£" + JSON.stringify(string.adjustedAmount) + "</span><br>Status: " + JSON.stringify(string.paymentStatus) + "<br>Transaction ID: " + JSON.stringify(string.paymentTransactionId) + "</div><div><h4>Shipping Details</h4><br>Cost: £" + JSON.stringify(string.shippingFees) + "<br>Method: " + JSON.stringify(string.shippingMethod) + "<br>Tracking Number: <textarea id='trackingnumber' readonly>" + JSON.stringify(string.trackingNumber) + "</textarea>" );
                      $("#trackingnumber").text($("#trackingnumber").text().replace('null', ''));
                      var quotes = document.getElementById("wrapper").innerHTML;
                      var removequotes = quotes.replace(/"/g, '');
                      document.getElementById("wrapper").innerHTML = removequotes;
                      var quotes = document.getElementById("orderhead").innerHTML;
                      var removequotes = quotes.replace(/"/g, '');
                      document.getElementById("orderhead").innerHTML = removequotes;
                      var totalGrand = $('#grandTotal').html()
                      var amountAdjusted = $('#adjustedAmount').html()
                      console.log(totalGrand)
                      console.log(amountAdjusted)
                      if ( totalGrand != amountAdjusted) {
                        $('#grandTotal').css({"text-decoration" : "line-through", "color" : "red"})
                      }else {
                        $('#adjustedAmount').hide()
                      };

                        $("#apieditbutton").click (function() {
                          $(this).unbind('click');

                          $('select').prop("disabled", false);
                          $('textarea, input').prop("readOnly", false);
                          $('textarea, input').css({"background-color" : "white"});
                          $('#plus').css({"display" : "block"});
                          $('#minus').css({"display" : "block"});
                          $('#orderhead').append("<button type='button' id='ammendorder' name='ammendorder'>Update</button>")
                          $('#apirefunds').append("<div id='refunddata' style='display: none; overflow: hidden !important;'> <div id='totalrefunded'><h4 style='font-size:15px; white-space:nowrap;'>Refund History</h4></div><br>Amount: <input type='text' value='' id='refundamount'></input><br>Reason for refund: <input type='text' value='' id='refundreason'></input><br><button type='button' id='submitrefund'>Submit</button><br>Notify Customer? <input type='checkbox' id='refundemail'></input></</div>")

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

                      var clicks = 0;
                      $('#refundbutton').click (function() {

                        if (clicks == 0)  {

                          $('#refundtitle').html('Refund ↑');
                          $('#refunddata').css({"display" : ""})
                          ++clicks;
                          console.log(clicks)
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          var token = string.token;
                          var refundamount = $('#refundamount').val();
                          var refundreason = $('#refundreason').val();

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

                              $.each(obj, function(i, val){
                                refunds = result[i]
                                var json = JSON.stringify(refunds.creationDate);
                                var dateStr = JSON.parse(json);
                                var date = new Date(dateStr).toString().substr(0,25);
                                $('#totalrefunded').append("Amount: £" + JSON.stringify(refunds.amount) + "<br><span>Reason:"+ JSON.stringify(refunds.comment) + "<br>Date: " + date + "</span><br></li>")
                              });
                            },
                            error: function(error) {
                              console.log(error)
                            }
                        });
                      } else {
                        $('#refundtitle').html('Refund ↓')
                        $('#refunddata').css({"display": "none"})
                      --clicks;

                      console.log(clicks)
                      }

                        $('#submitrefund').click (function() {
                          $('#grandTotal').css({"text-decoration" : "line-through", "color" : "red", "font-size" : "12px"})
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
