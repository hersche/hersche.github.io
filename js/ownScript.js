/**
    A little wrapper for the createStoryJS-function
**/
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

/** 
    Generates a menu out of json. This one is for just one entry with a submenu (the first one). Would be possible to improve, but it's not necessary for that case
**/
function processMenuHtml(jDataIn) {
    var menuHtml = '<ul id="menuul" >';
    var parent = "";
    var downSign = "";
    $.each(jDataIn, function (menuName, value) {
        if ((menuName != "transl") && (menuName != "about")) {
            if (menuName == "index") {
                downSign = " <b>&darr;</b> ";
                parent = ' class="dropdowncontainer" ';
            }
            menuHtml += '<li' + parent + ' ><a href="#" onclick="changeContent(\'' + menuName + '\'); return false;" id="' + menuName + 'Btn" class="btn fade">'+downSign + value.title + downSign+'</a>';
            // This is because i know, index is the first.. it have to be!	  
            if (menuName != "index") {
                menuHtml += '</li>';
            }
            if (menuName == "index") {
                menuHtml += "<ul class=\"submenu\">";
                //after first round they're done
                parent = "";
                downSign = "";
            }
        }
    });
    return menuHtml + '</li></ul>';


}

/**
    This processes the content out of json. The applications are in the elsepart, the rest is specially used for cases.
**/
function processHtmlNext(jDataIn, name) {
    "use strict";
    var displayHtml = '';
    var toc = "";
    $.each(jDataIn, function (key, val) {
        if ("transl" !== key) {
            if (key === "index") {
                displayHtml += '<article id="'+key+'"><h2>' + val.title + "</h2><p>" + val.preword + '</p><a name="TheTable" class="anchor" ><a/><table><tr><th>' + jDataIn.transl.projectname + '</th><th>' + jDataIn.transl.source + '</th>';
                displayHtml += "<th>" + jDataIn.transl.doc + "</th><th>" + jDataIn.transl.stability + "</th></tr>";
                $.each(val.content, function (cKey, cVal) {
                    displayHtml += '<tr><td><a href="index.html?s=' + cVal.pLink + '" onclick="changeContent(\'' + cVal.pLink + '\'); return false;" >' + cKey + '</a></td><td><a href="' + cVal.sLink + '">Src</a></td>';
                    displayHtml += "<td><a href='" + cVal.dLink + "'>Doc</a></td><td>" + cVal.stable + "</td></tr>";
                });
                displayHtml += '</table><p><a name="description" class="anchor" ></a>' + val.description + '</p></article>';
                toc += '<ul><li><a href="#TheTable">' + jDataIn.transl.table + '</a></li><li><a href="#description">' + jDataIn.transl.description + '</a><ul><li><a href="#website">Website</a></li><li><a href="#security">'+jDataIn.transl.security+'</a></li><li><a href="#about">'+jDataIn.transl.about+'</a></li></ul></li></ul>';
                
                
            } else if (key === "about") {
                displayHtml += '<article id="'+key+'"><div class="h-card" <p><img class="u-photo" id="aboutImg" src="' + val.picture + '"/>' + val.description + '</p><table>';
                $.each(val.contact, function (cKey, cVal) {
                    if (cKey === "E-Mail") {
                        displayHtml += '<tr><td><b>' + cKey + '</b>:</td><td><a class="u-email" href="mailto:' + cVal + '">' + cVal + '</a></td></tr>';
                    } else {
                        displayHtml += '<tr><td><b>' + cKey + '</b>:</td><td> ' + cVal + '</td></tr>';
                    }
                });
                displayHtml += '</table>';
                var langs = "";
                toc += '<h4>'+jDataIn.transl.about+'</h4><ul style="list-style-type: none; list-style: none;" ><li><a href="#languages">' + val.languages.trans + '</a></li><ul style="list-style-type: none; list-style: none;">';
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
                
                toc += '</ul><li><a href="#rlangs">' + jDataIn.transl.reallang + '</a></li><ul>';
                var rlangs = "<ul>";
                $.each(val.rlang, function (sKey, sVal) {
                            toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                            rlangs += '<li><b>' + sKey + '</b><a name="' + sKey + '" class="anchor" />: ' + sVal + '</li>';
                        }
                    
                );
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

                toc += "</ul></ul><hr />";
                //displayHtml += "</div>"+toc+"</ul>";
                displayHtml += '<h2>'+jDataIn.transl.expiriences+'</h2>'+jDataIn.about.timeline;
                displayHtml += '<h3><a name="languages" class="anchor" />' + val.languages.trans + '</h3><ul>';
                displayHtml += langs + '</ul>';
                displayHtml += '</ul><h3><a name="rlangs" class="anchor" />' + jDataIn.transl.reallang + '</h3><ul>';
                displayHtml += rlangs + '</ul>';
                displayHtml += '</ul><h3><a name="sys" class="anchor" />' + val.sys.trans + '</h3><ul>';
                displayHtml += syst + '</ul>';
                displayHtml += '<h3><a name="mobile" class="anchor" />' + val.mobile.trans + '</h3>';
                displayHtml += mobile + '</ul></div>';
                displayHtml += '<h3><a name="support" class="anchor" />' + val.support.trans + '</h3>';
                displayHtml += val.support.desc + support + '</ul></div>';
                displayHtml += '<h3><a name="oldjobs" class="anchor" />' + val.oldjobs.trans + '</h3>';
                displayHtml += oldjobs + '</ul></div>';
                displayHtml += '<h3><a name="hobbys" class="anchor" />' + val.hobbys.trans + '</h3>';
                displayHtml += hobbys + '</ul></div></article>';

            } else {
                displayHtml += '<article id="'+key+'"><h2>' + val.title + '</h2><p>' + val.preword + "</p>";
                toc += '<h4>'+key+'</h4><ul><li><a href="#'+key+'features">' + jDataIn.transl.features + '</a></li>';
                var pictureCount = Object.keys(val.pictures).length
                if (pictureCount > 0) {
                    toc += '<li><a href="#'+key+'pictures" >' + jDataIn.transl.pictures + '</a></li>';
                }
                toc += '<li><a href="#'+key+'bugs">' + jDataIn.transl.bugs + '</a></li><li><a href="#'+key+'description">' + jDataIn.transl.description + '</a></li></ul><hr />';
                displayHtml += '<a href="index.html" onclick="changeContent(\'index\'); return false">Links</a>';
                displayHtml += '<h3><a name="'+key+'features" class="anchor" />' + jDataIn.transl.features + '</h3><ul>';
                $.each(val.features, function (fKey, fVal) {
                    displayHtml += "<li>" + fKey + ": " + fVal + "</li>";
                });

                if (pictureCount > 0) {
                    displayHtml += '</ul><h3><a name="'+key+'pictures" class="anchor" />' + jDataIn.transl.pictures + '</h3><ul>';
                    $.each(val.pictures, function (pKey, pVal) {
                        displayHtml += '<li>' + pVal.desc + ': <br /><a href="' + pVal.link + '" title="' + pVal.desc + '" class="gallerybox" data-fancybox-group="gallery"><img class="projectpic" src="' + pVal.src + '" /></a></li>';
                    });
                }
                displayHtml += '</ul><h3 ><a name="'+key+'bugs" class="anchor" />' + jDataIn.transl.bugs + '</h3><ul>';
                $.each(val.bugs, function (bKey, bVal) {
                    displayHtml += "<li>" + bKey + ": " + bVal + "</li>";
                });
                displayHtml += '</ul><h3><a name="'+key+'description" class="anchor" />' + jDataIn.transl.description + '</h3><p>' + val.description + '</p></article>';
            }
           } 
        displayHtml += '<hr />';
        
    });
    if ((toc == "undefined") || (toc == "")) {

        toc = "No TOC should not be possible. There's a failure!";
    }
    displayHtml += "</div>";
    return [displayHtml, toc];
}


