
$(document).ready(function(){
console.log("Sanity Check: JS is working!");

// $('#rate').on('submit', function(e) {
//   e.preventDefault();
const reducer = (accumulator, currentValue) => accumulator + currentValue;

    $.ajax({
      method: 'GET',
      url: '/api/userorder',
      success: function(ratevendor){
        console.log(ratevendor);
        for(let i=0; i< ratevendor.length; i++){
          $("#rateArtsy").append(`
            <div id="vendorresults">
              <div id="artistWrap">
                <div id="imgcontainer">
                  <img src="/images/profile.jpg" >
                </div>
                <section id="infoWrap">
                <p><span class="bold" id="bold">${ratevendor[i].rated_vendor.user_id.name}</span></p>
                <p><span class="bold">Location:</span> ${ratevendor[i].rated_vendor.user_id.location}</p>
                <p><span class="bold">Contact Me: </span>${ratevendor[i].rated_vendor.user_id.email} </p>
                <p><span class="bold">I am a ${ratevendor[i].rateValue.reduce(reducer)/ratevendor[i].rateValue.length} star Artist, specialized in </span>${ratevendor[i].rated_vendor.user_id.artist}</p>

                </section>
                <form method="PUT" class="rateV" >
                  <input type="text" class="rateValue" name="star" value="5" >
                  <input type="submit" class="submitreview" data-id="${ratevendor[i]._id}" value="Rate This Artsy">
              </form>
                </div>
              </div>
            `);
        }
      },
      error: function(err){
        console.log("ERROR!", err)
      }
    });

  $('#rateArtsy').on('submit','.rateV', function(e) {
    console.log('clicked on rate button')
    // $(this).parent().hide();
    e.preventDefault();
    var id=$(this).find('.submitreview').attr('data-id')
    console.log(id);
    var rating = $(this).find('.rateValue').val();
    $.ajax({
      method: "PUT",
      url: `/api/userorder/${id}`,
      data: { rateValue: rating },
      success: succ,
      error: function(err){
              console.log("ERROR!", err)
            }
    })
  })
  function succ(json) {
    console.log('sucess!')
    console.log(json)
  }



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
            <div id="artistWrap" >
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
