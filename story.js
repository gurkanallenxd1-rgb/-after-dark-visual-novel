"use strict";

const characters = {
  reina: { name: "Reina", age: 26 },
  akira: { name: "Akira", age: 24 },
  yuna: { name: "Yuna", age: 23 },
};

const story = {
  start: {
    text: "Yağmur, son vapurun camlarını buğulandırırken sen rıhtımın üstündeki terasa çıkıyorsun. Cebinde dün gece kapının altından atılmış bir zarf var. Üzerinde tek cümle: Mavi defteri geri istiyorsan gece yarısı gel.",
    next: "arrival",
  },
  arrival: {
    who: "reina",
    text: "Ben Reina. Defterini buldum. Açmadım. Ama içinden bir fotoğraf düştü. O gece rıhtımda üçünüzü de görmüştüm.",
    next: "photo",
  },
  photo: {
    text: "Fotoğrafta eski bir iskele ve yanında üç gölge var. Akira camın önünde bir kaset çeviriyor. Yuna, yağmurdan ıslanmış kenarı kurusun diye fotoğrafı lambanın altına koyuyor. Kimin yanına gidersin?",
    choices: [
      { label: "Reina’ya fotoğrafı neden sakladığını sor.", to: "reinaTalk", point: "reina" },
      { label: "Akira’nın elindeki kasete kulak ver.", to: "akiraTalk", point: "akira" },
      { label: "Yuna’ya fotoğrafı birlikte incelemeyi öner.", to: "yunaTalk", point: "yuna" },
    ],
  },
  reinaTalk: {
    who: "reina",
    text: "İskele yıkılmadan önce annem her cuma orada şarkı söylerdi. Fotoğrafı görünce o sesi hatırladım. Sana bir gün dinletmek isterim.",
    next: "reinaInvite",
  },
  reinaInvite: {
    who: "reina",
    text: "Vapura biraz daha var. Benimle dans etmek ister misin? İstersen burada oturup konuşabiliriz.",
    choices: [
      { label: "Evet, dans etmek isterim.", to: "reinaYes", point: "reina" },
      { label: "Bu gece konuşmak bana daha iyi gelir.", to: "reinaNo" },
    ],
  },
  reinaYes: {
    who: "reina", expression: "smile",
    text: "Elini tutabilir miyim? Başını salladığında Reina avucunu açıyor. İkiniz de ilk adımı kaçırıp gülüyorsunuz.",
    next: "last",
  },
  reinaNo: {
    who: "reina",
    text: "Elbette. Buradaki en iyi koltuk zaten bizimki. Annemin bir şarkısının sözlerini hatırlamaya çalışıyorum. Dinler misin?",
    next: "last",
  },
  akiraTalk: {
    who: "akira",
    text: "Eski iskelenin son anonsunu kaydettim. Dinle bak. Anonsun sonunda biri gülüyor. Bendim. O gün vedaları beceremiyordum.",
    next: "akiraInvite",
  },
  akiraInvite: {
    who: "akira",
    text: "Sana yarın bir kahve ısmarlamak isterim. İkimiz baş başa. Bu fikir sana da iyi gelirse.",
    choices: [
      { label: "Olur. Yarın aynı saatte?", to: "akiraYes", point: "akira" },
      { label: "Bu akşamı burada bırakalım.", to: "akiraNo" },
    ],
  },
  akiraYes: {
    who: "akira", expression: "smile",
    text: "Anlaştık. Kahveyi ben seçeceğim, müziği sen. Şimdilik şu kaset sende kalsın.",
    next: "last",
  },
  akiraNo: {
    who: "akira",
    text: "Peki. Kasetin bir kopyasını istersen Reina’ya bırakırım. Şu gülüşü bir daha duymak hoşuma gitti.",
    next: "last",
  },
  yunaTalk: {
    who: "yuna",
    text: "Fotoğraftaki benim, sağdaki. Rüzgâra karşı gözlerimi kısınca hep öfkeli çıkıyorum. Yıllardır o günün geriye kalan tek fotoğrafını arıyorum.",
    next: "yunaInvite",
  },
  yunaInvite: {
    who: "yuna",
    text: "Ben üst kattaki atölyeyi kapatacağım. Dönüşte kıyıya birlikte yürümek ister misin? Yakınında olmak hoşuma gidiyor.",
    choices: [
      { label: "Ben de isterim. Seni burada bekleyeyim.", to: "yunaYes", point: "yuna" },
      { label: "Bu gece vapura tek başıma binmek isterim.", to: "yunaNo" },
    ],
  },
  yunaYes: {
    who: "yuna", expression: "smile",
    text: "Yuna atölyenin kapısında duruyor. Duvarımda çıplak bir otoportrem var. Görmek ister misin? İstersen kıyıya doğrudan inebiliriz.",
    choices: [
      { label: "Evet, çizimi görmek isterim.", to: "yunaStudy" },
      { label: "Doğrudan kıyıya inelim.", to: "last" },
    ],
  },
  yunaStudy: {
    who: "yuna", optionalArt: "assets/optional/yuna-study.webp",
    text: "Yuna çizimin yanında durup ışığı açıyor. Pencerenin önüne bıraktığı iki fincandan hâlâ buhar yükseliyor.",
    next: "last",
  },
  yunaNo: {
    who: "yuna",
    text: "Anladım. Fotoğrafı yarın alabilir miyim? Kenarlarını onarıp aynı yere bırakırım.",
    next: "last",
  },
  last: {
    text: "İskelede son vapurun düdüğü duyuluyor. Defterine bu gece için bir satır yazıp zarfı sayfanın arasına koyuyorsun.",
    next: "end",
  },
  end: {
    text: "Vapur karanlık suda ilerlerken terasın ışığı ardında küçülüyor.",
    friendlyEndings: {
      reina: "Reina’nın hatırladığı şarkının adını defterinin kapağına yazıyorsun.",
      akira: "Kasetin kopyasını almak için yarın terasa uğramayı düşünüyorsun.",
      yuna: "Fotoğrafı yarın Yuna’ya götürmek üzere defterin arasına koyuyorsun.",
    },
    endings: {
      reina: "Reina’nın mırıldandığı şarkıyı, motorun uğultusu kesilene dek aklında tutuyorsun.",
      akira: "Kulağında kasetin sonundaki gülüş var. İskele, sesini kaybetmemiş.",
      yuna: "Fotoğrafın arkasına Yuna’nın adını yazıyorsun. Mürekkep bu kez dağılmıyor.",
    },
  },
};
