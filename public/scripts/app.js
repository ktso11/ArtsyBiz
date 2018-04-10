
$(document).ready(function(){
console.log("Sanity Check: JS is working!");


  $('#vendorsearch').on('submit', function(e) {
    e.preventDefault();
    $('#vendorresults').empty()
    var artist = document.getElementById('artistType').value;
    var location = document.getElementById('artistlocation').value;
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
            </section>
            <span>Hire this Artsy person!</span>
            </div>
            `);
        }
      },
      error: function(err){
        console.log("ERROR!", err)
      }
    });

  });


})
