
$(document).ready(function(){
console.log("Sanity Check: JS is working!");


  $('#vendorsearch').on('submit', function(e) {
    e.preventDefault();
    $('#vendorresults').empty()
    var artist = document.getElementById('artistType').value;
    var location = document.getElementById('artistlocation').value;
    var user = document.getElementById('currentUser').value;
    $.ajax({
      method: 'GET',
      url: '/api/isvendor?artist='+artist,
      success: function(json){
        console.log(json);
        for(let i=0; i<json.length; i++){
          $("#vendorresults").append(`
            <div id="artistWrap">
            <img src="/images/person.png" width="30%">
            <section id="infoWrap">
              <p>${json[i].username}</p>
              <p>Location: ${json[i].location}</p>
              <p>Rate: ${json[i].rate} per event</p>
              <p>Contact Me: ${json[i].email} </p>
              <p>I am a 5 star Artist, specialized in ${json[i].artist}</p>
              <form method="POST" id="addOrder" action="/api/orders">
                <input type="text" id="vendor_id" name="vendor_id" value="${json[i]._id}" >
                <input type="text" id="user_id" name="user_id" value="${user}" >
                <input type="submit" value="Hire">
            </form>
            </section>
            </div>
            `);
        }
      },
      error: function(err){
        console.log("ERROR!", err)
      }
    });
  });

  $('addOrder').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/orders',
        data: $(this).serializeArray(),
        success: newOrderSuccess,
        error: function(err){
          console.log("ERROR!", err)
        }
      })
  })

  function newOrderSuccess(json) {
    $('#user_id input').val('');
    $('#vendor_id input').val('');
    newOrder.push(json);
    console.log(json)
  }


})
