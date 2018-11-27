$(document).ready(function () {
    let queryURL = "https://accounts.spotify.com/api/token";
    let token = null;
    

    function GetToken() {
        $.ajax({
            url: queryURL,
            crossDomain: true,
            method: "POST",
            data: { "grant_type": "client_credentials" },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            headers: { "Authorization": "Basic Y2FkYWUyOTk4YTMwNDZlZWEzMGQ3ZGQ5OTZhZTg4ZmY6NmMxMmQyYmI3YzNmNGUwYmIxMDBmZmY1ZDZmMGY3OWI=" },
            form: {grant_type: 'client_credentials'}
        }).then(function (response) {
            token = response.access_token;
        });
    };

    setInterval(() => GetToken(), 300000);

    $(".searchBtn").on("click", function (event) {
        event.preventDefault();

        let track = $(".searchField").val().trim();
        let searchQRY = "https://api.spotify.com/v1/search?q=track:" + track + "&type=track&market=US&limit=25";

        $.ajax({
            url: searchQRY,
            method: "GET",
            headers: { "Authorization": "Bearer " + token },
            json: true,
            data: {
                q: track,
                type: "track"
            }
        }).then(function (response) {
            console.log(response);
            console.log(response.tracks.items.length);
            let artistlists = $(".resultsdiv");
            for(var i = 0; i < response.tracks.items.length; i++) {
                let artistsname = response.tracks.items[i].artists[0].name;
                let trackname = response.tracks.items[i].name;
                let trackimage = response.tracks.items[i].album.images[1].url;
                artistlists.append("<img src=" + trackimage + ">" + "<p>" + "Artist Name: " + artistsname + "</p>" + "<p>" + "Song Name: " + trackname + "</p>" + "<br>");
            }
        });
    });
    GetToken();
});


