
$(document).ready(function(){
console.log("Sanity Check: JS is working!");

var user = document.getElementById('currentUser').value;

  $.ajax({
    method: 'GET',
    url: '/api/order',
    success: function(orderlist){
      console.log('calling api')
      console.log(orderlist);
      for(let i=0; i< orderlist.length; i++){
        if(orderlist[i].rater_user === user){
        $("#hidden_rate").append(`
          <p> My ID ${orderlist[i].rater_user} || Vendor ID <span>${orderlist[i].rated_vendor}</span> </p>
          `);
        }
      }
    },
    error: function(err){
      console.log("ERROR!", err)
    }
  });

  $('#rate').on('click', function(e) {
    var vendors = $('.vendorID').text();
    console.log(vendors);
    e.preventDefault();
      $.ajax({
        method: 'GET',
        url: '/api/isvendor',
        success: function(vendor){
          console.log(vendor);
          for(let i=0; i< vendor.length; i++){
            if(vender[i]._id === vendors){
            $("#rateArtsy").append(`
              <p>vender[i].name</p>
              `);
            }
          }
        },
        error: function(err){
          console.log("ERROR!", err)
        }
      });
  });


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
            <div id="imgcontainer">
              <img src="/images/profile.jpg" >
            </div>
            <section id="infoWrap">
              <p><span class="bold" id="bold">${json[i].username}</span></p>
              <p><span class="bold">Location:</span> ${json[i].location}</p>
              <p><span class="bold">Rate: </span>${json[i].rate} per event</p>
              <p><span class="bold">Contact Me: </span>${json[i].email} </p>
              <p><span class="bold">I am a 5 star Artist, specialized in </span>${json[i].artist}</p>
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
    // $('#user_id input').val('');
    // $('#vendor_id input').val('');
    // newOrder.push(json);
    console.log(json)
  }



})
