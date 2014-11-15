/**
    A little wrapper for the createStoryJS-function
**/
function createTimeline(tlD, lang) {
    createStoryJS({
        type: 'timeline',
        width: '850',
        height: '500',
        source: tlD,
        lang: lang,
        embed_id: 'my-timeline',
        debug: 'false'
    });
}

/** 
    Generates a menu out of json. This one is for just one entry with a submenu (the first one). Would be possible to improve, but it's not necessary for that case
**/
function processMenuHtml(jDataIn) {
    var downSign = "";
    var menuHtml = "<span>Projects</span><ul class=\"submenu submenuInvisible \" >";
    $.each(jDataIn, function (menuName, value) {
        if ((menuName != "transl") && (menuName != "about") && (menuName != "index")) {

            menuHtml += '<li><a href="#" onclick="changeContent(\'' + menuName + '\'); return false;" id="' + menuName + 'Btn">' + value.title + '</a></li>';

        }
    });
    return menuHtml + '</ul>';


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
                displayHtml += '<article id="' + key + '"><h2>' + val.title + "</h2><p>" + val.preword + '</p><a name="TheTable" class="anchor" ><a/><table><tr><th>' + jDataIn.transl.projectname + '</th><th>' + jDataIn.transl.source + '</th>';
                displayHtml += "<th>" + jDataIn.transl.doc + "</th><th>" + jDataIn.transl.stability + "</th></tr>";
                $.each(val.content, function (cKey, cVal) {
                    displayHtml += '<tr><td><a href="index.html?s=' + cVal.pLink + '" onclick="changeContent(\'' + cVal.pLink + '\'); return false;" >' + cKey + '</a></td><td><a href="' + cVal.sLink + '">Src</a></td>';
                    displayHtml += "<td><a href='" + cVal.dLink + "'>Doc</a></td><td>" + cVal.stable + "</td></tr>";
                });
                displayHtml += '</table><p><a name="description" class="anchor" ></a>' + val.description + '</p></article>';
                toc += '<h2 id="toc' + key + '">Home</h2><ul><li id="tocindextable"><a href="#TheTable">' + jDataIn.transl.table + '</a></li><li id="tocindexwebsite"><a href="#website">Website</a></li><li id="tocindexsecurity"><a href="#security">' + jDataIn.transl.security + '</a></li><li id="tocindexabout"><a href="#homeAbout">' + jDataIn.transl.about + '</a></li></ul></li></ul>';


            } else if (key === "about") {
                displayHtml += '<article id="' + key + '"><div class="h-card" <p><img class="u-photo" id="aboutImg" src="' + val.picture + '"/>' + val.description + '</p><table>';
                $.each(val.contact, function (cKey, cVal) {
                    if (cKey === "E-Mail") {
                        displayHtml += '<tr><td><b>' + cKey + '</b>:</td><td><a class="u-email" href="mailto:' + cVal + '">' + cVal + '</a></td></tr>';
                    } else {
                        displayHtml += '<tr><td><b>' + cKey + '</b>:</td><td> ' + cVal + '</td></tr>';
                    }
                });
                displayHtml += '</table>';
                var langs = "";
                toc += '<h2 id="toc' + key + '">' + jDataIn.transl.about + '</h2><ul style="list-style-type: none; list-style: none;" ><li id="tocaboutlanguages" ><a href="#languages">' + val.languages.trans + '</a></li><ul style="list-style-type: none; list-style: none;">';
                $.each(val.languages, function (lKey, lVal) {
                    if (lKey != "trans") {
                        toc += '<li id="tocabout' + lKey + '"><a href="#' + lKey + '">' + lKey + '</a></li>';
                        langs += '<li><b>' + lKey + '</b><a name="' + lKey + '" class="anchor" />: ' + lVal.desc + '<ul style="margin-bottom:10px; list-style-type: none; list-style: none;">';
                        $.each(lVal.frameworks, function (fKey, fVal) {
                            langs += '<li style="margin-bottom:5px;">' + fKey + ': ' + fVal + '</li>';
                        });
                        langs += '</ul></li>';
                    }
                });

                toc += '</ul><li id="tocaboutrlangs"><a href="#rlangs">' + jDataIn.transl.reallang + '</a></li><ul>';
                var rlangs = "<ul>";
                $.each(val.rlang, function (sKey, sVal) {
                        toc += '<li id="tocabout' + sKey + '"><a href="#' + sKey + '">' + sKey + '</a></li>';
                        rlangs += '<li><b>' + sKey + '</b><a name="' + sKey + '" class="anchor" />: ' + sVal + '</li>';
                    }

                );
                toc += '</ul><li id="tocaboutsys"><a href="#sys">' + val.sys.trans + '</a></li><ul>';
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
                toc += '</ul><li id="tocaboutmobile"><a href="#mobile">' + val.mobile.trans + '</a></li><ul>';
                var mobile = "<ul>";
                $.each(val.mobile, function (mKey, mVal) {
                    if (mKey != "trans") {
                        toc += '<li><a href="#' + mKey + '">' + mKey + '</a></li>';
                        mobile += '<li><b>' + mKey + '</b><a name="' + mKey + '" class="anchor" />: ' + mVal + '</li>';
                    }
                });

                toc += '</ul><li id="tocaboutsupport"><a href="#support">' + val.support.trans + '</a></li><ul>';
                var support = "<ul>";
                $.each(val.support.reference, function (sKey, sVal) {
                    toc += '<li><a href="#' + sKey + '">' + sKey + '</a></li>';
                    support += '<li><b>' + sKey + '</b><a name="' + sKey + '" class="anchor" />: ' + sVal + '</li>';
                });


                toc += '</ul><li id="tocaboutoldjobs"><a href="#oldjobs">' + val.oldjobs.trans + '</a></li><ul>';
                var oldjobs = '<p><a name="oldjobs" class="anchor" />' + val.oldjobs.description + '</p>';

                toc += '</ul><li id="tocabouthobbys"><a href="#hobbys">' + val.hobbys.trans + '</a></li><ul>';
                var hobbys = "<ul>";
                $.each(val.hobbys, function (hKey, hVal) {
                    if (hKey != "trans") {
                        toc += '<li><a href="#' + hKey + '">' + hKey + '</a></li>';
                        hobbys += '<li><b>' + hKey + '</b><a name="' + hKey + '" class="anchor" />: ' + hVal + '</li>';
                    }
                });

                toc += "</ul></ul>";
                //displayHtml += "</div>"+toc+"</ul>";
                displayHtml += '<h2>' + jDataIn.transl.expiriences + '</h2>' + jDataIn.about.timeline;
                displayHtml += '<h3><a name="languages" class="anchor" />' + val.languages.trans + '</h3><ul>';
                displayHtml += langs + '</ul>';
                displayHtml += '</ul><h3><a name="rlangs" class="anchor" />' + jDataIn.transl.reallang + '</h3><ul>';
                displayHtml += rlangs + '</ul>';
                displayHtml += '</ul><h3><a name="sys" class="anchor" />' + val.sys.trans + '</h3>';
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
                displayHtml += '<article id="' + key + '"><h2>' + val.title + '</h2><p>' + val.preword + "</p>";
                toc += '<h2 id="toc' + key + '">' + val.title + '</h2><ul><li id="toc' + key + 'features"><a href="#' + key + 'features">' + jDataIn.transl.features + '</a></li>';
                var pictureCount = Object.keys(val.pictures).length;
                if (pictureCount > 0) {
                    toc += '<li id="toc' + key + 'pictures"><a href="#' + key + 'pictures" >' + jDataIn.transl.pictures + '</a></li>';
                }
                toc += '<li id="toc' + key + 'bugs"><a href="#' + key + 'bugs">' + jDataIn.transl.bugs + '</a></li><li id="toc' + key + 'description"><a href="#' + key + 'description">' + jDataIn.transl.description + '</a></li></ul>';
                displayHtml += '<a href="index.html" onclick="changeContent(\'index\'); return false">Links</a>';
                displayHtml += '<h3><a name="' + key + 'features" class="anchor" />' + jDataIn.transl.features + '</h3><ul>';
                $.each(val.features, function (fKey, fVal) {
                    displayHtml += "<li>" + fKey + ": " + fVal + "</li>";
                });

                if (pictureCount > 0) {
                    displayHtml += '</ul><h3><a name="' + key + 'pictures" class="anchor" />' + jDataIn.transl.pictures + '</h3><ul id="projectPicture'+key+'">';
                    $.each(val.pictures, function (pKey, pVal) {
                        displayHtml += '<li>' + pVal.desc + ': <br /><a href="' + pVal.link + '" title="' + pVal.desc + '" class="gallerybox" data-fancybox-group="gallery"><img class="projectpic" src="' + pVal.src + '" /></a></li>';
                    });
                }
                displayHtml += '</ul><h3 ><a name="' + key + 'bugs" class="anchor" />' + jDataIn.transl.bugs + '</h3><ul>';
                $.each(val.bugs, function (bKey, bVal) {
                    displayHtml += "<li>" + bKey + ": " + bVal + "</li>";
                });
                displayHtml += '</ul><h3><a name="' + key + 'description" class="anchor" />' + jDataIn.transl.description + '</h3><p>' + val.description + '</p></article>';
            }
        }
        // displayHtml += '<hr />';

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

