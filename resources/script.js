const whatsq = ((new URLSearchParams(window.location.search)).get('astp'));

window.addEventListener("load", function () {
    for (i = 1; i < 25; i++) {
        var astpsdiv = document.getElementById("myleftnav");
        theurl = "/astp.html?astp=" + i

        var link = document.createElement('a');
        if (whatsq == i) {
            link.className = "active"
        }
        link.setAttribute("href", theurl);
        link.appendChild(document.createTextNode(i));
        astpsdiv.appendChild(link);
    }
})

function leftopenNav() {
    document.getElementById("myleftnav").style.width = "250px";
}

function leftcloseNav() {
    document.getElementById("myleftnav").style.width = "0";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function setcookie(cookieName, cookieValue) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000 * 24 * 14);
    document.cookie = cookieName + "=" + encodeURI(cookieValue) + ";expires=" + expire.toGMTString();
}



if (getCookie("shabad") == "") {
    document.cookie = "shabad=ps; expires=Thu, 18 Dec 2023 12:00:00 UTC";

}

if (getCookie("english") == "") {
    document.cookie = "english=no; expires=Thu, 18 Dec 2023 12:00:00 UTC";

}
if (getCookie("punjabi") == "") {
    document.cookie = "punjabi=no; expires=Thu, 18 Dec 2023 12:00:00 UTC";

}


if (location.pathname == "/index.html" || location.pathname == "/") {

    if (getCookie("last") == "" || getCookie("last") > "24") {
        console.log("no past")
    } else if (getCookie("last")) {
        var div = document.getElementById("leftoff");
        var a = document.createElement('a');
        a.appendChild(document.createTextNode("Continue from where you left off: ਅਸਟਪਦੀ " + getCookie("last")));
        a.setAttribute("href", "/astp.html?astp=" + getCookie("last"))
        div.appendChild(a);
    }
}

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}



const currentPaathi = window.localStorage.getItem('paathi');

audiolink = "https://sukhmanisahib.sikhresources.site/resources/audio/" + currentPaathi + "/" + astpnum + ".mp3"

document.getElementById("audioplayer").setAttribute('src', audiolink);

var audio = document.getElementById('audioplayer');
audio.load();

var audio = document.getElementById('audioplayer');
audio.onended = function () {
    window.location.href = nextlink;
};