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
            headers: { "Authorization": "Basic Y2FkYWUyOTk4YTMwNDZlZWEzMGQ3ZGQ5OTZhZTg4ZmY6NmMxMmQyYmI3YzNmNGUwYmIxMDBmZmY1ZDZmMGY3OWI=" }
        }).then(function (response) {
            token = response.access_token;
        });
    };

    setInterval(() => GetToken(), 300000);

    $(".searchBtn").on("click", function (event) {
        event.preventDefault();

        let track = $(".searchField").val().trim();

        let searchQRY = "https://api.spotify.com/v1/search?q=" + track + "&type=track%2Cartist&market=US&limit=25&offset=5";

        $.ajax({
            url: searchQRY,
            method: "GET",
            headers: { "Authorization": "Basic Y2FkYWUyOTk4YTMwNDZlZWEzMGQ3ZGQ5OTZhZTg4ZmY6NmMxMmQyYmI3YzNmNGUwYmIxMDBmZmY1ZDZmMGY3OWI=" },
            json: true,
        }).then(function (response) {
            console.log(response);
        });
    });
    GetToken();
});


