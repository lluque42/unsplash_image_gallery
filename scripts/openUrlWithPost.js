/*
This function opens a new page using POST (the parameters are NOT inside the url)
*/
function openUrlWithPost(url, parametersObj) {
    var form = document.createElement("form");
    form.target = "_blank";
    form.method = "POST";
    form.action = url;
    form.style.display = "none";

    for (var key in parametersObj) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = parametersObj[key];
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}