**/
var extraSpace = 50;

function defineTops() {
    try {
        var showTop = $('#showContent').scrollTop();
        var indexTop = showTop + $('#index').position().top;
        var indexSubTop = [$('a[name=TheTable]').position().top, $('a[name=website]').position().top, $('a[name=security]').position().top, $('a[name=homeAbout]').position().top]
            //indexTocTop = {
            //  table: $('#TheTable').position().top - extraSpace,
            //description: $('#description').position().top - extraSpace
            //}
            // console.info($("li:regex(id, .*ocindex.*)").toString());
        var petaTop = showTop + $('#peta').position().top - extraSpace;
        var petaSubTop = [$('a[name=petafeatures]').position().top, $('a[name=petabugs]').position().top, $('a[name=petadescription]').position().top];
        var tryToxicTop = showTop + $('#tryToxic').position().top - extraSpace;
        var tryToxicSubTop = [$('a[name=tryToxicfeatures]').position().top, $('a[name=tryToxicpictures]').position().top, $('a[name=tryToxicbugs]').position().top, $('a[name=tryToxicdescription]').position().top];
        var jobManagementTop = showTop + $('#jobManagement').position().top - extraSpace;
        var jobManagementSubTop = [$('a[name=jobManagementfeatures]').position().top, $('a[name=jobManagementpictures]').position().top, $('a[name=jobManagementbugs]').position().top, $('a[name=jobManagementdescription]').position().top];
        var herschegithubioTop = showTop + $('#skamstergithubio').position().top - extraSpace;
        var herschegithubioSubTop = [$('a[name=skamstergithubiofeatures]').position().top, $('a[name=skamstergithubiobugs]').position().top, $('a[name=skamstergithubiodescription]').position().top];
        var multismsTop = showTop + $('#multisms').position().top - extraSpace;
        var multismsSubTop = [$('a[name=multismsfeatures]').position().top, $('a[name=multismsbugs]').position().top, $('a[name=multismsdescription]').position().top];
        var aboutTop = showTop + $('#about').position().top - extraSpace;
        /* var aboutSubTop = [$('a[name=languages]').position().top, $('a[name=PHP]').position().top, $('a[name=Python]').position().top, $('a[name=Java]').position().top, $('a[name=Javascript]').position().top, $('a[name=rlangs]').position().top, $('a[name=Deutsch]').position().top, $('a[name=Englisch]').position().top];*/
        var aboutSubTop = [$('a[name=languages]').position().top, $('a[name=rlangs]').position().top, $('a[name=sys]').position().top, $('a[name=mobile]').position().top, $('a[name=support]').position().top, $('a[name=oldjobs]').position().top, $('a[name=hobbys]').position().top];
        return [indexTop, indexSubTop, petaTop, petaSubTop, tryToxicTop, tryToxicSubTop, jobManagementTop, jobManagementSubTop, herschegithubioTop, herschegithubioSubTop, multismsTop, multismsSubTop, aboutTop, aboutSubTop];
    } catch (er) {

        setTimeout(function () {
            console.info("defineTops: one of the variables was undefined. Start defineTops again. " + er);
            defineTops();
        }, 100);

    }
}
var menuForce;
var scrollWorker = new Worker('js/scrollWorker.js');
scrollWorker.addEventListener('message', function (e) {
    // console.info('Worker said: ', e.data);
    if (e.data.length === 2) {
        renderMenu(e.data[0], e.data[1], menuForce);
    }
}, false);
var lastSubMenu = "";
var curPos;

