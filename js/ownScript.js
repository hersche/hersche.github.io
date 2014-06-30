function createTimeline(tlD, lang) {
        createStoryJS({
        type:       'timeline',
        width:      '850',
        height:     '500',
        source:     tlD,
        lang:       lang,
        embed_id:   'my-timeline',
        debug:  'false'
    });
}

function processMenuHtml(jDataIn) {
    var menuHtml = '<ul id="menuul" >';
    $.each(jDataIn, function (menuName, value) {
        var parent = "";
        var downSign = "";
        if (menuName != "transl") {
            if (menuName == "index") {
                styleClass = '"submenu"';
                downSign = " <b>&darr;</b> ";
                parent = ' class="dropdowncontainer" ';
            }
            menuHtml += '<li' + parent + ' ><a href="#" data-tool="' + value.preword + '" onclick="changeContent(\'' + menuName + '\'); return false;" class="btn fade">'+downSign + value.title + downSign+'</a>';
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
    $.each(jDataIn, function (key, val) {
        if (name === key) {
            if (key === "index") {
                displayHtml += "<h2>" + val.title + "</h2><p>" + val.preword + '</p><a name="TheTable" class="anchor" ><a/><table><tr><th>' + jDataIn.transl.projectname + '</th><th>' + jDataIn.transl.source + '</th>';
                displayHtml += "<th>" + jDataIn.transl.doc + "</th><th>" + jDataIn.transl.stability + "</th></tr>";
                $.each(val.content, function (cKey, cVal) {
                    displayHtml += '<tr><td><a href="index.html?s=' + cVal.pLink + '" onclick="changeContent(\'' + cVal.pLink + '\'); return false;" >' + cKey + '</a></td><td><a href="' + cVal.sLink + '">Src</a></td>';
                    displayHtml += "<td><a href='" + cVal.dLink + "'>Doc</a></td><td>" + cVal.stable + "</td></tr>";
                });
                displayHtml += '</table><p><a name="description" class="anchor" ></a>' + val.description + '</p>';
                toc += '<ul><li><a href="#TheTable">' + jDataIn.transl.table + '</a></li><li><a href="#description">' + jDataIn.transl.description + '</a><ul><li><a href="#website">Website</a></li><li><a href="#security">'+jDataIn.transl.security+'</a></li><li><a href="#about">'+jDataIn.transl.about+'</a></li></ul></li></ul>';
            } else if (key === "about") {
                displayHtml += '<div class="h-card" <p><img class="u-photo" id="aboutImg" src="' + val.picture + '"/><br />' + val.description + '</p><ul>';
                $.each(val.contact, function (cKey, cVal) {
                    if (cKey === "E-Mail") {
                        displayHtml += '<li><b>' + cKey + '</b>: <a class="u-email" href="mailto:' + cVal + '">' + cVal + '</a></li>';
                    } else {
                        displayHtml += '<li><b>' + cKey + '</b>: ' + cVal + '</li>';
                    }
                });
                var langs = "";
                toc += '<ul style="list-style-type: none; list-style: none;" ><li><a href="#languages">' + val.languages.trans + '</a></li><ul style="list-style-type: none; list-style: none;">';
                $.each(val.languages, function (lKey, lVal) {
                    if (lKey != "trans") {
                        toc += '<li><a href="#' + lKey + '">' + lKey + '</a></li>';
                        langs += '<li><b>' + lKey + '</b><a name="' + lKey + '" class="anchor" />: ' + lVal.desc + '<ul style="margin-bottom:10px; list-style-type: none; list-style: none;">';
                        $.each(lVal.frameworks, function (fKey, fVal) {
                            langs += '<li style="margin-bottom:5px;">' + fKey + ': ' + fVal + '</li>';
                        });
                        langs += '</ul></li>';
                    }
                });

                toc += '</ul><li><a href="#sys">' + val.sys.trans + '</a></li><ul>';
                var syst = "<ul>";
                $.each(val.sys, function (sKey, sVal) {
                    if ((sKey != "trans") && (sKey != "centossub")) {
                        if (sKey === "CentOS") {
                            toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                            syst += '<li><b>' + sKey + '</b>: ' + sVal + '<a name="' + sKey + '" class="anchor" /></li><ul>';
                            $.each(val.sys.centossub, function (subKey, subValue) {
                                syst += '<li><b>' + subKey + '</b><a name="' + subKey + '" class="anchor" />: ' + subValue + '</li>';
                            });
                            syst += '</ul>';
                        } else {
                            toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                            syst += '<li><b>' + sKey + '</b><a name="' + sKey + '" class="anchor" />: ' + sVal + '</li>';
                        }
                    }
                });
                toc += '</ul><li><a href="#mobile">' + val.mobile.trans + '</a></li><ul>';
                var mobile = "<ul>";
                $.each(val.mobile, function (mKey, mVal) {
                    if (mKey != "trans") {
                        toc += '<li><a href="#' + mKey + '">' + mKey + '</a></li>';
                        mobile += '<li><b>' + mKey + '</b><a name="' + mKey + '" class="anchor" />: ' + mVal + '</li>';
                    }
                });

                toc += '</ul><li><a href="#support">' + val.support.trans + '</a></li><ul>';
                var support = "<ul>";
                $.each(val.support.reference, function (sKey, sVal) {
                    toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                    support += '<li><b>' + sKey + '</b><a name="' + sKey + '" class="anchor" />: ' + sVal + '</li>';
                });


                toc += '</ul><li><a href="#oldjobs">' + val.oldjobs.trans + '</a></li><ul>';
                var oldjobs = '<p><a name="oldjobs" class="anchor" />' + val.oldjobs.description + '</p>';

                toc += '</ul><li><a href="#hobbys">' + val.hobbys.trans + '</a></li><ul>';
                var hobbys = "<ul>";
                $.each(val.hobbys, function (hKey, hVal) {
                    if (hKey != "trans") {
                        toc += '<li><a href="#' + hKey + '">' + hKey + '</a></li>';
                        hobbys += '<li><b>' + hKey + '</b><a name="' + hKey + '" class="anchor" />: ' + hVal + '</li>';
                    }
                });

                toc += "</ul></ul>";
                //displayHtml += "</div>"+toc+"</ul>";
                displayHtml += '</ul><h2>'+jDataIn.transl.expiriences+'</h2>'+jDataIn.transl.timeline;
                displayHtml += '<h3><a name="languages" class="anchor" />' + val.languages.trans + '</h3><ul>';
                displayHtml += langs + '</ul>';
                displayHtml += '</ul><h3><a name="sys" class="anchor" />' + val.sys.trans + '</h3><ul>';
                displayHtml += syst + '</ul>';
                displayHtml += '<h3><a name="mobile" class="anchor" />' + val.mobile.trans + '</h3>';
                displayHtml += mobile + '</ul></div>';
                displayHtml += '<h3><a name="support" class="anchor" />' + val.support.trans + '</h3>';
                displayHtml += val.support.desc + support + '</ul></div>';
                displayHtml += '<h3><a name="oldjobs" class="anchor" />' + val.oldjobs.trans + '</h3>';
                displayHtml += oldjobs + '</ul></div>';
                displayHtml += '<h3><a name="hobbys" class="anchor" />' + val.hobbys.trans + '</h3>';
                displayHtml += hobbys + '</ul></div>';

            } else {
                displayHtml += "<h2>" + val.title + '</h2><p>' + val.preword + "</p>";
                toc += '<ul><li><a href="#features">' + jDataIn.transl.features + '</a></li>';
                var pictureCount = Object.keys(val.pictures).length
                if (pictureCount > 0) {
                    toc += '<li><a href="#pictures" >' + jDataIn.transl.pictures + '</a></li>';
                }
                toc += '<li><a href="#bugs">' + jDataIn.transl.bugs + '</a></li><li><a href="#description">' + jDataIn.transl.description + '</a></li></ul>';
                displayHtml += '<a href="index.html" onclick="changeContent(\'index\'); return false">Links</a>';
                displayHtml += '<h3><a name="features" class="anchor" />' + jDataIn.transl.features + '</h3><ul>';
                $.each(val.features, function (fKey, fVal) {
                    displayHtml += "<li>" + fKey + ": " + fVal + "</li>";
                });

                if (pictureCount > 0) {
                    displayHtml += '</ul><h3><a name="pictures" class="anchor" />' + jDataIn.transl.pictures + '</h3><ul>';
                    $.each(val.pictures, function (pKey, pVal) {
                        displayHtml += '<li>' + pVal.desc + ': <br /><a href="' + pVal.link + '" title="' + pVal.desc + '" class="gallerybox" data-fancybox-group="gallery"><img class="projectpic" src="' + pVal.src + '" /></a></li>';
                    });
                }
                displayHtml += '</ul><h3 ><a name="bugs" class="anchor" />' + jDataIn.transl.bugs + '</h3><ul>';
                $.each(val.bugs, function (bKey, bVal) {
                    displayHtml += "<li>" + bKey + ": " + bVal + "</li>";
                });
                displayHtml += '</ul><h3><a name="description" class="anchor" />' + jDataIn.transl.description + '</h3><p>' + val.description + '</p>';
            }
        }
    });
    //alert(toc);
    if ((toc == "undefined") || (toc == "")) {

        toc = "No TOC should not be possible. There's a failure!";
    }
    displayHtml += "</div>";
    return [displayHtml, toc];
}


function updateContent() {
    "use strict";
    var jqxhr = $.getJSON(jsonFile, function () {});
    jqxhr.complete(function (data) {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("jData");
            localStorage.removeItem("storeDate");
            localStorage.removeItem("tlData");
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
        $( "#animationContainer" ).fadeOut( "slow", function() {
        // Animation complete.
        var ProcessedHtml = processHtml(jData, name);
        $("#showContent").html(ProcessedHtml[0]);
        $("#toc").html(ProcessedHtml[1]);
});
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        $("#animationContainer").fadeIn(1000);
        lastName = name;
    }

    return false;
}