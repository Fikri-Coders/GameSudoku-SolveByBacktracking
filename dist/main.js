// File JavaScript yang berisi logika aplikasi utama

var papan;
var kecepatan;
var kecepatanInt;
var solusi = null;
var sedangProses = false;

// Mengambil elemen audio dan mengatur level volume default menjadi 35%
const audio = document.getElementById("audio");
audio.volume = 0.35;

// Membuat array lagu dengan satu elemen lagu untuk diputar untuk penonton saat memvisualisasikan algoritma
const lagu = ["summer"];

// Awalnya memuat detail lagu ke DOM
muatLagu(lagu[0]);

// Memuat Lagu
function muatLagu(lagu) {
  audio.src = `music/${lagu}.mp3`;
}

// Putar lagu
function putarLagu() {
  audio.play();
}

// Fungsi untuk mendapatkan Detail Papan Saat Ini
const ambilPapanSaatIni = () => {
  let papan = [];
  for (let baris = 0; baris < 9; baris++) {
    let barisSaatIni = [];
    let elemenBaris = document.querySelector(`.row:nth-child(${baris + 1})`);
    for (kolom = 0; kolom < elemenBaris.children.length; kolom++) {
      barisSaatIni.push(elemenBaris.children[kolom]);
    }
    papan.push(barisSaatIni);
  }
  return papan;
};

papan = ambilPapanSaatIni();
kecepatan = "Fast";
kecepatanInt = 3;

// Fungsi untuk menghapus semua nilai dari Papan
const hapusPapan = () => {
  if (sedangProses) {
    tampilkanPeringatan(
      "Animasi Sedang Berlangsung.. Silakan Muat Ulang Halaman untuk menyelesaikan puzzle lain sebelum animasi selesai.",
      "danger"
    );
    return;
  }
  papan.forEach((baris) =>
    baris.forEach((td) => {
      td.className = "";
      td.children[0].value = "";
    })
  );
  solusi = null;
};

// Mengatur Pendengar Acara OnClick untuk Tombol Hapus Papan
const tombolHapusPapan = document.getElementById("clearBtn");
tombolHapusPapan.addEventListener("click", hapusPapan);

// Fungsi untuk Membuat Puzzle
const buatPuzzle = () => {
  if (sedangProses) {
    tampilkanPeringatan(
      "Animasi Sedang Berlangsung.. Silakan Muat Ulang Halaman untuk menyelesaikan puzzle lain sebelum animasi selesai.",
      "danger"
    );
    return;
  } else {
    hapusPapan();
    isiSeksiDiagonalSecara();
    backtracking(papan, 0, true);
    solusi = papan.map((baris) =>
      baris.map((td) => {
        return td.children[0].value;
      })
    );
    // Secara Acak Menghapus Sel setelah menyelesaikan puzzle untuk menghasilkan puzzle
    hapusSecara();
    aturKelas();
  }
};

// Mengatur Pendengar Acara OnClick untuk Tombol Buat Puzzle
const tombolBuat = document.getElementById("generateBtn");
tombolBuat.addEventListener("click", buatPuzzle);

const isiSeksiDiagonalSecara = () => {
  let baris = 0;
  let kolom = 0;
  let penghitung = 0;

  while (baris != 9 && kolom != 9 && penghitung < 900) {
    penghitung++;
    let angkaMungkin = Math.floor(Math.random() * 9) + 1;

    papan[baris][kolom].children[0].value = angkaMungkin;
    papan[baris][kolom].classList.add("fixed");

    if (baris % 3 == 0 && kolom % 3 == 0) {
      kolom++;
    } else if (apakahKotakValid(baris, kolom, papan)) {
      if (kolom % 3 != 2) {
        kolom++;
      } else if (kolom % 3 === 2) {
        if (baris % 3 === 2) {
          kolom++;
        } else {
          kolom = kolom - 2;
        }

        baris++;
      }
    }
  }
};

const hapusSecara = () => {
  let selYangDihapusDariPuzzle = [];
  for (let i = 0; i < 80; i++) {
    let indeksSelAcak = Math.floor(Math.random() * 81);
    selYangDihapusDariPuzzle.push(indeksSelAcak);
  }

  let penghitung = 0;
  for (let baris = 0; baris < papan.length; baris++) {
    for (let kolom = 0; kolom < papan[baris].length; kolom++) {
      if (selYangDihapusDariPuzzle.indexOf(penghitung) !== -1) {
        papan[baris][kolom].children[0].value = "";
      }
      penghitung++;
    }
  }
};

const aturKelas = () => {
  papan.forEach((baris) =>
    baris.forEach((td) => {
      if (td.children[0].value) {
        td.className = "fixed";
      } else {
        td.className = "";
      }
    })
  );
};

// Fungsi untuk menonaktifkan menu dropdown saat menganimasikan
const menu = document.querySelectorAll(`nav li input[type='checkbox']`);

