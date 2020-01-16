function load(selector, url) {
    var request = new XMLHttpRequest();

    // se ejecuta cuando finalizo el GET
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            document.querySelector(selector).innerHTML = request.responseText;
        }
    };

    request.open('GET', url);

    request.send();
}
