
$(document).ready(function(){
  const userLogin = $('#user-login');
  const userSignup = $('#user-signup');

    userLogin.hide()

  $('#login-link').on('click', function(){
    userLogin.show();
    userSignup.hide();
  })
  $('#signup-link').on('click', function(){
    userLogin.hide();
    userSignup.show();
  })


const reducer = (accumulator, currentValue) => accumulator + currentValue;
    $.ajax({
      method: 'GET',
      url: '/api/userorder',
      success: function(ratevendor){
        console.log(ratevendor);
        for(let i=0; i< ratevendor.length; i++){
          console.log(ratevendor[0].rated_vendor.user_id.name)
          $(".reviewme").append(`
            <div id="vendorresults">
              <div id="artistWrap">
                <div id="imgcontainer">
                  <img src="${ratevendor[i].rated_vendor.user_id.picture}" >
                </div>
                <section id="infoWrap">
                <p><span class="bold" id="bold">${ratevendor[i].rated_vendor.user_id.name}</span></p>
                <p><span class="bold">Location:</span> ${ratevendor[i].rated_vendor.user_id.location}</p>
                <p><span class="bold">Contact Me: </span>${ratevendor[i].rated_vendor.user_id.email} </p>

                <form method="POST" class="rateV" id="rateit">
                  <select class="rateValue" name="star">
                    <option value="" disabled selected>Rate This Artist!</option>
                    <option value="5">&#9733; &#9733; &#9733; &#9733; &#9733;</option>
                    <option value="4">&#9733; &#9733; &#9733; &#9733;</option>
                    <option value="3">&#9733; &#9733; &#9733;</option>
                    <option value="2">&#9733; &#9733;</option>
                    <option value="1">&#9733;</option>
                  </select>

                  <input type="submit" id="disable" class="submitreview" data-id="${ratevendor[i]._id}" value="Rate">
              </form>
                </section>

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
    // $('#user_id input').val('');
    // $('#vendor_id input').val('');
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
          var rating = json[i].rating.reduce(reducer)/json[i].rating.length  ;
          $("#vendorresults").append(`
            <div id="artistWrap" class="RateWrap">
            <div id="imgcontainer">
              <img src="${json[i].picture}" >
            </div>
            <section id="infoWrap">
              <p><span class="bold" id="bold">${json[i].username}</span></p>
              <p><span class="bold">Location:</span> ${json[i].location}</p>
              <p><span class="bold">Rate: &#36; </span>${json[i].rate} per event</p>
              <p><span class="bold">Contact Me: </span>${json[i].email} </p>
              <p><span class="bold">I am a
              `+ rating.toFixed(2)+`
              <img src="/images/star.png" id="star"> Artist, specialized in </span>${json[i].artist}</p>
              <form method="POST" id="addOrder" action="/api/orders">
                <input type="hidden" id="vendor_id" name="vendor_id" value="${json[i]._id}" >
                <input type="hidden" id="user_id" name="user_id" value="${user}" >
                <input type="submit" value="Hire">
            </form>
            </section>
            </div><br>
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
