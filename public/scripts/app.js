
$(document).ready(function(){
  const userLogin = $('#user-login');
  const userSignup = $('#user-signup');
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  userLogin.hide()

  $('#login-link').on('click', function(){
    userLogin.show();
    userSignup.hide();
  })
  $('#signup-link').on('click', function(){
    userLogin.hide();
    userSignup.show();
  })


    $.ajax({
      method: 'GET',
      url: '/api/userorder',
      success: function(ratevendor){
        console.log("artist to rate" +ratevendor);

        if (ratevendor === undefined || ratevendor.length == 0) {
          $(".reviewme").append(`<center>You have no artist to review at this time<br> You can review artist you've hired. </center>`);
        } else {
          for(let i=0; i< ratevendor.length; i++){
            console.log(ratevendor[0].rated_vendor.user_id.name)
            $(".reviewme").append(`
               <div id="rateresults" class="container">
                <div class="artistWrap row">
                  <div class="artist-img-container col-sm-2">
                    <img class="artist-img" src="${ratevendor[i].rated_vendor.user_id.picture}" >
                  </div>
                  <section id="infoWrap" class="col-lg-10">
                    <p><span class="bold" id="bold">${ratevendor[i].rated_vendor.user_id.name}</span></p>
                    <p><span class="bold">Location:</span> ${ratevendor[i].rated_vendor.user_id.location}</p>
                    <p><span class="bold">Contact Me: </span>${ratevendor[i].rated_vendor.user_id.email} </p>
                    <form method="POST" class="rateV formcontainer" id="rateit">
                      <select class="rateValue form-control" name="star">
                        <option value="" disabled selected>Rate This Artist!</option>
                        <option value="5">&#9733; &#9733; &#9733; &#9733; &#9733; </option>
                        <option value="4">&#9733; &#9733; &#9733; &#9733;</option>
                        <option value="3">&#9733; &#9733; &#9733;</option>
                        <option value="2">&#9733; &#9733;</option>
                        <option value="1">&#9733;</option>
                      </select>
                      <input type="submit" id="${ratevendor[i].rated_vendor.user_id.name}" class="submitreview button hire-btn" data-id="${ratevendor[i]._id}" value="Rate">
                    </form>
                  </section>
                  </div>
                </div>
                <br>
              `);
            }
          }
        },
      error: function(err){
        console.log("ERROR!", err)
      }
    });

  $('#rateArtsy').on('submit','.rateV', function(e) {
    console.log('clicked on rate button')
    e.preventDefault();
    $(this).parents('#rateresults').hide();
    let id = $(this).find('.submitreview').attr('data-id')
    let artistname = $(this).find('.submitreview').attr('id')
    let rating = $(this).find('.rateValue').val();
    let heading = $('#pagetitle')
    heading.text(`Thank you for reviewing ${artistname}`)
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
    let artist = document.getElementById('artistType').value;
    let location = document.getElementById('artistlocation').value;
    let user = document.getElementById('currentUser').value;
    $.ajax({
      method: 'GET',
      url: '/api/isvendor?artist='+artist,
      success: function(json){
        console.log(json);
        for(let i=0; i<json.length; i++){
          let rating = json[i].rating.reduce(reducer)/json[i].rating.length  ;
          $("#vendorresults").append(`
            <div class="artistWrap row">
              <div class="col-sm-2 artist-img-container">
                <img src="${json[i].picture}" class="artist-img">
              </div>
              <div class="infoWrap col-lg-10">
                <p>
                  <span class="bold" >${json[i].username}</span>
                </p>
                <p>
                  <span class="bold">Location:</span> ${json[i].location}
                </p>
                <p>
                  <span class="bold">Rate: </span> approximately &#36;${json[i].rate} per event
                </p>
                <p>
                  <span class="bold">Contact Me: </span>${json[i].email}
                </p>
                <p>
                  <span class="bold">I am a rated `+ rating.toFixed(2)+`
                  <img src="/images/star.png" id="star">, specialized in </span>${json[i].artist}
                </p>
                <form method="POST" id="addOrder" action="/api/orders">
                  <input type="hidden" id="vendor_id" name="vendor_id" value="${json[i]._id}" >
                  <input type="hidden" id="user_id" name="user_id" value="${user}" >
                  <input type="submit" class="button  hire-btn" value="Hire this artist">
                </form>
              </div>
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
    console.log(json)
  }

})
