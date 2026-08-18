const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const projectsDir = path.join(root, "projects");

const navHtml = `<header class="era-main-nav" dir="rtl" aria-label="التنقل الرئيسي">
	<div class="era-main-nav__inner">
		<div class="era-main-nav__logo">
			<a href="../../index.html">
				<img src="../../wp-content/uploads/2023/10/logom.png" alt="مصنع العصر الصناعي" width="614" height="100" decoding="async">
			</a>
		</div>
		<nav class="era-main-nav__menu" aria-label="Menu">
			<ul>
				<li><a href="../../index.html">الرئيسية</a></li>
				<li><a href="../../about-us-2/index.html">من نحن</a></li>
				<li class="is-active"><a href="../../projetcs/index.html" aria-current="page">المشاريع</a></li>
				<li><a href="../../contact-us/index.html">اتصل بنا</a></li>
			</ul>
		</nav>
		<button type="button" class="era-main-nav__toggle" aria-label="فتح القائمة" aria-expanded="false"><span></span></button>
	</div>
	<nav class="era-main-nav__mobile" aria-hidden="true">
		<ul>
			<li><a href="../../index.html">الرئيسية</a></li>
			<li><a href="../../about-us-2/index.html">من نحن</a></li>
			<li class="is-active"><a href="../../projetcs/index.html" aria-current="page">المشاريع</a></li>
			<li><a href="../../contact-us/index.html">اتصل بنا</a></li>
		</ul>
	</nav>
</header>
<script>
(function () {
	var nav = document.querySelector(".era-main-nav");
	if (!nav) return;
	var btn = nav.querySelector(".era-main-nav__toggle");
	var mobile = nav.querySelector(".era-main-nav__mobile");
	if (!btn || !mobile) return;
	function setOpen(open) {
		nav.classList.toggle("is-open", open);
		btn.setAttribute("aria-expanded", open ? "true" : "false");
		mobile.setAttribute("aria-hidden", open ? "false" : "true");
		document.body.classList.toggle("era-nav-menu-open", open);
	}
	btn.addEventListener("click", function () {
		setOpen(!nav.classList.contains("is-open"));
	});
	mobile.querySelectorAll("a").forEach(function (link) {
		link.addEventListener("click", function () { setOpen(false); });
	});
})();
</script>`;

const eraNavRe = /<nav class="era-project-nav"[\s\S]*?<\/nav>\s*/;
const eraMainRe = /<header class="era-main-nav"[\s\S]*?<\/script>\s*/;

let updated = 0;
for (const name of fs.readdirSync(projectsDir)) {
	const file = path.join(projectsDir, name, "index.html");
	if (!fs.existsSync(file)) continue;
	let html = fs.readFileSync(file, "utf8");
	const original = html;

	html = html.replace(eraNavRe, "");
	html = html.replace(eraMainRe, "");

	const skipRe = /(<a class="skip-link screen-reader-text"[\s\S]*?<\/a>\s*)/;
	if (skipRe.test(html)) {
		html = html.replace(skipRe, "$1\n" + navHtml + "\n");
	} else {
		html = html.replace(/(<body[^>]*>\s*)/, "$1\n" + navHtml + "\n");
	}

	if (!html.includes("era-project-nav.css")) {
		html = html.replace(
			/<\/head>/,
			'<link rel="stylesheet" href="../../wp-content/uploads/2026/08/era-project-nav.css">\n</head>'
		);
	}

	if (html !== original) {
		fs.writeFileSync(file, html, "utf8");
		updated++;
		console.log("updated:", name);
	}
}

console.log("done:", updated, "files");
