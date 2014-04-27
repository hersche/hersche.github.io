function processHtml(jDataIn, name) {
    var displayHtml = "";
    $.each(jDataIn, function (key, val) {
        var site = jQuery.parseJSON(JSON.stringify(val));
        if (name == key) {
            if (key == "index") {
                displayHtml += "<h1>" + val.title + "</h1><p>" + val.description + "</p><table><tr><th>Projectname</th><th>Source</th>";
                displayHtml += "<th>Docs</th><th>Stability</th></tr>";
                $.each(val.content, function (cKey, cVal) {
                    displayHtml += '<tr><td><a href="index.html?s=' + cKey + '" onclick="changeContent(\'' + cKey + '\'); return false;" >' + cKey + '</a></td><td><a href="' + cVal.sLink + '">Src</a></td>';
                    displayHtml += "<td><a href='" + cVal.dLink + "'>Doc</a></td><td>" + cVal.stable + "</td></tr>";
                });
            } else if (key == "about") {
                displayHtml += '<p><img src="' + val.picture + '"/><br />' + val.description + '</p><ul>';
                $.each(val.contact, function (cKey, cVal) {
                    displayHtml += '<li><b>' + cKey + '</b>: ' + cVal + '</li>';
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