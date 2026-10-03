/* =====================================================
   ZAL BACKGROUND MUSIC PLAYER
   - همیشه در پس‌زمینه (در همه صفحات) پخش می‌شود
   - با تعویض صفحه، از همان لحظه ادامه پیدا می‌کند
   - وقتی صفحه/برنامه پنهان یا بسته شود، صدا قطع می‌شود
   - وقتی یک آهنگ تمام شد، آهنگ بعدی پخش می‌شود
   - در تنظیمات قابل خاموش/روشن کردن است (ذخیره در localStorage)
===================================================== */
(function () {
    "use strict";

    // ---------- پلی‌لیست (دقیقاً همین نام‌ها داخل پوشه Sounds) ----------
    var TRACKS = [
        "Idea 22 - Gibran Alcocer.mp3",
        "cornfield-chase.mp3",
        "3 am walk - daniel.mp3"
    ];

    var SETTINGS_KEY = "musicSettings";
    var STATE_KEY = "musicState";

    // ---------- پیدا کردن مسیر پوشه Sounds بر اساس مسیر همین اسکریپت ----------
    // این کار باعث میشه فرقی نکنه این فایل از داخل "Web files" صدا زده بشه
    // یا از ریشه (-- Lobby.html)؛ مسیر همیشه درست پیدا می‌شود.
    var scriptEl = document.currentScript;
    var scriptSrc = scriptEl ? scriptEl.src : "";
    var baseDir = scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
    var soundsDir = baseDir + "Sounds/";

    function trackUrl(name) {
        return soundsDir + encodeURIComponent(name);
    }

    // ---------- تنظیمات (روشن/خاموش) ----------
    function loadSettings() {
        var s = null;
        try {
            s = JSON.parse(localStorage.getItem(SETTINGS_KEY));
        } catch (e) {}
        if (!s || typeof s.enabled !== "boolean") {
            s = { enabled: true };
            saveSettings(s);
        }
        return s;
    }

    function saveSettings(s) {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
        } catch (e) {}
    }

    // ---------- وضعیت پخش (کدام آهنگ، از چه ثانیه‌ای) ----------
    function loadState() {
        var st = null;
        try {
            st = JSON.parse(localStorage.getItem(STATE_KEY));
        } catch (e) {}
        if (!st || typeof st.trackIndex !== "number") {
            st = { trackIndex: 0, time: 0 };
        }
        if (st.trackIndex < 0 || st.trackIndex >= TRACKS.length) {
            st.trackIndex = 0;
        }
        if (typeof st.time !== "number" || st.time < 0) {
            st.time = 0;
        }
        return st;
    }

    function saveState(st) {
        try {
            localStorage.setItem(STATE_KEY, JSON.stringify(st));
        } catch (e) {}
    }

    var settings = loadSettings();
    var state = loadState();

    // ---------- ساخت المان صوتی ----------
    var audio = document.createElement("audio");
    audio.id = "__zalBgMusic";
    audio.preload = "auto";
    audio.style.display = "none";
    audio.src = trackUrl(TRACKS[state.trackIndex]);

    var seeked = false;
    audio.addEventListener("loadedmetadata", function () {
        if (!seeked) {
            seeked = true;
            try {
                audio.currentTime = state.time || 0;
            } catch (e) {}
            if (settings.enabled) {
                attemptPlay();
            }
        }
    });

    function attemptPlay() {
        var p = audio.play();
        if (p && typeof p.catch === "function") {
            p.catch(function () {
                // اگر مرورگر/وب‌ویو پخش خودکار را مسدود کرد،
                // با اولین لمس/کلیک کاربر پخش شروع می‌شود
                var resume = function () {
                    if (settings.enabled) {
                        audio.play().catch(function () {});
                    }
                    document.removeEventListener("click", resume);
                    document.removeEventListener("touchstart", resume);
                };
                document.addEventListener("click", resume, { once: true });
                document.addEventListener("touchstart", resume, { once: true });
            });
        }
    }

    // ---------- رفتن به آهنگ بعدی وقتی یکی تمام شد ----------
    audio.addEventListener("ended", function () {
        state.trackIndex = (state.trackIndex + 1) % TRACKS.length;
        state.time = 0;
        seeked = true; // دیگر نیازی به seek نیست، از صفر شروع می‌شود
        saveState(state);
        audio.src = trackUrl(TRACKS[state.trackIndex]);
        if (settings.enabled) {
            audio.play().catch(function () {});
        }
    });

    // ---------- ذخیره‌ی دوره‌ای موقعیت پخش (برای ادامه در صفحه بعد) ----------
    var lastSaved = 0;
    audio.addEventListener("timeupdate", function () {
        var now = Date.now();
        if (now - lastSaved > 1000) {
            lastSaved = now;
            state.time = audio.currentTime;
            saveState(state);
        }
    });

    function persistNow() {
        state.time = audio.currentTime;
        saveState(state);
    }

    // موقع رفتن به صفحه بعد یا بستن کامل، آخرین موقعیت ذخیره شود
    window.addEventListener("pagehide", persistNow);
    window.addEventListener("beforeunload", persistNow);

    // ---------- وقتی برنامه/تب پنهان شد (خاموش کردن صفحه، رفتن به برنامه دیگر) ----------
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            persistNow();
            audio.pause();
        } else if (settings.enabled) {
            attemptPlay();
        }
    });

    // ---------- هماهنگی با چک‌باکس تنظیمات (در صفحه لابی) ----------
    function wireCheckbox() {
        var chk = document.getElementById("musicEnableCheckbox");
        if (!chk) return;
        chk.checked = settings.enabled;
        chk.addEventListener("change", function () {
            settings.enabled = chk.checked;
            saveSettings(settings);
            if (settings.enabled) {
                attemptPlay();
            } else {
                persistNow();
                audio.pause();
            }
        });
    }

    function init() {
        document.body.appendChild(audio);
        wireCheckbox();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
