

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