/**
    This processes the content out of json. The applications are in the elsepart, the rest is specially used for cases.
**/
function processHtml(jDataIn, name) {
    "use strict";
    var displayHtml = '<div>';
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
                displayHtml += '<div class="h-card" <p><img class="u-photo" id="aboutImg" src="' + val.picture + '"/>' + val.description + '</p><table>';
                $.each(val.contact, function (cKey, cVal) {
                    if (cKey === "E-Mail") {
                        displayHtml += '<tr><td><b>' + cKey + '</b>:</td><td><a class="u-email" href="mailto:' + cVal + '">' + cVal + '</a></td></tr>';
                    } else {
                        displayHtml += '<tr><td><b>' + cKey + '</b>:</td><td> ' + cVal + '</td></tr>';
                    }
                });
                displayHtml += '</table>';
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
                
                toc += '</ul><li><a href="#rlangs">' + jDataIn.transl.reallang + '</a></li><ul>';
                var rlangs = "<ul>";
                $.each(val.rlang, function (sKey, sVal) {
                            toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                            rlangs += '<li><b>' + sKey + '</b><a name="' + sKey + '" class="anchor" />: ' + sVal + '</li>';
                        }
                    
                );
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
                displayHtml += '<h2>'+jDataIn.transl.expiriences+'</h2>'+jDataIn.about.timeline;
                displayHtml += '<h3><a name="languages" class="anchor" />' + val.languages.trans + '</h3><ul>';
                displayHtml += langs + '</ul>';
                displayHtml += '</ul><h3><a name="rlangs" class="anchor" />' + jDataIn.transl.reallang + '</h3><ul>';
                displayHtml += rlangs + '</ul>';
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
    if ((toc == "undefined") || (toc == "")) {

        toc = "No TOC should not be possible. There's a failure!";
    }
    displayHtml += "</div>";
    return [displayHtml, toc];
}
// Remove offlinecontent and reload
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

/**
    Fetch get-variables through this method.
**/
function GET(v) {
    "use strict";
    if (!HTTP_GET_VARS[v]) {
        return 'undefined';
    }
    return HTTP_GET_VARS[v];
}

/**
    Change from one content to another.
**/
function changeContent(name) {
    "use strict";
    if (history.pushState) {
        history.pushState({
            "id": 100
        }, "skamster.github.io::" + name, "index.html?s=" + name);
    }
    if (name != lastName) {
        $( "#animationContainer" ).hide("slide",{direction:"right"},"slow", function() {
        // Animation complete.
        var ProcessedHtml = processHtml(jData, name);
        $("#showContent").html(ProcessedHtml[0]);
        $("#toc").html(ProcessedHtml[1]);
});
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        $("#animationContainer").show("puff",{},1000);
        lastName = name;
    }

    return false;
}