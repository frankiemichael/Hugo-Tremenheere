

function openNav() {
  document.getElementById("mySidebar").style.width = "35%";
  document.getElementById('bodyId').classList.add("opaquehidden");
  document.getElementById('opaque').style.pointerEvents= "none";
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
document.getElementById('bodyId').classList.remove("opaquehidden");
  document.getElementById('opaque').style.pointerEvents= "all";
  document.getElementById('bodyId').onclick = closeNav();
}
function homeImg() {
  document.getElementById("headingName").classList.remove("displaynone")
}
function homeImgOut() {
  document.getElementById("headingName").classList.add("displaynone")

}
$("div.headingName")
    .css("margin-left",-$(this).width())
    .animate({
        marginLeft:0
    }, 700);
