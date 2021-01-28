$( document ).ready(function() {
$("#wrapper").on("click", "button", function() {
  var offset = $('#offsetinput').val()
  var limit = $('#limitinput').val()
  var host = 'https://app.snipcart.com/api/orders' + "?offset=" + offset + "&limit=" + limit
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
            alert(host)
        },
        error: function(error){
          console.log(error);
        }
    })
  });
});
