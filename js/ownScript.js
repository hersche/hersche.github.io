function processHtml(jDataIn, name) {
    "use strict";
    var displayHtml = "";
    $.each(jDataIn, function (key, val) {
        if (name === key) {
            if (key === "index") {
                displayHtml += "<h1>" + val.title + "</h1><p>" + val.description + "</p><table><tr><th>Projectname</th><th>Source</th>";
                displayHtml += "<th>Docs</th><th>Stability</th></tr>";
                $.each(val.content, function (cKey, cVal) {
                    displayHtml += '<tr><td><a href="index.html?s=' + cKey + '" onclick="changeContent(\'' + cKey + '\'); return false;" >' + cKey + '</a></td><td><a href="' + cVal.sLink + '">Src</a></td>';
                    displayHtml += "<td><a href='" + cVal.dLink + "'>Doc</a></td><td>" + cVal.stable + "</td></tr>";
                });
            } else if (key === "about") {
                displayHtml += '<p><img id="aboutImg" src="' + val.picture + '"/><br />' + val.description + '</p><ul>';
                $.each(val.contact, function (cKey, cVal) {
                    if (cKey === "E-Mail" || cKey === "Xampp") {
                        displayHtml += '<li><b>' + cKey + '</b>: <a href="mailto:' + cVal + '">' + cVal + '</a></li>';
                    } else {
                        displayHtml += '<li><b>' + cKey + '</b>: ' + cVal + '</li>';
                    }
                });
                displayHtml += '</ul><h3>Languages</h3><ul>';
                console.log("lang 1");
                $.each(val.languages, function (lKey, lVal) {
                    displayHtml += '<li><b>' + lKey + '</b>: ' + lVal.desc + '<ul style="margin-bottom:10px;">';
                    $.each(lVal.frameworks, function (fKey, fVal) {
                        displayHtml += '<li style="margin-bottom:5px;">' + fKey + ': ' + fVal + '</li>';
                    });
                    displayHtml += '</ul></li>';
                });
                displayHtml += '</ul>';
            } else {
                displayHtml += "<h1>" + key + "</h1><p>" + val.preword + "</p>";
                displayHtml += "<h3>Features</h3><ul>";
                $.each(val.features, function (fKey, fVal) {
                    displayHtml += "<li>" + fKey + ": " + fVal + "</li>";
                });
                displayHtml += "</ul><h3>Pictures</h3><ul>";
                $.each(val.pictures, function (pKey, pVal) {
                    displayHtml += "<li>" + pVal.desc + ":<br /> <a href='" + pVal.link + "'><img src='" + pVal.src + "' /></a></li>";
                });
                displayHtml += "</ul><h3>Bugs</h3><ul>";
                $.each(val.bugs, function (bKey, bVal) {
                    displayHtml += "<li>" + bKey + ": " + bVal + "</li>";
                });
                displayHtml += "</ul><p>" + val.description + "</p>";
            }
        }
    });
    return displayHtml;
}


function updateContent() {
    "use strict";
    var jqxhr = $.getJSON(jsonFile, function () {
        console.log("success one, do nothing.");
    });
    jqxhr.complete(function (data) {
        console.log("do workls.");
        jData = jQuery.parseJSON(data.responseText.replace("\n", ""));
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("jData");
            localStorage.jData = data.responseText.replace("\n", "");
        }
    });
}


function GET(v) {
    "use strict";
    if (!HTTP_GET_VARS[v]) {
        return 'undefined';
    }
    return HTTP_GET_VARS[v];
}

function changeContent(name) {
    "use strict";
    if (history.pushState) {
        history.pushState({
            "id": 100
        }, "skamster.github.io::" + name, "index.html?s=" + name);
    }
    if (name != lastName) {
        $("#animationContainer").effect("slide", {
            "direction": "right",
            "mode": "hide"
        }, 500, function () {
            $("#showContent").html(processHtml(jData, name));

        });

        $("#animationContainer").effect("slide", {
            "direction": "right",
            "mode": "show"
        }, 500);
        lastName = name;
    }

    return false;
}