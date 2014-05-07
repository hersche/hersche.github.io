function processMenuHtml(jDataIn){
	var menuHtml = '<ul style="display: inline; margin:0; list-style: none;" >';
	$.each(jDataIn, function(menuName, value){
	   var parent = "";
	  if(menuName=="index"){
	   styleClass='"submenu"';
	   parent = ' class="dropdowncontainer" ';
	  }
	 


	  menuHtml += '<li'+parent+' ><a style="margin-left:5px;" href="index.html?s='+menuName+'" data-tool="'+value.preword+'" onclick="changeContent(\'' + menuName + '\'); return false;" class="btn fade">'+value.title+'</a>';
	  // This is because i know, index is the first.. it have to be!	  
	  if(menuName!="index"){
	   menuHtml+='</li>';
	  }
	  if(menuName=="index"){
	   menuHtml += "<ul class="+styleClass+">";
	   
	  }
	  
	});
	alert(menuHtml+'</li></ul>');
	return menuHtml+'</li></ul>';
	
	
}
function processHtml(jDataIn, name) {
    "use strict";
    var displayHtml = "";
    $.each(jDataIn, function (key, val) {
        if (name === key) {
            if (key === "index") {
                displayHtml += "<h1>" + val.title + "</h1><p>" + val.preword + "</p><table><tr><th>Projectname</th><th>Source</th>";
                displayHtml += "<th>Docs</th><th>Stability</th></tr>";
                $.each(val.content, function (cKey, cVal) {
                    displayHtml += '<tr><td><a href="index.html?s=' + cKey + '" onclick="changeContent(\'' + cKey + '\'); return false;" >' + cKey + '</a></td><td><a href="' + cVal.sLink + '">Src</a></td>';
                    displayHtml += "<td><a href='" + cVal.dLink + "'>Doc</a></td><td>" + cVal.stable + "</td></tr>";
                });
                displayHtml += "</table><p>" + val.description + "</p>";
                
            } else if (key === "about") {
                displayHtml += '<p><img id="aboutImg" src="' + val.picture + '"/><br />' + val.description + '</p><ul>';
                $.each(val.contact, function (cKey, cVal) {
                    if (cKey === "E-Mail" || cKey === "Xampp") {
                        displayHtml += '<li><b>' + cKey + '</b>: <a href="mailto:' + cVal + '">' + cVal + '</a></li>';
                    } else {
                        displayHtml += '<li><b>' + cKey + '</b>: ' + cVal + '</li>';
                    }
                });
                var langs = "";
                var langToc ="";
                displayHtml += '</ul><h3>Languages</h3><ul>';
                $.each(val.languages, function (lKey, lVal) {
                    langToc += '<li><a href="#'+lKey+'">'+lKey+'</a></li>';
                    langs += '<li><a name="'+lKey+'" /><b>' + lKey + '</b>: ' + lVal.desc + '<ul style="margin-bottom:10px;">';
                    $.each(lVal.frameworks, function (fKey, fVal) {
                        langs += '<li style="margin-bottom:5px;">' + fKey + ': ' + fVal + '</li>';
                    });
                    langs += '</ul></li>';
                });
                displayHtml += langToc+"</ul><ul>";
                displayHtml += langs + '</ul>';
            } else {
                displayHtml += "<h1>" + key + '</h1><p>' + val.preword + "</p>";
                displayHtml += '<a href="index.html" onclick="changeContent(\'index\'); return false">Links</a>';
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
    });
    jqxhr.complete(function (data) {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("jData");
                location.reload();   
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
