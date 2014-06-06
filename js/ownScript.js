function processMenuHtml(jDataIn) {
    var menuHtml = '<ul style="display: inline; margin:0; list-style: none;" >';
    $.each(jDataIn, function(menuName, value) {
        var parent = "";
        if (menuName != "transl") {
            if (menuName == "index") {
                styleClass = '"submenu"';
                parent = ' class="dropdowncontainer" ';
            }
            menuHtml += '<li' + parent + ' ><a href="index.html?s=' + menuName + '" data-tool="' + value.preword + '" onclick="changeContent(\'' + menuName + '\'); return false;" class="btn fade">' + value.title + '</a>';
            // This is because i know, index is the first.. it have to be!	  
            if (menuName != "index") {
                menuHtml += '</li>';
            }
            if (menuName == "index") {
                menuHtml += "<ul class=" + styleClass + ">";

            }
        }
    });
    return menuHtml + '</li></ul>';


}

function processHtml(jDataIn, name) {
    "use strict";
    var displayHtml = '<div style="margin-top:10%;">';
    var toc = "";
    $.each(jDataIn, function(key, val) {
        if (name === key) {
            if (key === "index") {
                displayHtml += "<h2>" + val.title + "</h2><p>" + val.preword + '</p><a name="TheTable"><a/><table><tr><th>' + jDataIn.transl.projectname + '</th><th>' + jDataIn.transl.source + '</th>';
                displayHtml += "<th>" + jDataIn.transl.doc + "</th><th>" + jDataIn.transl.stability + "</th></tr>";
                $.each(val.content, function(cKey, cVal) {
                    displayHtml += '<tr><td><a href="index.html?s=' + cVal.pLink + '" onclick="changeContent(\'' + cVal.pLink + '\'); return false;" >' + cKey + '</a></td><td><a href="' + cVal.sLink + '">Src</a></td>';
                    displayHtml += "<td><a href='" + cVal.dLink + "'>Doc</a></td><td>" + cVal.stable + "</td></tr>";
                });
                displayHtml += '</table><p><a name="description"></a>' + val.description + '</p>';
                toc += '<ul><li><a href="#TheTable">' + jDataIn.transl.table + '</a></li><li><a href="#description">' + jDataIn.transl.description + '</a></li></ul>';
            } 
            
            
            
            
            else if (key === "about") {
                displayHtml += '<div class="h-card" <p><img class="u-photo" id="aboutImg" src="' + val.picture + '"/><br />' + val.description + '</p><ul>';
                $.each(val.contact, function(cKey, cVal) {
                    if (cKey === "E-Mail") {
                        displayHtml += '<li><b>' + cKey + '</b>: <a class="u-email" href="mailto:' + cVal + '">' + cVal + '</a></li>';
                    } else {
                        displayHtml += '<li><b>' + cKey + '</b>: ' + cVal + '</li>';
                    }
                });
                var langs = "";
                toc += '<ul style="list-style-type: none; list-style: none;" ><li><a href="#languages">' + val.languages.trans + '</a></li><ul style="list-style-type: none; list-style: none;">';
                $.each(val.languages, function(lKey, lVal) {
                    if (lKey != "trans") {
                        toc += '<li><a href="#' + lKey + '">' + lKey + '</a></li>';
                        langs += '<li><a name="' + lKey + '" /><b>' + lKey + '</b>: ' + lVal.desc + '<ul style="margin-bottom:10px; list-style-type: none; list-style: none;">';
                        $.each(lVal.frameworks, function(fKey, fVal) {
                            langs += '<li style="margin-bottom:5px;">' + fKey + ': ' + fVal + '</li>';
                        });
                        langs += '</ul></li>';
                    }
                });

                toc += '</ul><li><a href="#sys">' + val.sys.trans + '</a></li><ul>';
                var syst = "<ul>";
                $.each(val.sys, function(sKey, sVal) {
                    if ((sKey != "trans") && (sKey != "centossub")) {
                        if (sKey === "CentOS") {
                            toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                            syst += '<li><a name="' + sKey + '" /><b>' + sKey + '</b>: ' + sVal + '</li><ul>';
                            $.each(val.sys.centossub, function(subKey, subValue) {
                                syst += '<li><a name="' + subKey + '" /><b>' + subKey + '</b>: ' + subValue + '</li>';
                            });
                            syst += '</ul>';
                        } else {
                            toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                            syst += '<li><a name="' + sKey + '" /><b>' + sKey + '</b>: ' + sVal + '</li>';
                        }
                    }
                });
                toc += '</ul><li><a href="#mobile">' + val.mobile.trans + '</a></li><ul>';
                var mobile = "<ul>";
                $.each(val.mobile, function(mKey, mVal) {
                    if (mKey != "trans") {
                        toc += '<li><a href="#' + mKey + '">' + mKey + '</a></li>';
                        mobile += '<li><a name="' + mKey + '" /><b>' + mKey + '</b>: ' + mVal + '</li>';
                    }
                });

                toc += '</ul><li><a href="#support">' + val.support.trans + '</a></li><ul>';
                var support = "<ul>";
                $.each(val.support.reference, function(sKey, sVal) {
                    toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                    support += '<li><a name="' + sKey + '" /><b>' + sKey + '</b>: ' + sVal + '</li>';
                });
                
                
                toc += '</ul><li><a href="#oldjobs">' + val.oldjobs.trans + '</a></li><ul>';
                var oldjobs = '<p><a name="oldjobs" />' + val.oldjobs.description + '</p';
                
                toc += '</ul><li><a href="#hobbys">' + val.hobbys.trans + '</a></li><ul>';
                var hobbys = "<ul>";
                $.each(val.hobbys, function(hKey, hVal) {
                    if (hKey != "trans") {
                        toc += '<li><a href="#' + hKey + '">' + hKey + '</a></li>';
                        hobbys += '<li><a name="' + hKey + '" /><b>' + hKey + '</b>: ' + hVal + '</li>';
                    }
                });
                
                toc += "</ul></ul>";
                //displayHtml += "</div>"+toc+"</ul>";
                displayHtml += '</ul><h3><a name="languages" />' + val.languages.trans + '</h3><ul>';
                displayHtml += langs + '</ul>';
                displayHtml += '</ul><h3><a name="sys" />' + val.sys.trans + '</h3><ul>';
                displayHtml += syst + '</ul>';
                displayHtml += '<h3><a name="mobile" />' + val.mobile.trans + '</h3>';
                displayHtml += mobile + '</ul></div>';
                displayHtml += '<h3><a name="support" />' + val.support.trans + '</h3>';
                displayHtml += val.support.desc + support + '</ul></div>';
                displayHtml += '<h3><a name="oldjobs" />' + val.oldjobs.trans + '</h3>';
                displayHtml += oldjobs + '</ul></div>';
                displayHtml += '<h3><a name="hobbys" />' + val.hobbys.trans + '</h3>';
                displayHtml += hobbys + '</ul></div>';

            } else {
                displayHtml += "<h2>" + val.title + '</h2><p>' + val.preword + "</p>";
                toc += '<ul><li><a href="#features">' + jDataIn.transl.features + '</a></li>';
                var pictureCount = Object.keys(val.pictures).length
                if (pictureCount > 0) {
                    toc += '<li><a href="#pictures">' + jDataIn.transl.pictures + '</a></li>';
                }
                toc += '<li><a href="#bugs">' + jDataIn.transl.bugs + '</a></li><li><a href="#description">' + jDataIn.transl.description + '</a></li></ul>';
                displayHtml += '<a href="index.html" onclick="changeContent(\'index\'); return false">Links</a>';
                displayHtml += "<h3><a name='features' />" + jDataIn.transl.features + "</h3><ul>";
                $.each(val.features, function(fKey, fVal) {
                    displayHtml += "<li>" + fKey + ": " + fVal + "</li>";
                });

                if (pictureCount > 0) {
                    displayHtml += '</ul><h3><a name="pictures" />' + jDataIn.transl.pictures + '</h3><ul>';
                    $.each(val.pictures, function(pKey, pVal) {
                        displayHtml += '<li>' + pVal.desc + ':<br /> <a href="' + pVal.link + '" title="' + pVal.desc + '" class="gallerybox" data-fancybox-group="gallery"><img class="projectpic" src="' + pVal.src + '" /></a></li>';
                    });
                }
                displayHtml += '</ul><h3 ><a name="bugs" />' + jDataIn.transl.bugs + '</h3><ul>';
                $.each(val.bugs, function(bKey, bVal) {
                    displayHtml += "<li>" + bKey + ": " + bVal + "</li>";
                });
                displayHtml += "</ul><h3><a name='description' />" + jDataIn.transl.description + "</h3><p>" + val.description + "</p>";
            }
        }
    });
    //alert(toc);
    if ((toc == "undefined") || (toc == "")) {

        toc = "Some loaded foo-replace";
    }
    displayHtml += "</div>";
    return [displayHtml, toc];
}


function updateContent() {
    "use strict";
    var jqxhr = $.getJSON(jsonFile, function() {});
    jqxhr.complete(function(data) {
        if (typeof(Storage) !== "undefined") {
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
        }, 500, function() {
            var ProcessedHtml = processHtml(jData, name);
            $("#showContent").html(ProcessedHtml[0]);
            $("#toc").html(ProcessedHtml[1]);
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        $("#animationContainer").effect("slide", {
            "direction": "right",
            "mode": "show"
        }, 500);
        lastName = name;
    }

    return false;
}