const sidenav = document.getElementById("sidenav-1");
const sidenavInstance = mdb.Sidenav.getInstance(sidenav);

let innerWidth = null;

const setMode = (e) => {
	if (window.innerWidth === innerWidth) {
		return;
	}

	innerWidth = window.innerWidth;

	if (window.innerWidth < 992) {
		sidenavInstance.changeMode("over");
		sidenavInstance.hide();
	} else {
		sidenavInstance.changeMode("side");
		sidenavInstance.show();
	}
};

setMode();

window.addEventListener("resize", setMode);