/**
    This updates all the moving buttons, toc, adress
**/
function updateMenu(name, force) {
    name = name || "";
    menuForce = force || false;
    var cId;
    var subcId;
    var window_top = $(window).scrollTop() + 110; // the "12" should equal the margin-top value for nav.stick
    if (name !== "") {
        cId = name;
    } else {
        scrollWorker.postMessage({
            'cmd': 'getCurrentElement',
            'msg': window_top
        });
        // cId = scrollWorkerPosition[0].toString();
        // subcId = scrollWorkerPosition[1].toString();
    }

}

function renderMenu(cId, subcId, force) {
    force = force || false;
    if (subcId) {
        // console.info(cId + " SUBMENU " + subcId);
        if (((subcId !== "") && (subcId !== cId) && (subcId !== "1") && (subcId !== undefined))||(force)) {
            if (cId === "about") {
                console.info("CHANGE SUBMENU " + '#' + subcId);
                $('#toc').stop(true).animate({
                    scrollTop: $('#toc').scrollTop() + $('#' + subcId).position().top - 90
                }, 200);
            }
            
            $("#" + lastSubMenu).removeClass('current_page_item');
            $("#" + subcId).addClass('current_page_item');
            lastSubMenu = subcId;
        }
    }
    // console.info(cId);
    if (((cId !== "-1") && (lastName !== cId)) || (force)) {
        if (history.pushState) {
            history.pushState({
                "id": 100
            }, "hersche.github.io::" + cId, "index.html?s=" + cId);
        }
        if ($("#" + cId + "Btn").parent().parent().hasClass("submenu")) {
            $("#menucontent > span").addClass('current_page_item');
            $("#menucontent > ul").removeClass('submenuInvisible');
        } else {
            $("#menucontent > span").removeClass('current_page_item');
            $("#menucontent > ul").addClass('submenuInvisible');
        }


        $("#mainnav li a").removeClass('current_page_item');
        $("#" + cId + "Btn").addClass('current_page_item');
        document.title = cId + "@hersche.github.io";
        $('#toc').stop(true).animate({
            scrollTop: $('#toc').scrollTop() + $('#toc' + cId).position().top
        }, 200);
        lastName = cId;
    }

}

/**
    Change from one content to another.
**/
function changeContent(name, fuckOff) {
    "use strict";
    fuckOff = fuckOff || false;

    if ((name != lastName) || (fuckOff)) {
        try{ 
        updateMenu(name, fuckOff);
        } catch (er) {
         console.info(er +" with name "+name);   
        }
        if(name===""){ name="index" } 
        $('html, body').animate({
            scrollTop: $('#showContent').scrollTop() + $('#' + name).position().top - 120
        }, 1000);




        lastName = name;
    }

    return false;
}