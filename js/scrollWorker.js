var indexTop;
var indexSubTop;
var petaTop;
var petaSubTop;
var tryToxicTop;
var tryToxicSubTop;
var jobManagementTop;
var jobManagementSubTop;
var herschegithubioTop;
var herschegithubioSubTop;
var multismsTop;
var multismsSubTop;
var aboutTop;
var aboutSubTop;

/**
    This will look, where your mouse is right now. It need defineTops(); for fill the (initialy empty) variables.
**/
function getCurrentIDNext(curPos) {
    var sub = "";
    if (tryToxicTop > curPos) {
        //  console.info(indexSubTop[0] + " vs " + indexSubTop[1] + " curpos " + curPos);
        if ((indexTop < curPos) && (indexSubTop[0] > curPos)) {
            //  console.info("PRE description");
            // respective before the table
            sub = "tocindextable"
        } else if ((indexSubTop[0] < curPos) && (indexSubTop[1] > curPos)) {
            // console.info("table");
            sub = "tocindextable";
        } else if (indexSubTop[1] < curPos) {
            // console.info("description");
            sub = "tocindexdescription";
        }
        // console.info(curPos + "currentPos, " + indexSubTop[0] + " [0], " + indexSubTop[1] + " [1] " + indexTop + " indextop, " + sub + " sub");
        return ["index", sub];
    } else if ((tryToxicTop < curPos) && (jobManagementTop > curPos)) {
        if ((tryToxicTop < curPos) && (tryToxicSubTop[0] > curPos)) {
            sub = "tryToxic"
        } else if ((tryToxicSubTop[0] < curPos) && (tryToxicSubTop[1] > curPos)) {
            sub = "toctryToxicfeatures";
        } else if ((tryToxicSubTop[1] < curPos) && (tryToxicSubTop[2] > curPos)) {
            sub = "toctryToxicpictures";
        } else if ((tryToxicSubTop[2] < curPos) && (tryToxicSubTop[3] > curPos)) {
            sub = "toctryToxicbugs";
        } else {
            sub = "toctryToxicdescription";
        }
        //console.info(sub);
        return ["tryToxic", sub];
    } else if ((jobManagementTop < curPos) && (multismsTop > curPos)) {
        if ((jobManagementTop < curPos) && (jobManagementSubTop[0] > curPos)) {
            sub = "jobManagement"
        } else if ((jobManagementSubTop[0] < curPos) && (jobManagementSubTop[1] > curPos)) {
            sub = "tocjobManagementfeatures";
        } else if ((jobManagementSubTop[1] < curPos) && (jobManagementSubTop[2] > curPos)) {
            sub = "tocjobManagementpictures";
        } else if ((jobManagementSubTop[2] < curPos) && (jobManagementSubTop[3] > curPos)) {
            sub = "tocjobManagementbugs";
        } else {
            sub = "tocjobManagementdescription";
        }
        // console.info(sub);
        return ["jobManagement", sub];
    } else if ((multismsTop < curPos) && (petaTop > curPos)) {
        if ((multismsTop < curPos) && (multismsSubTop[0] > curPos)) {
            sub = "multisms"
        } else if ((multismsSubTop[0] < curPos) && (multismsSubTop[1] > curPos)) {
            sub = "tocmultismspictures";
        } else if ((multismsSubTop[1] < curPos) && (multismsSubTop[2] > curPos)) {
            sub = "tocmultismsfeatures";
        } else if (multismsSubTop[2] > curPos) {
            sub = "tocmultismsdescription";
        }
        //console.info(sub);
        return ["multisms", sub];
    } else if ((petaTop < curPos) && (herschegithubioTop > curPos)) {
        if ((petaTop < curPos) && (petaSubTop[0] > curPos)) {
            sub = "peta"
        } else if ((petaSubTop[0] < curPos) && (petaSubTop[1] > curPos)) {
            sub = "tocpetapictures";
        } else if ((petaSubTop[1] < curPos) && (petaSubTop[2] > curPos)) {
            sub = "tocmultismsfeatures";
        } else if (petaSubTop[2] > curPos) {
            sub = "tocpetadescription";
        }
        //console.info(sub);
        return ["peta", sub];
    } else if ((herschegithubioTop < curPos) && (aboutTop > curPos)) {

        return ["skamstergithubio", sub];
    } else if (aboutTop < curPos) {
        return ["about", sub];
    } else {
        return ["-1", sub];
    }
}

self.addEventListener('message', function (e) {
    var data = e.data;
    switch (data.cmd) {
    case 'start':
        self.postMessage('WORKER STARTED: ' + data.msg);
        break;
    case 'stop':
        self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
        self.close(); // Terminates the worker.
        break;
    case 'setHeight':
        indexTop = data.msg[0];
        indexSubTop = data.msg[1];
        petaTop = data.msg[2];
        petaSubTop = data.msg[3];
        tryToxicTop = data.msg[4];
        tryToxicSubTop = data.msg[5];
        jobManagementTop = data.msg[6];
        jobManagementSubTop = data.msg[7];
        herschegithubioTop = data.msg[8];
        herschegithubioSubTop = data.msg[9];
        multismsTop = data.msg[10];
        multismsSubTop = data.msg[11];
        aboutTop = data.msg[12];
        aboutSubTop = data.msg[13];
        self.postMessage('WORKER Set values: ' + herschegithubioSubTop[1]);
        break;
    case 'getCurrentElement':
        self.postMessage(getCurrentIDNext(data.msg));
        break;
    default:
        self.postMessage('Unknown command: ' + data.msg);
    };
}, false);