menu.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    if (e.target.checked) {
      menu.forEach((menu) => {
        if (menu !== e.target) {
          menu.checked = false;
        }
      });
    }
  });
});

// Menangani angka yang dimasukkan ke dalam papan
papan.forEach((baris, indeksBaris) =>
  baris.forEach((td, indeksKolom) => {
    td.children[0].addEventListener("input", (e) => {
      if (e.target.value == "") {
        td.className = "";
        return;
      }

      if (
        ["1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(
          e.target.value
        ) === -1
      ) {
        td.classList.add("wrong");
        setTimeout(() => {
          e.target.value = "";
          td.classList.remove("wrong");
        }, 500);
      } else {
        if (solusi) {
          if (td.children[0].value == solusi[indeksBaris][indeksKolom]) {
            td.classList.add("correct");
          } else {
            td.classList.add("wrong");
          }
        } else {
          td.classList.add("fixed");
          if (apakahSelValid(indeksBaris, indeksKolom, papan)) return;
          td.classList.remove("fixed");
          td.classList.add("wrong");
          setTimeout(() => {
            td.classList.remove("wrong");
            e.target.value = "";
          }, 500);
        }
      }
    });
  })
);

// Menambahkan Pendengar Acara untuk menyesuaikan kecepatan animasi
const tombolKecepatan = document.querySelectorAll(`#speed ~ ul > li`);

tombolKecepatan.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    kecepatan = e.target.getAttribute("data-value");

    // untuk UI
    tombolKecepatan.forEach((option) => option.classList.remove("active"));
    e.target.classList.add("active");

    switch (kecepatan) {
      case "Fast":
        kecepatanInt = 3;
        break;
      case "Average":
        kecepatanInt = 10;
        break;
      case "Slow":
        kecepatanInt = 150;
        break;
    }
    document.getElementById("speed").checked = false;
  });
});

// Mengatur Pendengar Acara untuk Tombol VISUALISASI
const tombolVisualisasi = document.getElementById("visualizeBtn");

tombolVisualisasi.addEventListener("click", () => {
  if (sedangProses) {
    tampilkanPeringatan(
      "Animasi Sedang Berlangsung.. Silakan Tunggu sampai animasi selesai..",
      "danger"
    );
    return;
  }

  // Bersihkan papan dari solusi sebelumnya.
  papan.forEach((baris) =>
    baris.forEach((td) => {
      if (!td.classList.contains("fixed")) {
        td.children[0].value = "";
        td.className = "";
      }
    })
  );

  // Menonaktifkan Dropdown
  let menus = document.querySelectorAll(`ul input[type='checkbox']`);
  menus.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = true;
  });

  sedangProses = true;
  putarLagu();
  return backtracking(papan, kecepatanInt);
});
``;

// Algoritma BackTracking untuk menyelesaikan puzzle

const backtracking = (
  papan,
  kecepatanInt,
  datangDariGenerator = false,
  baris = 0,
  kolom = 0,
  penghitung = null,
  daftarAnimasi = null
) => {
  if (!daftarAnimasi) daftarAnimasi = [];

  if (!penghitung) penghitung = { iterasi: 0, waktuMulai: Date.now() };

  penghitung["iterasi"]++;

  // Berhenti dan lempar peringatan ke pengguna jika algoritma membutuhkan terlalu banyak waktu atau langkah untuk menyelesaikan puzzle saat ini

  if (penghitung["iterasi"] >= 100000) {
    tampilkanPeringatan(
      "Backtracking adalah algoritma yang naif. Silakan coba puzzle yang lebih mudah untuk itu.",
      "danger"
    );
    return false;
  }

  if (baris === papan.length && kolom === papan[baris].length) {
    hapusPapan();
    animasi(daftarAnimasi, kecepatanInt);
    return true;
  }

  let selanjutnyaKosong = cariSelanjutnyaKosong(papan, baris, kolom);

  if (!selanjutnyaKosong) {
    if (!datangDariGenerator) {
      papan.forEach((baris) =>
        baris.forEach((td) => {
          if (!td.classList.contains("fixed")) {
            td.children[0].value = "";
          }
        })
      );

      animasi(daftarAnimasi, kecepatanInt);

      let durasi = Date.now() - penghitung["waktuMulai"];
      tampilkanPeringatan(
        `Algoritma Backtracking menyelesaikan puzzle dengan sukses dalam ${durasi} ms.`,
        "success"
      );
    }

    aktifkanMenu(daftarAnimasi.length);

    return true;
  }

  let [barisSel, kolomSel] = selanjutnyaKosong;

  for (let angkaMungkin = 1; angkaMungkin <= 9; angkaMungkin++) {
    papan[barisSel][kolomSel].children[0].value = angkaMungkin;
    daftarAnimasi.push([barisSel, kolomSel, angkaMungkin, "wrong"]);

    if (apakahSelValid(barisSel, kolomSel, papan)) {
      daftarAnimasi.push([barisSel, kolomSel, angkaMungkin, "correct"]);
      if (
        backtracking(
          papan,
          kecepatanInt,
          datangDariGenerator,
          barisSel,
          kolomSel,
          penghitung,
          daftarAnimasi
        )
      )
        return true;
    }
  }

  papan[barisSel][kolomSel].children[0].value = "";
  daftarAnimasi.push([barisSel, kolomSel, "", ""]);
  return false;
};

