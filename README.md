# AFTER DARK · V0.1

İstanbul’da gece yarısı. Kaybolan bir defter, eski iskelenin son fotoğrafı ve son vapura kadar süren üç olası karşılaşma. **Bölüm 01 · Son Vapur**, Türkçe bir 2D anime görsel roman prototipi.

## Oyna

Depo kökünde `python3 -m http.server 8000` çalıştır ve `http://localhost:8000` adresini aç. GitHub Pages için **Settings → Pages → Deploy from a branch** altında yayımlanacak dalın `/(root)` dizinini seç. Oyun HTML5, CSS ve JavaScript ile çalışır. Derleme ve harici çalışma zamanı bağımlılığı yoktur.

Ana menüden **Yeni Oyun** ile başla. Diyaloğu **İlerle** düğmesiyle oku ve seçimleri dokunarak veya klavyeyle yanıtla. Reina (26), Akira (24) ve Yuna (23) rotalarında ilişki puanları ve bölüm sonu metinleri değişir. İlerleme ve ayarlar tarayıcının `localStorage` alanına otomatik yazılır. Aynı tarayıcıda **Devam Et** ile son sahneye dön. Kayıt alanı erişilemezse oyun açık oturumda devam eder.

## Görseller

`assets/` gece terası (`bar.webp`) ile üç ana portreyi (`reina.webp`, `akira.webp`, `yuna.webp`) içerir. `story.js` içindeki sahnelerde `expression` özel portreyi, `clothing` ise aynı boyutta şeffaf bir kıyafet görselini seçer. Örneğin `expression: "smile"` ve `clothing: "coat"` alanları Yuna için `yuna-smile.webp` ve `yuna-coat.webp` dosyalarına karşılık gelir. İfade eksikse ana portre, ana portre eksikse karakterin baş harfi gösterilir. Arka plan dosyası eksikse CSS gradyanı görünür.

| Durum | Dosyalar |
| --- | --- |
| Henüz eklenmeyen ifadeler | `assets/reina-smile.webp`, `assets/akira-smile.webp`, `assets/yuna-smile.webp` |
| Henüz eklenmeyen sahne çizimi | `assets/optional/yuna-study.webp` |
| Kıyafet katmanları | Altyapı hazır; V0.1 sahneleri ek kıyafet dosyası gerektirmez. |

İsteğe bağlı 18+ sanatsal çıplaklık görselleri varsayılan olarak kapalıdır. Yuna’nın sahnesinde görsel ancak oyuncu menüden ayarı açarsa ve hikâyede çizimi görmeyi seçerse yüklenir. Çizim eksikse giyinik portre ve diyalogla oyun devam eder.

## Kontrol

`node --check story.js` ve `node --check game.js` ile JavaScript sözdizimini kontrol et. Tarayıcıda üç rotayı, her iki romantik yanıtı, yenileme sonrası devam etmeyi ve eksik bir portrede yer tutucunun görünmesini doğrula.
