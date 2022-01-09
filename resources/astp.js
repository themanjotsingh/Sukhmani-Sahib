const astpnum = (new URLSearchParams(window.location.search)).get('astp');

if (astpnum == "null") {
    window.location.replace("/");
}

if (astpnum < 1) {
    window.location.replace("/");
}

if (astpnum > 24) {
    window.location.replace("/");
}
try {
    $.getJSON(
        "resources/shabads.json",
        function (data) {

            lineslist = data[astpnum - 1].bani
            startendlines = lineslist.split(",")

            startline = startendlines[0]
            endline = parseInt(startendlines[1]) + 1
        }
    )
} catch (err) {
    location.reload();
}

$.getJSON("https://api.gurbaninow.com/v2/banis/12",
    function (data) {

        for (var i = startline; i < endline; i++) {

            var div = document.getElementById("0bani");

            var shabad = document.createElement('p');
            shabad.appendChild(document.createTextNode(data.bani[i].line.gurmukhi.unicode));
            if (getCookie("shabad") == "lv") {
                shabad.className = "shabad condensed"
            } else if (getCookie("shabad") == "ps") {
                shabad.className = "shabad"
            } else if (getCookie("shabad") == "lva") {
                shabad.className = "shabad condensed assisted"
                $(document).ready(function () {
                    $(".assisted").lettering('words');
                });
            }

            div.appendChild(shabad);

            var punjabi = document.createElement('p');
            punjabi.appendChild(document.createTextNode(data.bani[i].line.translation.punjabi.default.unicode));
            if (getCookie("punjabi") == "no") {
                punjabi.className = "punjabi hidden"
            } else if (getCookie("punjabi") == "yes") {
                punjabi.className = "punjabi"
            }
            div.appendChild(punjabi);

            var english = document.createElement('p');
            english.appendChild(document.createTextNode(data.bani[i].line.translation.english.default));
            if (getCookie("english") == "no") {
                english.className = "english hidden"
            } else if (getCookie("english") == "yes") {
                english.className = "english"
            }
            div.appendChild(english);

        }

    });


backlink = "/astp.html?astp=" + (parseInt(astpnum) - 1)
document.getElementById("backtop").setAttribute("href", backlink);
document.getElementById("backbottom").setAttribute("href", backlink);
nextlink = "/astp.html?astp=" + (parseInt(astpnum) + 1)
document.getElementById("nexttop").setAttribute("href", nextlink);
document.getElementById("nextbottom").setAttribute("href", nextlink);

function togglelarivaar() {

    //if at larivaar, going to assisted larivaar
    if (getCookie("shabad") == "lv") {

        $(".shabad").addClass("condensed");
        $(".shabad").addClass("assisted");

        //$(".shabad").removeClass("hidden");
        document.getElementById("shabad").innerHTML = "Pad Shed";
        document.cookie = "shabad=lva; expires=Thu, 18 Dec 2023 12:00:00 UTC";

        $(".shabad").lettering('words');

        //if at assisted larivaar, going to pad shed
    } else if (getCookie("shabad") == "lva") {
        $(".shabad").removeClass("condensed");
        $(".shabad").removeClass("assisted");
        //$(".larivaar").addClass("hidden");
        //$(".shabad").removeClass("hidden");
        document.getElementById("shabad").innerHTML = "Larivaar";
        document.cookie = "shabad=ps; expires=Thu, 18 Dec 2023 12:00:00 UTC";

        //if at pad shed, going to larivaar

    } else if (getCookie("shabad") == "ps") {
        $(".shabad").addClass("condensed");
        //$(".larivaar").removeClass("hidden");
        document.getElementById("shabad").innerHTML = "Larivaar Assisted";
        document.cookie = "shabad=lv; expires=Thu, 18 Dec 2023 12:00:00 UTC";

    }

}

function toggleenglish() {

    if (getCookie("english") == "yes") {
        document.cookie = "english=no; expires=Thu, 18 Dec 2023 12:00:00 UTC";
        $(".english").addClass("hidden");

    } else if (getCookie("english") == "no") {
        document.cookie = "english=yes; expires=Thu, 18 Dec 2023 12:00:00 UTC";
        $(".english").removeClass("hidden");
    }

}

function togglepunjabi() {

    if (getCookie("punjabi") == "yes") {
        document.cookie = "punjabi=no; expires=Thu, 18 Dec 2023 12:00:00 UTC";
        $(".punjabi").addClass("hidden");

    } else if (getCookie("punjabi") == "no") {
        document.cookie = "punjabi=yes; expires=Thu, 18 Dec 2023 12:00:00 UTC";
        $(".punjabi").removeClass("hidden");
    }
}


if (getCookie("shabad") == "lva") {
    document.getElementById("shabad").innerHTML = "Pad Shed";

} else if (getCookie("shabad") == "ps") {
    document.getElementById("shabad").innerHTML = "Larivaar";

} else if (getCookie("shabad") == "lv") {
    document.getElementById("shabad").innerHTML = "Larivaar Assisted";
}

if (astpnum == "null") {

} else {
    setcookie("last", astpnum)
}


var divastpnum = document.getElementById("astpnum");
var pdivastpnum = document.createElement('p');
pdivastpnum.appendChild(document.createTextNode("ਅਸਟਪਦੀ # " + astpnum));
divastpnum.appendChild(pdivastpnum);