// Fungsi Pembantu untuk membantu menyelesaikan Puzzle menggunakan Algoritma BackTracking
const apakahBarisValid = (papan, indeksBaris) => {
  for (let baris = 0; baris < 9; baris++) {
    if (indeksBaris === baris) {
      let angkaDalamBaris = {};

      for (kolom = 0; kolom < 9; kolom++) {
        if (
          papan[indeksBaris][kolom].children[0].value &&
          angkaDalamBaris[papan[indeksBaris][kolom].children[0].value]
        ) {
          return false;
        } else if (papan[indeksBaris][kolom].children[0].value) {
          angkaDalamBaris[papan[indeksBaris][kolom].children[0].value] = true;
        }
      }

      return true;
    }
  }
};

const apakahKolomValid = (papan, indeksKolom) => {
  let angkaDalamKolom = {};

  for (let baris = 0; baris < papan.length; baris++) {
    for (kolom = 0; kolom < papan[baris].length; kolom++) {
      if (indeksKolom === kolom) {
        currentNum = papan[baris][kolom].children[0].value;

        if (currentNum && angkaDalamKolom[currentNum]) {
          return false;
        } else if (currentNum) {
          angkaDalamKolom[currentNum] = true;
        }
      }
    }
  }

  return true;
};

const apakahKotakValid = (indeksBaris, indeksKolom, matriks) => {
  let xKotak = Math.floor(indeksKolom / 3);
  let yKotak = Math.floor(indeksBaris / 3);

  let angkaDalamKotak = {};

  for (let baris = yKotak * 3; baris < (yKotak + 1) * 3; baris++) {
    for (let kolom = xKotak * 3; kolom < (xKotak + 1) * 3; kolom++) {
      let angkaSaatIni = matriks[baris][kolom].children[0].value;

      if (angkaSaatIni && angkaDalamKotak[angkaSaatIni]) {
        return false;
      } else if (angkaSaatIni) {
        angkaDalamKotak[angkaSaatIni] = true;
      }
    }
  }

  return true;
};

const apakahSelValid = (baris, kolom, matriks) => {
  return (
    apakahBarisValid(papan, baris) &&
    apakahKolomValid(papan, kolom) &&
    apakahKotakValid(baris, kolom, matriks)
  );
};

// Fungsi untuk menemukan sel kosong berikutnya untuk mengisi nilai
const cariSelanjutnyaKosong = (papan, baris, kolom) => {
  for (let barisSaatIni = 0; barisSaatIni < papan.length; barisSaatIni++) {
    for (let kolomSaatIni = 0; kolomSaatIni < papan[baris].length; kolomSaatIni++) {
      if (
        !papan[barisSaatIni][kolomSaatIni].classList.contains("fixed") &&
        !papan[barisSaatIni][kolomSaatIni].children[0].value
      ) {
        return [barisSaatIni, kolomSaatIni];
      }
    }
  }
};

// Fungsi untuk Menganimasikan dan Memvisualisasikan Solusi Algoritma

const animasi = (daftarAnimasi, kecepatanInt) => {
  for (let acara = 0; acara < daftarAnimasi.length; acara++) {
    setTimeout(() => {
      let [baris, kolom, nilai, namaKelas] = daftarAnimasi[acara];
      papan[baris][kolom].children[0].value = nilai;
      papan[baris][kolom].className = namaKelas;
    }, acara * kecepatanInt);
  }
  aktifkanMenu(daftarAnimasi.length);
};

// Fungsi untuk mengaktifkan menu setelah animasi selesai
const aktifkanMenu = (acara) => {
  setTimeout(() => {
    sedangProses = false;

    document
      .querySelectorAll(`ul input[type='checkbox']`)
      .forEach((checkbox) => {
        checkbox.disabled = false;
      });
  }, acara * kecepatanInt);
};

// Fungsi untuk membuat peringatan
const tampilkanPeringatan = (pesan, namaKelas) => {
  // Buat peringatan
  const peringatan = document.createElement("div");
  peringatan.classList.add("alert");
  peringatan.classList.add(namaKelas);
  peringatan.appendChild(document.createTextNode(pesan));

  // Lampirkan peringatan ke badan (Tampilkan di Layar)
  document.querySelector("body").appendChild(peringatan);

  setTimeout(() => {
    document.querySelector("body").removeChild(peringatan);
  }, 5000);
};