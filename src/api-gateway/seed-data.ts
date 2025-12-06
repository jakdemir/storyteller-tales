// Anadolu Mitolojileri - Anatolian Mythologies Collection
// Turkish, Mesopotamian (Sumerian, Akkadian, Assyrian, Persian) myths

export interface MythData {
    id: string;
    name: string;
    cultural_origin: string;
    official_text: string;
    language: string;
    summary: string;
    tags: string;
}

export const CURATED_MYTHS: MythData[] = [
    {
        id: 'myth-tr-001',
        name: 'Oğuz Kağan',
        cultural_origin: 'Türk/Oğuz',
        official_text: `Eski zamanların derinliklerinde, göklerin ve yerin henüz genç olduğu çağlarda, Oğuz Kağan doğdu. Doğduğu gün gök gürültüsü yankılandı ve yıldırımlar düştü. Çocukken bile sıradan değildi - kırk gün sonra konuşmaya başladı ve "Tengri benim babam, Umay anam, Yer-Su benim yurdumdur" dedi.

Genç bir adam olduğunda, Oğuz Kağan altı oğul sahibi oldu. Üç oğlu gökten inen ışık huzmesinden, üç oğlu da gölden çıkan güzel bir kızdan doğdu. Bu altı oğuldan yirmi dört torun geldi ve bunlar Oğuz boylarının ataları oldular.

Oğuz Kağan, dört bir yana seferler düzenledi. Doğuya, batıya, kuzeye ve güneye gitti. Gittiği her yerde adaleti ve düzeni sağladı. Onun zamanında Türk halkı güçlendi ve yayıldı. Bugün hala, Oğuz Kağan'ın mirası Türk halklarının kalbinde yaşar.`,
        language: 'tr',
        summary: 'Türk halkının efsanevi atası ve kahraman',
        tags: '["türk", "kahraman", "oğuz", "destan"]',
    },
    {
        id: 'myth-tr-002',
        name: 'Ergenekon',
        cultural_origin: 'Türk/Oğuz',
        official_text: `Çok eski zamanlarda, Türk halkı büyük bir savaşta yenildi. Düşmanları onları kovaladı ve kaçanlar Ergenekon adlı dar bir vadiye sığındılar. Vadinin girişi o kadar dardı ki, ancak bir at geçebiliyordu. Yıllar geçti, nesiller değişti ama Türkler bu vadide kaldılar.

Zamanla nüfusları arttı ve vadi dar gelmeye başladı. Yaşlılar toplandı ve bir çözüm aradılar. Vadinin etrafındaki dağlarda zengin demir yatakları keşfettiler. Akıllı bir demirci öne çıktı: "Dağı eritelim!" dedi.

Bütün halk çalıştı. Odun topladılar, devasa ocaklar yaptılar. Demir dağı ısıttılar, ısıttılar, ısıttılar. Sonunda demir erimeye başladı ve dağda bir geçit açıldı. Türkler Ergenekon'dan çıktılar ve yeniden güçlü bir millet oldular. Bu çıkış, Türk milletinin yeniden doğuşunu simgeler.`,
        language: 'tr',
        summary: 'Demir dağı eritip özgürlüğe kavuşma destanı',
        tags: '["türk", "özgürlük", "demir", "yeniden doğuş"]',
    },
    {
        id: 'myth-tr-003',
        name: 'Bozkurt',
        cultural_origin: 'Türk/Oğuz',
        official_text: `Kıyım gecesinde, düşmanlar Türk kabilesini yok etti. Sadece küçük bir çocuk hayatta kaldı. Yaralı ve aç, bozkırda can çekişiyordu. O sırada gök renginde gözleri olan bir dişi bozkurt belirdi.

Kurt, çocuğu öldürmedi. Aksine onu emzirdi, korudu, besledi. Çocuk kurdun yanında büyüdü, güçlendi. Zamanla kurt hamile kaldı ve on yavru doğurdu - yarı insan, yarı kurt. Bu yavrulardan biri Ashina adını aldı.

Ashina ve kardeşleri büyüdükçe, yeni bir kabile kurdular. Bozkurt onların anası, koruyucusu ve sembolü oldu. Ashina soyundan gelenler büyük imparatorluklar kurdular. Bugün hala, bozkurt Türk milletinin onur ve sadakat sembolüdür. Kurt, sadece bir hayvan değil, Türklerin ruhudur.`,
        language: 'tr',
        summary: 'Türklerin kurt anası efsanesi',
        tags: '["türk", "kurt", "ashina", "köken"]',
    },
    {
        id: 'myth-tr-004',
        name: 'Tengri',
        cultural_origin: 'Türk/Tengrizm',
        official_text: `Hiçbir şey yokken, sadece sonsuz boşluk varken, Tengri vardı. Gök Tanrı, her şeyin yaratıcısı, evrenin efendisi. O, gökyüzünün kendisidir - sonsuz, güçlü ve adil.

Tengri, göğü ve yeri yarattı. Güneşi, ayı ve yıldızları yerleştirdi. Dağları yükseltti, nehirleri akıttı. Hayvanları ve bitkileri yarattı. Son olarak da insanı yarattı ve ona akıl verdi.

Tengri, her şeyi görür, her şeyi bilir. İyi insanları korur, kötüleri cezalandırır. Hükümdarlar Tengri'nin izniyle hükmeder. Savaşlar Tengri'nin iradesiyle kazanılır. Türk halkı, Tengri'ye dua eder: "Tengri bizi korusun, Tengri yardım etsin." Gök Tanrı, sonsuza kadar Türklerin üzerinde durmaktadır.`,
        language: 'tr',
        summary: 'Gök Tanrı, evrenin yaratıcısı',
        tags: '["türk", "tengri", "gök tanrı", "yaratılış"]',
    },
    {
        id: 'myth-tr-005',
        name: 'Kayra Han',
        cultural_origin: 'Türk/Tengrizm',
        official_text: `Yaratılışın başında, en yüksek göklerde Kayra Han oturuyordu. Beyaz bir kaz şeklinde, sonsuz bilgelikle dolu, adil ve güçlü. Kayra Han, havayı, suyu ve toprağı yarattı.

Kayra Han, dünyayı düzenlemek için yardımcılar yarattı. Ülgen'i göklerin koruyucusu yaptı. Erlik'i ise yerin altını yönetmekle görevlendirdi. Ama Erlik gurura kapıldı ve Kayra Han'a karşı geldi. Bunun üzerine Kayra Han, Erlik'i karanlık yeraltı dünyasına sürdü.

Kayra Han, insanlara akıl ve vicdan verdi. Onlara doğruyu yanlıştan ayırt etmeyi öğretti. Bugün hala, Kayra Han'ın bilgeliği ve adaleti, Türk kültürünün temelini oluşturur. O, sessizce göklerde oturur ve dünyayı izler.`,
        language: 'tr',
        summary: 'Yaratılışın bilge tanrısı',
        tags: '["türk", "yaratıcı", "bilgelik", "adalet"]',
    },
    {
        id: 'myth-tr-006',
        name: 'Erlik Han',
        cultural_origin: 'Türk/Tengrizm',
        official_text: `Erlik Han, karanlığın ve yeraltının tanrısıdır. Başlangıçta Kayra Han'ın yardımcısıydı, ama gurur onu yoldan çıkardı. İnsanı yaratırken, Kayra Han'ın emrine karşı geldi ve kendi yolunu seçti.

Cezası ağır oldu. Kayra Han, Erlik'i dokuz kat yeraltına sürdü. Orada karanlık bir taht kurdu Erlik. Dokuz oğlu ve dokuz kızı oldu. Yeraltı dünyasını yönetti - ölülerin, gölgelerin ve karanlığın diyarını.

Erlik Han, ölümü ve hastalığı getirir. Kötü ruhları gönderir. Ama o da evrenin dengesinin bir parçasıdır. Işık olmadan karanlık olmaz, iyi olmadan kötü olmaz. Şamanlar, Erlik'le pazarlık yapar, hastaları kurtarmak için yeraltına inerler. Erlik Han, korkutucu ama gerekli bir güçtür.`,
        language: 'tr',
        summary: 'Yeraltı dünyasının karanlık hükümdarı',
        tags: '["türk", "yeraltı", "karanlık", "ölüm"]',
    },
    {
        id: 'myth-tr-007',
        name: 'Umay Ana',
        cultural_origin: 'Türk/Tengrizm',
        official_text: `Umay Ana, gümüş saçlı, ay yüzlü, beyaz giysili bir tanrıçadır. Bazen kanatlı bir kadın olarak, bazen de altın bir kuş olarak görünür. O, annelerin ve çocukların koruyucusudur.

Bir kadın hamile kaldığında, Umay Ana onun yanına gelir. Bebeği korur, anneyi güçlendirir. Doğum sırasında orada olur, acıyı hafifletir. Bebek doğduğunda, Umay Ana ona ruh verir ve onu kötü ruhlardan korur.

Çocuklar büyürken, Umay Ana onları izler. Hastalandıklarında iyileştirir, tehlikedeyken korur. Anneler, Umay Ana'ya dua ederler: "Umay Ana, çocuğumu koru. Umay Ana, ona sağlık ver." Türk kültüründe, Umay Ana'nın sevgisi ve koruması, her zaman var olmuştur.`,
        language: 'tr',
        summary: 'Bereket ve çocukların koruyucu tanrıçası',
        tags: '["türk", "bereket", "anne", "koruyucu"]',
    },
    {
        id: 'myth-tr-008',
        name: 'Şahmeran',
        cultural_origin: 'Türk/Anadolu',
        official_text: `Anadolu'nun derinliklerinde, yeraltında gizli bir krallık vardır. Burada Şahmeran hükmeder - yarı kadın, yarı yılan. Üst bedeni güzel bir kadın, alt bedeni muhteşem bir yılan. Binlerce yıldır yaşar ve sonsuz bilgeliğe sahiptir.

Bir gün, Camsap adında genç bir adam, tesadüfen Şahmeran'ın krallığına düştü. Şahmeran ona bilgelik öğretti, sırları anlattı. Yıllar geçti ve Camsap geri dönmek istedi. Şahmeran ona izin verdi ama bir uyarıda bulundu: "Sırrımı kimseye söyleme."

Ama kader başkaydı. Sultan hastalandı ve Şahmeran'ın etinden yemesi gerekiyordu. Camsap, sevdiği Şahmeran'ı kurtaramadı. Şahmeran öldü ama bilgeliği yaşadı. Camsap, Şahmeran'ın kuyruğunu yedi ve ölümsüz oldu. Şahmeran'ın mirası, bugün hala Anadolu'da yaşar.`,
        language: 'tr',
        summary: 'Bilgelik ve şifanın yarı kadın yarı yılan kraliçesi',
        tags: '["türk", "anadolu", "bilgelik", "şifa"]',
    },
    {
        id: 'myth-tr-009',
        name: 'Dede Korkut',
        cultural_origin: 'Türk/Oğuz',
        official_text: `Dede Korkut, Oğuz Türklerinin en bilge ozanıydı. Kopuz çalar, hikayeler anlatır, sorunları çözerdi. Onun hikayeleri, kahramanlık, onur ve Türk kültürünün özünü anlatır.

Bir hikayede, Dirse Han'ın oğlu Boğaç Han'ın maceraları anlatılır. Boğaç, babasının hapsedildiğini öğrenir ve onu kurtarmak için yola çıkar. Büyük tehlikelerle karşılaşır ama cesareti ve gücüyle hepsini yener.

Başka bir hikayede, Kam Büre'nin oğlu Bamsı Beyrek'in aşkı anlatılır. Bamsı, sevdiği Banu Çiçek için bin bir zorlukla mücadele eder. Sonunda kavuşurlar ve mutlu olurlar.

Dede Korkut'un hikayeleri, sadece eğlence değildir. Onlar, Türk değerlerini öğretir: cesaret, sadakat, akıl, ve onur. Bugün hala, Dede Korkut'un sözleri, Türk kültürünün kalbinde yaşar.`,
        language: 'tr',
        summary: 'Oğuz Türklerinin bilge ozanı ve destanları',
        tags: '["türk", "oğuz", "destan", "kahramanlık"]',
    },
    {
        id: 'myth-tr-010',
        name: 'Alkarısı',
        cultural_origin: 'Türk/Anadolu',
        official_text: `Alkarısı, gece karanlığında dolaşan korkunç bir ruhtur. Uzun saçlı, solgun yüzlü, kırmızı gözlü bir kadın şeklindedir. Loğusa kadınları ve yeni doğan bebekleri avlar.

Bir kadın doğum yaptığında, kırk gün boyunca Alkarısı'ndan korunmalıdır. Evin kapısına makas, bıçak veya demir eşyalar asılır. Çünkü Alkarısı demirden korkar. Odada mum yanar, hiç söndürülmez. Çünkü Alkarısı karanlıkta güçlenir.

Eğer Alkarısı bir bebeği kaçırırsa, bebek hastalanır, ağlar, uyumaz. Hoca çağrılır, dualar okunur. Alkarısı kovulur ve bebek iyileşir.

Alkarısı efsanesi, annelerin ve bebeklerin korunması gerektiğini hatırlatır. Kötü ruhlar her zaman etraftadır ama dikkat ve inanç onları uzak tutar.`,
        language: 'tr',
        summary: 'Loğusa kadınları ve bebekleri tehdit eden kötü ruh',
        tags: '["türk", "anadolu", "koruyucu", "gelenek"]',
    },
    {
        id: 'myth-tr-011',
        name: 'Tepegöz',
        cultural_origin: 'Türk/Oğuz',
        official_text: `Tepegöz, Dede Korkut hikayelerinin en korkunç yaratığıydı. Tek gözlü bir dev, alnının ortasında kocaman bir göz. Bir çoban ile bir peri kadının oğluydu. Doğduğunda sıradan görünüyordu ama büyüdükçe canavar oldu.

Tepegöz o kadar güçlüydı ki, hiçbir silah onu yaralayamazdı. Sadece tek gözü savunmasızdı. Oğuz halkını terörize etti, insanları yedi, köyleri yıktı. Herkes ondan korkuyordu.

Sonunda genç kahraman Basat, Tepegöz'ü yenmeye karar verdi. Akıllıca bir plan yaptı. Tepegöz'ün mağarasına girdi ve onunla dost oldu. Tepegöz sarhoş olunca, Basat kızgın bir demir şişle onun gözünü kör etti.

Kör olan Tepegöz, mağaranın çıkışını tuttu. Kimse kaçamasın diye koçlarını saydı. Ama Basat, bir koç postuna sarınarak kaçtı. Tepegöz yenildi ve Oğuz halkı kurtuldu.`,
        language: 'tr',
        summary: 'Tek gözlü dev ve kahraman Basat',
        tags: '["türk", "dede korkut", "kahraman", "dev"]',
    },
    {
        id: 'myth-tr-012',
        name: 'Köroğlu',
        cultural_origin: 'Türk/Anadolu',
        official_text: `Köroğlu, halkın kahramanıydı. Babası, zalim beyin atlarına baktığı için gözlerine mil çekilmişti. Köroğlu, bu haksızlığın intikamını almak için dağa çıktı.

Çamlıbel'de bir kale kurdu. Etrafına cesur yiğitler topladı. Onlara "Deliler" adını verdi. Köroğlu ve Delileri, zalimlere karşı savaştılar, fakirlere yardım ettiler.

Köroğlu'nun Kırat adında efsanevi bir atı vardı. Kırat, rüzgar gibi hızlıydı ve sadece Köroğlu'nu dinlerdi. Sazını çalar, türküler söylerdi Köroğlu. Şiirleri halkın dilindeydi.

Yıllar geçti, Köroğlu yaşlandı. Ama hiçbir zaman yenilmedi. Bir gün, Kırat'a bindi ve kayboldu. Bazıları der ki hala yaşıyor, bazıları der ki göklere çıktı. Ama herkes bilir ki, Köroğlu'nun ruhu halkın kalbinde yaşar.`,
        language: 'tr',
        summary: 'Halk kahramanı ve ozanı',
        tags: '["türk", "halk kahramanı", "ozan", "adalet"]',
    },
    {
        id: 'myth-tr-013',
        name: 'Keloğlan',
        cultural_origin: 'Türk/Anadolu',
        official_text: `Keloğlan, kel kafalı ama çok akıllı bir delikanlıydı. Fakir bir ailenin oğluydu ama zekası sayesinde her zorluğun üstesinden gelirdi.

Bir gün, padişah bir yarışma düzenledi: "Kim kızımı güldürürse, onunla evlenecek." Birçok kişi denedi ama kimse başaramadı. Keloğlan da şansını denemeye karar verdi.

Saraya gitti ve komik hikayeler anlattı, akıllıca şakalar yaptı. Prenses kahkahalarla güldü. Padişah sözünü tuttu ve Keloğlan prensesle evlendi.

Başka bir hikayede, Keloğlan bir devi kandırarak hazinesini aldı. Bir başkasında, üç kız kardeşi kötü adamlardan kurtardı. Her hikayede, Keloğlan'ın zekası ve cesareti kazandı. Bugün hala, Keloğlan hikayeleri çocuklara akıllı olmayı öğretir.`,
        language: 'tr',
        summary: 'Zeki ve cesur kel delikanlı',
        tags: '["türk", "masal", "zeka", "cesaret"]',
    },
    {
        id: 'myth-tr-014',
        name: 'Hızır',
        cultural_origin: 'Türk/İslami',
        official_text: `Hızır, ölümsüz bir rehberdir. Hayat suyunu içmiş ve sonsuza kadar yaşamaktadır. Yeşil giysiler giyer ve ihtiyacı olanlara yardım eder.

Denizde kaybolan gemicilere yol gösterir. Çölde susuzluktan ölen yolculara su verir. Zor durumda kalanlara umut olur. Hızır, her zaman en beklenmedik anda belirir.

Bir efsaneye göre, Hızır ve İlyas kardeştir. İkisi de ölümsüzdür. Hızır karada, İlyas denizde dolaşır. Yılda bir kez, Hıdırellez'de buluşurlar.

İnsanlar, Hızır'ın bereketini isterler. "Hızır gibi yetişti" derler, birisi tam zamanında yardıma geldiğinde. Hızır, sadece bir efsane değil, umudun ve yardımlaşmanın sembolüdür. O, her zaman orada, görünmez ama hissedilir.`,
        language: 'tr',
        summary: 'Ölümsüz rehber ve yardımcı',
        tags: '["türk", "hızır", "yardım", "bereket"]',
    },
    {
        id: 'myth-tr-015',
        name: 'Manas',
        cultural_origin: 'Türk/Kırgız',
        official_text: `Manas, Kırgız halkının en büyük kahramanıydı. Doğduğunda, gökyüzünde yıldızlar parladı. Çocukken bile olağanüstü güçlüydü. Kırk arkadaşıyla birlikte, Kırgız halkını birleştirdi.

Düşmanlar, Kırgızları bölmek istiyordu. Ama Manas, tüm kabileleri bir araya getirdi. Kırk Çerik adlı yiğitler ordusu kurdu. Birlikte, Kırgız topraklarını savundular.

Manas'ın Ak-Kula adında beyaz bir atı vardı. At, rüzgar gibi hızlıydı. Manas'ın karısı Kanıkey, akıllı ve cesur bir kadındı. Oğlu Semetey, babasının yolundan gitti.

Manas Destanı, dünyanın en uzun destanlarından biridir. Yüzyıllardır anlatılır. Manas, sadece bir kahraman değil, Kırgız halkının ruhudur. Onun mirası, birlik ve özgürlüktür.`,
        language: 'tr',
        summary: 'Kırgız halkının efsanevi kahramanı',
        tags: '["türk", "kırgız", "kahraman", "birlik"]',
    },
    {
        id: 'myth-tr-016',
        name: 'Alp Er Tunga',
        cultural_origin: 'Türk/Oğuz',
        official_text: `Alp Er Tunga, eski Türk kahramanlarının en ünlüsüydü. Adı "Alp" yani "kahraman", "Er" yani "yiğit", "Tunga" yani "kaplan" demekti. İsminin her harfi, onun gücünü anlatırdı.

İranlılarla savaştı Alp Er Tunga. Büyük bir ordu kurdu ve düşmanlarını yendi. Ama bir gün, hain bir okla vuruldu. Yaralandı ama yine de savaşmaya devam etti.

Son nefesinde bile, askerlerine cesaret verdi. "Korkmayın!" dedi. "Türk halkı sonsuza kadar yaşayacak." Ve öldü. Ama ölümü bile bir zaferdi.

Alp Er Tunga'nın hikayesi, Divanü Lügati't-Türk'te yazılıdır. Kaşgarlı Mahmud, onu övgüyle anlatır. Bugün hala, Alp Er Tunga cesaretin ve fedakarlığın sembolüdür. Onun adı, Türk tarihinde sonsuza kadar yaşayacak.`,
        language: 'tr',
        summary: 'Efsanevi Türk savaşçısı',
        tags: '["türk", "kahraman", "savaşçı", "tarih"]',
    },
    {
        id: 'myth-tr-017',
        name: 'Simurg',
        cultural_origin: 'Türk/İran',
        official_text: `Simurg, efsanevi bir kuştur. O kadar büyüktür ki, kanatları gökyüzünü kaplar. Binlerce yıl yaşar ve sonsuz bilgeliğe sahiptir. Kaf Dağı'nın zirvesinde yaşar.

Simurg'un tüyleri her renkten parlar. Altın, gümüş, yeşil, mavi - gökkuşağının tüm renkleri. Gözleri, geçmişi ve geleceği görür. Sesi, gök gürültüsü gibi güçlüdür.

Bir efsaneye göre, Simurg bir bebeği buldu ve onu büyüttü. Bebek, Zal adında bir kahraman oldu. Simurg, ona bilgelik öğretti ve tehlikelerden korudu.

Simurg, sadece güçlü değil, aynı zamanda merhametlidir. İhtiyacı olanlara yardım eder. Hastaları iyileştirir, kaybolanları bulur. Simurg, doğanın ve bilgeliğin sembolüdür. O, göklerin koruyucusudur.`,
        language: 'tr',
        summary: 'Bilgelik kuşu ve koruyucu',
        tags: '["türk", "mitoloji", "kuş", "bilgelik"]',
    },
    {
        id: 'myth-tr-018',
        name: 'Peri',
        cultural_origin: 'Türk/Anadolu',
        official_text: `Periler, güzel ve gizemli varlıklardır. İnsana benzerler ama kanatları vardır. Ormanlarda, dağlarda, su kenarlarında yaşarlar. Ay ışığında dans ederler.

Periler, genellikle iyidirler. Temiz kalpli insanlara yardım ederler. Ama kızdırılırlarsa, tehlikeli olabilirler. Periler, gece yarısı çıkarlar. Sabah olunca kaybolurlar.

Bir efsaneye göre, bir çoban bir periyi gördü. Peri o kadar güzeldi ki, çoban ona aşık oldu. Perinin kanatlarını sakladı. Peri, kanatları olmadan uçamadı ve çobanla evlendi.

Yıllar geçti, çocukları oldu. Ama bir gün, peri kanatlarını buldu. Çocuklarını alıp uçtu. Çoban, onu bir daha göremedi. Periler, özgürlüğü severler. Onları tutamazsınız, sadece sevebilirsiniz.`,
        language: 'tr',
        summary: 'Güzel ve gizemli kanatlı varlıklar',
        tags: '["türk", "peri", "masal", "doğa"]',
    },
    {
        id: 'myth-tr-019',
        name: 'Ejderha',
        cultural_origin: 'Türk/Anadolu',
        official_text: `Ejderha, dev bir yılan şeklinde bir yaratıktır. Pulları zırh gibi sert, gözleri ateş gibi kızıl. Ağzından alevler saçar. Mağaralarda yaşar ve hazineleri korur.

Eski zamanlarda, bir ejderha bir köyü terörize ediyordu. Her ay, köylüler ona bir kız vermek zorundaydılar. Yoksa ejderha köyü yakıyordu. Herkes korkuyordu.

Bir gün, genç bir kahraman geldi. "Ben ejderhayı öldüreceğim" dedi. Köylüler inanmadılar ama kahraman kararlıydı. Ejderhanın mağarasına gitti.

Ejderha ile savaştı. Kılıcı, ejderhanın pullarını kıramadı. Ama kahraman akıllıydı. Ejderhanın ağzı açıkken, kılıcını içeri soktu. Ejderha öldü ve köy kurtuldu. Hazine halka dağıtıldı.`,
        language: 'tr',
        summary: 'Ateş saçan dev yılan yaratık',
        tags: '["türk", "ejderha", "kahraman", "masal"]',
    },
    {
        id: 'myth-tr-020',
        name: 'Yunus Emre',
        cultural_origin: 'Türk/Anadolu',
        official_text: `Yunus Emre, Anadolu'nun en büyük ozanıydı. 13. yüzyılda yaşadı. Sade bir insandı ama sözleri derin ve güçlüydü. Aşktan, hoşgörüden, insanlıktan bahsetti.

"Yaratılanı severiz, Yaradan'dan ötürü" dedi. Bütün insanları, bütün yaratıkları sevdi. Zengin-fakir, Müslüman-Hıristiyan ayırmadı. Herkes eşitti onun gözünde.

Yunus'un şiirleri, halkın dilindeydi. Karmaşık değil, sade ve anlaşılırdı. Ama her dizede derin bir anlam vardı. İnsanlar, onun şiirlerini ezberlediler, türküler yaptılar.

Yüzyıllar geçti ama Yunus Emre'nin sözleri hala yaşıyor. "Gelin tanış olalım, işi kolay kılalım" der. "Sevgi ile bakın her şeye" der. Yunus Emre, sadece bir şair değil, bir bilge, bir rehber. Onun mirası, sevgi ve hoşgörüdür.`,
        language: 'tr',
        summary: 'Aşk ve hoşgörü ozanı',
        tags: '["türk", "ozan", "tasavvuf", "sevgi"]',
    },
    // Mesopotamian Myths
    {
        id: 'myth-ms-001',
        name: 'Gılgamış Destanı',
        cultural_origin: 'Sümer/Akad',
        official_text: `Gılgamış, Uruk kentinin kralıydı - üçte iki tanrı, üçte bir insandı. Gücü ve bilgeliği efsaneydi ama gururluydu. Halkı ondan şikayet edince, tanrılar Enkidu'yu yarattılar - vahşi bir adam, hayvanlarla yaşayan.

Enkidu uygarlaştırıldı ve Uruk'a geldi. Gılgamış'la güreştiler ve Gılgamış kazandı. Ama sonra en iyi arkadaş oldular. Birlikte Sedir Ormanı'na gittiler ve koruyucusu Humbaba'yı öldürdüler.

Tanrıça İştar, Gılgamış'a aşık oldu ama o reddetti. Öfkelenen İştar, Gök Boğası'nı gönderdi. Gılgamış ve Enkidu onu da öldürdüler. Ceza olarak, tanrılar Enkidu'nun ölmesine karar verdiler.

Arkadaşının ölümü Gılgamış'ı yıktı. Ölümsüzlüğü aramaya başladı. Utnapişti'yi buldu - tufandan kurtulan tek ölümsüz insan. Ama Gılgamış testleri geçemedi. Sonunda Uruk'a döndü ve ölümlülüğünü kabul etti. Şehrin duvarları ve işleri, onun mirası oldu.`,
        language: 'tr',
        summary: 'Ölümsüzlük arayan kral ve arkadaşlık destanı',
        tags: '["mezopotamya", "sümer", "destan", "ölümsüzlük"]',
    },
    {
        id: 'myth-ms-002',
        name: 'Enuma Eliş',
        cultural_origin: 'Babil',
        official_text: `Başlangıçta, sadece iki varlık vardı: Apsu (tatlı su) ve Tiamat (tuzlu su). Onların birleşmesinden tanrılar doğdu. Genç tanrılar gürültü yaptılar ve Apsu rahatsız oldu.

Apsu, genç tanrıları yok etmek istedi ama Ea tanrısı onu öldürdü. Tiamat öfkelendi ve canavarlar ordusu yarattı. Kingu'yu komutan yaptı ve ona Kader Tabletlerini verdi.

Genç tanrılar korktu. Marduk öne çıktı: "Ben Tiamat'la savaşacağım ama tanrıların kralı olmalıyım." Tanrılar kabul etti. Marduk, Tiamat'la savaştı ve onu yendi.

Tiamat'ın bedeninden gökyüzünü ve yeri yarattı. Kingu'nun kanından insanları yarattı. Marduk, Babil'in baş tanrısı oldu. Tanrılar onun için Esagila tapınağını inşa ettiler. Böylece düzen ve medeniyet kuruldu.`,
        language: 'tr',
        summary: 'Babil yaratılış destanı ve Marduk\'un zaferi',
        tags: '["mezopotamya", "babil", "yaratılış", "marduk"]',
    },
    {
        id: 'myth-ms-003',
        name: 'İnanna\'nın Yeraltına İnişi',
        cultural_origin: 'Sümer',
        official_text: `İnanna, aşk ve savaş tanrıçasıydı. Bir gün, kız kardeşi Ereşkigal'in yeraltı krallığına gitmeye karar verdi. Yedi kapıdan geçerken, her kapıda bir süsünü bırakmak zorunda kaldı.

Sonunda çıplak olarak Ereşkigal'in tahtına vardı. Ereşkigal öfkelendi ve İnanna'yı öldürdü. Cesedini bir çengele astı. Üç gün üç gece orada kaldı.

İnanna'nın sadık hizmetkarı Ninşubur, tanrılara yalvardı. Enki tanrısı yardım etti. İki yaratık gönderdi ve İnanna'yı diriltiler. Ama yeraltı kuralı vardı: Birisi İnanna'nın yerini almalıydı.

İnanna yeryüzüne döndü. Kocası Dumuzi'yi buldu - yas tutmuyordu, tahtında oturuyordu. Öfkelenen İnanna, onu yeraltına gönderdi. Ama Dumuzi'nin kız kardeşi Geştinanna, onun yerini almayı teklif etti. Böylece altı ay Dumuzi, altı ay Geştinanna yeraltında kalır.`,
        language: 'tr',
        summary: 'Tanrıçanın ölüm ve yeniden doğuş yolculuğu',
        tags: '["mezopotamya", "sümer", "inanna", "yeraltı"]',
    },
    {
        id: 'myth-ms-004',
        name: 'Tufan Efsanesi',
        cultural_origin: 'Sümer/Akad',
        official_text: `Tanrılar, insanların gürültüsünden rahatsız oldular. Enlil tanrısı, büyük bir tufanla insanlığı yok etmeye karar verdi. Ama Ea tanrısı, sadık kulucusu Utnapişti'yi uyardı.

"Bir gemi yap" dedi Ea. "Aileni, hayvanları ve zanaatkarları al. Tufan gelecek." Utnapişti, dev bir gemi inşa etti. Yedi gün yedi gece çalıştı.

Tufan geldi. Yağmur yedi gün yedi gece sürdü. Bütün dünya su altında kaldı. Sadece Utnapişti'nin gemisi yüzdü. Sonunda yağmur durdu ve gemi Nişir Dağı'na oturdu.

Utnapişti, bir güvercin, bir kırlangıç ve bir kuzgun gönderdi. Kuzgun geri dönmedi - kara bulmuştu. Utnapişti gemiden çıktı ve tanrılara kurban sundu. Tanrılar pişman oldular. Enlil, Utnapişti ve karısına ölümsüzlük verdi. Onlar, dünyanın ucunda sonsuza kadar yaşadılar.`,
        language: 'tr',
        summary: 'Büyük tufan ve kurtuluş hikayesi',
        tags: '["mezopotamya", "tufan", "utnapişti", "yaratılış"]',
    },
    {
        id: 'myth-ms-005',
        name: 'İştar ve Tammuz',
        cultural_origin: 'Babil/Akad',
        official_text: `İştar, güzellik ve aşk tanrıçasıydı. Tammuz, genç ve yakışıklı bir çobandı. İştar ona aşık oldu ve onunla evlendi. Mutlu günler yaşadılar.

Ama Tammuz, avda bir yaban domuzu tarafından öldürüldü. İştar çok üzüldü. Gözyaşları nehir oldu. Doğa da yas tuttu - çiçekler soldu, ağaçlar yapraklarını döktü.

İştar, Tammuz'u geri getirmek için yeraltına indi. Ereşkigal'e yalvardı. Sonunda bir anlaşma yaptılar: Tammuz, yılın yarısı yeraltında, yarısı yeryüzünde olacaktı.

Tammuz yeryüzüne döndüğünde, bahar gelir. Çiçekler açar, ağaçlar yeşerir. Yeraltına gittiğinde, sonbahar ve kış gelir. Böylece mevsimlerin döngüsü başladı. İştar ve Tammuz'un aşkı, doğanın ritmini yarattı.`,
        language: 'tr',
        summary: 'Aşk, ölüm ve mevsimlerin doğuşu',
        tags: '["mezopotamya", "babil", "aşk", "mevsimler"]',
    },
    {
        id: 'myth-ms-006',
        name: 'Adapa\'nın Hikayesi',
        cultural_origin: 'Akad',
        official_text: `Adapa, Ea tanrısının yarattığı bilge bir insandı. Balıkçılık yapıyordu. Bir gün, güney rüzgarı teknesini devirdi. Öfkelenen Adapa, rüzgarın kanatlarını kırdı.

Yedi gün boyunca rüzgar esmedi. Gök tanrısı Anu, bunu fark etti ve Adapa'yı göğe çağırdı. Ea, Adapa'ya talimat verdi: "Anu sana yiyecek ve içecek sunacak. Kabul etme! Ölüm yiyeceği ve içeceği olacak."

Adapa göğe çıktı. Anu'nun kapı bekçileri Tammuz ve Gizzida'yla konuştu. Onlar Adapa'yı savundular. Anu etkilendi ve Adapa'ya ölümsüzlük yiyeceği ve içeceği sundu.

Ama Adapa, Ea'nın tavsiyesini hatırlayarak reddetti. Anu güldü: "Budala! Ölümsüzlüğü reddetti!" Adapa yeryüzüne döndü. İnsanlık, ölümsüzlüğü kaybetti. Ama bilgelik kaldı.`,
        language: 'tr',
        summary: 'Bilge adam ve kaçırılan ölümsüzlük',
        tags: '["mezopotamya", "akad", "bilgelik", "ölümsüzlük"]',
    },
    {
        id: 'myth-ms-007',
        name: 'Etana\'nın Göğe Yükselişi',
        cultural_origin: 'Sümer/Akad',
        official_text: `Etana, Kiş kentinin kralıydı. Ama çocuğu yoktu. Tanrılara dua etti: "Bana bir varis verin." Şamaş tanrısı, ona bir kartal gösterdi.

Kartal, bir yılanla dosttu. Birlikte yaşıyorlardı. Ama kartal, yılanın yavrularını yedi. Yılan intikam aldı ve kartalı bir çukura attı. Kartal orada can çekişiyordu.

Etana, kartalı buldu ve iyileştirdi. Kartal minnettar oldu: "Sana nasıl yardım edebilirim?" Etana, "Beni göğe götür. Doğum otunu bulmalıyım" dedi.

Kartal, Etana'yı sırtına aldı ve göğe uçtu. Yükselirken, dünya küçüldü. İştar'ın kapısına vardılar. Etana, doğum otunu aldı. Yeryüzüne döndüler. Etana'nın bir oğlu oldu. Kartal ve Etana, sonsuza kadar dost kaldılar.`,
        language: 'tr',
        summary: 'Kralın göğe yolculuğu ve kartal dostu',
        tags: '["mezopotamya", "sümer", "kahraman", "gökyüzü"]',
    },
    {
        id: 'myth-ms-008',
        name: 'Zerdüşt ve Ateş',
        cultural_origin: 'Pers/İran',
        official_text: `Zerdüşt, eski İran'da doğdu. Genç yaşta, hakikati aradı. Otuz yaşında, bir nehir kıyısında Ahura Mazda'nın meleği Vohu Manah'ı gördü.

Vohu Manah, onu Ahura Mazda'nın huzuruna götürdü. Ahura Mazda, ışık ve iyiliğin tanrısıydı. Zerdüşt'e hakikati öğretti: "Dünya, iyilik ve kötülük arasında bir savaş alanıdır."

Zerdüşt, mesajı yaymaya başladı. "İyi düşünceler, iyi sözler, iyi işler" dedi. Ateş, Ahura Mazda'nın sembolüydü - saf ve aydınlatıcı. Tapınaklarda kutsal ateşler yandı.

Yıllar geçti. Zerdüşt'ün öğretisi yayıldı. Pers İmparatorluğu, Zerdüştlüğü benimsedi. Bugün hala, kutsal ateşler yanar. Zerdüşt'ün sözleri, Avesta'da yaşar. İyilik, sonunda kötülüğü yenecektir.`,
        language: 'tr',
        summary: 'Pers peygamberi ve ateş dini',
        tags: '["pers", "iran", "zerdüşt", "ateş"]',
    },
];
