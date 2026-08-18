(function () {
	function boot() {
	if (document.getElementById("eraQuoteFab")) return;

	var css = document.createElement("link");
	css.rel = "stylesheet";
	css.href = "/wp-content/uploads/2026/08/era-quote.css";
	document.head.appendChild(css);

	var wrap = document.createElement("div");
	wrap.innerHTML =
		'<button type="button" class="era-quote-fab" id="eraQuoteFab">طلب عرض سعر</button>' +
		'<div class="era-quote-overlay" id="eraQuoteOverlay" role="dialog" aria-modal="true" aria-labelledby="eraQuoteTitle" hidden>' +
			'<div class="era-quote-modal">' +
				'<button type="button" class="era-quote-close" id="eraQuoteClose" aria-label="إغلاق">&times;</button>' +
				'<h2 id="eraQuoteTitle">عزيزي العميل للحصول على العرض ما عليك إلا استكمال البيانات أدناه</h2>' +
				'<form id="eraQuoteForm">' +
					'<div class="era-quote-grid">' +
						'<div class="era-quote-field"><label for="eraFirst">الاسم الاول<span class="req">*</span></label><input id="eraFirst" name="first" required placeholder="اسمك"></div>' +
						'<div class="era-quote-field"><label for="eraEmail">البريد الالكتروني<span class="req">*</span></label><input id="eraEmail" name="email" type="email" required placeholder="e.g., email@example.com"></div>' +
						'<div class="era-quote-field"><label for="eraLast">الاسم الاخير<span class="req">*</span></label><input id="eraLast" name="last" required placeholder="اللقب"></div>' +
						'<div class="era-quote-field"><label for="eraPhone">رقم الهاتف<span class="req">*</span></label><input id="eraPhone" name="phone" required placeholder="+966"></div>' +
						'<div class="era-quote-field"><label for="eraTime">الوقت المناسب للاتصال</label><input id="eraTime" name="time"></div>' +
						'<div class="era-quote-field"><label for="eraMsg">الرسالة</label><textarea id="eraMsg" name="message" placeholder="اكتب هنا استفسارك"></textarea></div>' +
					"</div>" +
					'<button type="submit" class="era-quote-submit">ارسل</button>' +
				"</form>" +
			"</div>" +
		"</div>";
	document.body.appendChild(wrap);

	var fab = document.getElementById("eraQuoteFab");
	var overlay = document.getElementById("eraQuoteOverlay");
	var closeBtn = document.getElementById("eraQuoteClose");
	var form = document.getElementById("eraQuoteForm");

	function openModal() {
		overlay.hidden = false;
		overlay.classList.add("is-open");
		document.body.classList.add("era-quote-open");
		var first = document.getElementById("eraFirst");
		if (first) first.focus();
	}

	function closeModal() {
		overlay.classList.remove("is-open");
		overlay.hidden = true;
		document.body.classList.remove("era-quote-open");
	}

	fab.addEventListener("click", openModal);
	closeBtn.addEventListener("click", closeModal);
	overlay.addEventListener("click", function (e) {
		if (e.target === overlay) closeModal();
	});
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
	});

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		var first = document.getElementById("eraFirst").value.trim();
		var last = document.getElementById("eraLast").value.trim();
		var email = document.getElementById("eraEmail").value.trim();
		var phone = document.getElementById("eraPhone").value.trim();
		var time = document.getElementById("eraTime").value.trim();
		var message = document.getElementById("eraMsg").value.trim();
		var lines = [
			"مرحبا مصنع العصر الصناعي",
			"أرغب في طلب عرض سعر",
			"",
			"الاسم: " + first + " " + last,
			"البريد: " + email,
			"الهاتف: " + phone
		];
		if (time) lines.push("الوقت المناسب للاتصال: " + time);
		if (message) lines.push("الرسالة: " + message);
		var url = "https://api.whatsapp.com/send?phone=966571000074&text=" + encodeURIComponent(lines.join("\n"));
		window.open(url, "_blank", "noopener");
		closeModal();
		form.reset();
	});
	}
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
	else boot();
})();
