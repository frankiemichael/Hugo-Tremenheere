
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

function openNav() {
  document.getElementById('opaque').style.backgroundColor = "black";
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById('opaque').style.classList.add("opaquehidden");
  document.getElementById('headerDiv').style.width = "auto";
  document.getElementById('opaque').style.pointerEvents= "none";

}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById('opaque').style.opacity = "1";
  document.getElementById('opaque').style.backgroundColor = "white";
  document.getElementById('headerDiv').style.width = "auto";
  document.getElementById('opaque').style.pointerEvents= "all";
  document.getElementById('bodyId').onclick = closeNav();

}
