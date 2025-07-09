# 🧩 Visualisasi Algoritma Backtracking - Sudoku Solver

Sebuah aplikasi web interaktif yang memvisualisasikan cara kerja algoritma backtracking dalam menyelesaikan puzzle Sudoku. Aplikasi ini dibuat dengan tujuan edukatif untuk membantu memahami konsep algoritma backtracking secara visual.

## 📋 Daftar Isi

- [Gambaran Umum](#gambaran-umum)
- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Cara Instalasi](#cara-instalasi)
- [Cara Penggunaan](#cara-penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [Algoritma Backtracking](#algoritma-backtracking)
- [Fungsi-Fungsi Utama](#fungsi-fungsi-utama)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## 🎯 Gambaran Umum

Proyek ini adalah implementasi visualisasi algoritma backtracking menggunakan puzzle Sudoku sebagai studi kasus. Aplikasi memungkinkan pengguna untuk:

- Mengamati langkah-langkah algoritma backtracking secara real-time
- Memahami bagaimana algoritma mencoba dan mundur ketika menemui jalan buntu
- Mengatur kecepatan visualisasi sesuai preferensi
- Membuat puzzle Sudoku secara otomatis

## ✨ Fitur Utama

### 🎮 Kontrol Interaktif
- **Buat Puzzle**: Menghasilkan puzzle Sudoku baru secara otomatis
- **Hapus Puzzle**: Menghapus semua isi dari grid Sudoku
- **Visualisasi**: Menjalankan animasi algoritma backtracking
- **Pengaturan Kecepatan**: Pilihan kecepatan (Cepat, Sedang, Lambat)

### 🎨 Antarmuka Visual
- **Grid Sudoku 9x9** yang responsif dan interaktif
- **Animasi Real-time** yang menunjukkan proses backtracking
- **Indikator Visual** untuk menunjukkan status sel:
  - 🟢 **Hijau**: Nilai yang benar
  - 🔴 **Merah**: Nilai yang salah/perlu backtrack
  - 🔒 **Fixed**: Nilai yang tetap/tidak berubah
- **Musik Latar**: Audio yang diputar selama visualisasi

### 📱 Responsive Design
- Kompatibel dengan desktop, tablet, dan perangkat mobile
- Antarmuka yang modern dengan tema gelap
- Animasi yang halus dan menarik

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur markup aplikasi
- **CSS3**: Styling dengan animasi dan efek visual modern
- **JavaScript (Vanilla)**: Logika algoritma dan interaksi pengguna
- **Font Google**: Font Roboto untuk tipografi yang konsisten
- **Font Awesome**: Ikon untuk elemen UI

## 🚀 Cara Instalasi

### Prasyarat
- Node.js (versi 12 atau lebih tinggi)
- npm (Node Package Manager)

### Langkah-langkah Instalasi

1. **Clone repositori**
   ```bash
   git clone <url-repositori>
   cd backtracking-algorithm-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm start
   ```

4. **Akses aplikasi**
   Buka browser dan kunjungi `http://localhost:8080`

### Build untuk Production

```bash
npm run build
```

File hasil build akan tersedia di folder `dist/`.

## 📖 Cara Penggunaan

### 1. Membuat Puzzle Baru
- Klik tombol **"Buat Puzzle"** di navbar
- Aplikasi akan menghasilkan puzzle Sudoku baru secara otomatis
- Beberapa sel akan terisi dengan nilai tetap (ditandai dengan warna yang berbeda)

### 2. Input Manual
- Klik pada sel kosong untuk memasukkan angka 1-9
- Aplikasi akan memvalidasi input dan memberikan feedback visual:
  - Hijau: Input benar sesuai solusi
  - Merah: Input salah (akan dihapus otomatis)

### 3. Menjalankan Visualisasi
- Klik tombol **"VISUALISASI"** untuk memulai animasi
- Algoritma akan mencoba mengisi setiap sel kosong
- Amati bagaimana algoritma:
  - Mencoba nilai 1-9 pada setiap sel
  - Mundur (backtrack) ketika menemui konflik
  - Melanjutkan pencarian hingga menemukan solusi

### 4. Mengatur Kecepatan
- Klik dropdown **"Kecepatan"**
- Pilih salah satu:
  - **Cepat**: Animasi berlangsung dengan cepat
  - **Sedang**: Kecepatan moderate untuk observasi yang baik
  - **Lambat**: Animasi lambat untuk analisis detail

### 5. Menghapus Grid
- Klik **"Hapus Puzzle"** untuk mengosongkan semua sel
- Grid akan kembali ke keadaan kosong

## 📁 Struktur Proyek

```
├── index.html          # File utama HTML
├── main.js             # Logika utama aplikasi dan algoritma backtracking
├── style.css           # Stylesheet dengan animasi dan tema
├── font.js             # Loader untuk Google Fonts dan Font Awesome
├── package.json        # Konfigurasi npm dan dependencies
├── package-lock.json   # Lock file untuk dependencies
├── favicon.ico         # Icon aplikasi
├── music/              # Folder untuk file audio
│   └── summer.mp3      # Musik latar saat visualisasi
└── dist/               # Folder build hasil production
```

### Penjelasan File Utama

#### `index.html`
- Struktur HTML aplikasi
- Grid Sudoku 9x9 dengan input field
- Navbar dengan kontrol aplikasi
- Container untuk peringatan dan footer

#### `main.js`
- **Algoritma Backtracking**: Implementasi core algorithm
- **Event Handlers**: Penanganan interaksi pengguna
- **Animasi Controller**: Kontrol visualisasi step-by-step
- **Validasi**: Fungsi untuk memvalidasi input Sudoku
- **Generator Puzzle**: Membuat puzzle baru secara otomatis

#### `style.css`
- **Modern Design**: Tema gelap dengan aksen biru
- **Responsive Layout**: Design yang adaptif untuk semua ukuran layar
- **Animasi**: Efek visual untuk feedback pengguna
- **Grid Styling**: Styling khusus untuk grid Sudoku

## 🧠 Algoritma Backtracking

### Konsep Dasar

Backtracking adalah algoritma pencarian yang mengeksplorasi semua kemungkinan solusi dengan cara:

1. **Mencoba**: Mengisi sel dengan nilai 1-9
2. **Validasi**: Memeriksa apakah nilai valid menurut aturan Sudoku
3. **Lanjut**: Jika valid, lanjut ke sel berikutnya
4. **Mundur**: Jika tidak valid atau menemui jalan buntu, mundur dan coba nilai lain

### Implementasi dalam Proyek

```javascript
const backtracking = (papan, kecepatanInt, datangDariGenerator = false, 
                     baris = 0, kolom = 0, penghitung = null, daftarAnimasi = null) => {
  // Cari sel kosong berikutnya
  let selanjutnyaKosong = cariSelanjutnyaKosong(papan, baris, kolom);
  
  if (!selanjutnyaKosong) {
    // Solusi ditemukan
    return true;
  }
  
  let [barisSel, kolomSel] = selanjutnyaKosong;
  
  // Coba angka 1-9
  for (let angkaMungkin = 1; angkaMungkin <= 9; angkaMungkin++) {
    papan[barisSel][kolomSel].children[0].value = angkaMungkin;
    
    if (apakahSelValid(barisSel, kolomSel, papan)) {
      // Rekursi ke sel berikutnya
      if (backtracking(papan, kecepatanInt, datangDariGenerator, 
                      barisSel, kolomSel, penghitung, daftarAnimasi)) {
        return true;
      }
    }
  }
  
  // Backtrack: hapus nilai dan coba lagi
  papan[barisSel][kolomSel].children[0].value = "";
  return false;
};
```

### Validasi Sudoku

Aplikasi memvalidasi setiap input berdasarkan tiga aturan Sudoku:

1. **Validasi Baris**: Tidak ada angka yang duplikat dalam satu baris
2. **Validasi Kolom**: Tidak ada angka yang duplikat dalam satu kolom  
3. **Validasi Kotak 3x3**: Tidak ada angka yang duplikat dalam kotak 3x3

## ⚙️ Fungsi-Fungsi Utama

### Generator Puzzle

```javascript
const buatPuzzle = () => {
  hapusPapan();                    // Bersihkan grid
  isiSeksiDiagonalSecara();       // Isi diagonal untuk variasi
  backtracking(papan, 0, true);   // Selesaikan puzzle lengkap
  hapusSecara();                  // Hapus sebagian sel secara acak
  aturKelas();                    // Set class untuk styling
};
```

### Sistem Animasi

```javascript
const animasi = (daftarAnimasi, kecepatanInt) => {
  for (let acara = 0; acara < daftarAnimasi.length; acara++) {
    setTimeout(() => {
      let [baris, kolom, nilai, namaKelas] = daftarAnimasi[acara];
      papan[baris][kolom].children[0].value = nilai;
      papan[baris][kolom].className = namaKelas;
    }, acara * kecepatanInt);
  }
};
```

### Validasi Real-time

```javascript
// Event listener untuk setiap input sel
td.children[0].addEventListener("input", (e) => {
  if (solusi) {
    // Mode dengan solusi tersedia
    if (td.children[0].value == solusi[indeksBaris][indeksKolom]) {
      td.classList.add("correct");
    } else {
      td.classList.add("wrong");
    }
  } else {
    // Mode validasi langsung
    if (apakahSelValid(indeksBaris, indeksKolom, papan)) {
      td.classList.add("fixed");
    } else {
      td.classList.add("wrong");
      // Auto-clear input yang salah
      setTimeout(() => {
        td.classList.remove("wrong");
        e.target.value = "";
      }, 500);
    }
  }
});
```

## 🎵 Fitur Audio

Aplikasi dilengkapi dengan musik latar yang diputar selama visualisasi:

- **File**: `music/summer.mp3`
- **Volume**: 35% (dapat disesuaikan)
- **Auto-play**: Dimulai saat visualisasi dijalankan

## 📱 Responsivitas

Aplikasi dirancang untuk bekerja optimal di berbagai perangkat:

### Desktop (> 768px)
- Layout horizontal dengan navbar full
- Grid ukuran optimal untuk visibilitas
- Semua fitur tersedia

### Tablet (768px - 480px)
- Navbar menjadi vertikal
- Grid disesuaikan dengan lebar layar
- Alert notification diposisikan ulang

### Mobile (< 480px)
- Layout fully responsive
- Font size yang disesuaikan
- Touch-friendly interface

## 🎨 Customization

### Mengubah Tema Warna

Edit variabel CSS di `style.css`:

```css
:root {
  --primary-color: #38bdf8;    /* Biru utama */
  --secondary-color: #818cf8;  /* Ungu */
  --accent-color: #c084fc;     /* Pink */
  --background: #0f172a;       /* Background gelap */
  --surface: #1e293b;          /* Surface color */
}
```

### Menambah Kecepatan Baru

Edit array kecepatan di `main.js`:

```javascript
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
  case "VeryFast":  // Tambahan baru
    kecepatanInt = 1;
    break;
}
```

### Mengganti Musik

Ganti file `music/summer.mp3` dengan file audio lain, atau edit di `main.js`:

```javascript
const lagu = ["summer", "winter", "spring"];  // Tambah lagu baru
```

## 🐛 Troubleshooting

### Masalah Umum

1. **Aplikasi tidak memuat**
   - Pastikan semua dependencies sudah terinstall
   - Jalankan `npm install` ulang
   - Periksa konsol browser untuk error

2. **Animasi tidak muncul**
   - Periksa apakah JavaScript diaktifkan
   - Pastikan tidak ada error di konsol
   - Coba refresh halaman

3. **Audio tidak diputar**
   - Pastikan browser mengizinkan autoplay
   - Periksa apakah file `music/summer.mp3` ada
   - Beberapa browser memblokir autoplay untuk policy

4. **Grid tidak responsif**
   - Pastikan CSS sudah termuat sempurna
   - Periksa media queries di `style.css`
   - Coba clear cache browser

## 📈 Optimasi Performa

### Tips untuk Performa Terbaik

1. **Batasi Iterasi**: Algoritma dibatasi hingga 100,000 iterasi untuk mencegah infinite loop
2. **Efficient DOM Updates**: Animasi menggunakan `setTimeout` untuk menghindari blocking
3. **Memory Management**: Variabel global diminimalkan
4. **Event Delegation**: Event listeners diatur secara efisien

## 🔮 Pengembangan Lanjutan

### Fitur yang Bisa Ditambahkan

1. **Multiple Algorithms**: Implementasi algoritma lain (A*, Constraint Propagation)
2. **Difficulty Levels**: Level kesulitan puzzle yang berbeda
3. **Statistics**: Tracking waktu penyelesaian dan langkah-langkah
4. **Save/Load**: Menyimpan dan memuat puzzle
5. **Hints System**: Sistem petunjuk untuk pemain
6. **Multiplayer**: Mode multiplayer real-time

### Teknologi Tambahan

1. **WebWorkers**: Untuk komputasi algoritma yang tidak blocking
2. **WebGL**: Untuk animasi 3D yang lebih advanced  
3. **PWA**: Progressive Web App untuk pengalaman mobile yang lebih baik
4. **WebRTC**: Untuk fitur multiplayer

## 🤝 Kontribusi

Kontribusi sangat diterima! Ikuti langkah berikut:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

### Guidelines Kontribusi

- Gunakan bahasa Indonesia untuk komentar dan dokumentasi
- Ikuti style code yang sudah ada
- Tambahkan unit test jika memungkinkan
- Update dokumentasi untuk fitur baru

## 📞 Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Periksa bagian [Troubleshooting](#troubleshooting)
2. Buka issue di GitHub repository
3. Sertakan detail error dan langkah reproduksi

## 📜 Lisensi

Proyek ini dilisensikan di bawah [ISC License](LICENSE).

## 🙏 Acknowledgments

- **Algoritma Backtracking**: Konsep klasik dalam computer science
- **Sudoku**: Puzzle yang sempurna untuk demonstrasi backtracking
- **Google Fonts**: Untuk font Roboto yang elegant
- **Font Awesome**: Untuk ikon yang indah

---

### 📊 Project Stats

- **Bahasa**: JavaScript, HTML, CSS
- **Ukuran**: ~45KB (tanpa dependencies)
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Mobile Friendly**: ✅ Ya
- **Offline Capable**: ⚠️ Parsial (butuh koneksi untuk fonts)

### 🎓 Nilai Edukatif

Proyek ini sangat cocok untuk:
- **Mahasiswa**: Memahami algoritma backtracking
- **Pengajar**: Demonstrasi visual konsep recursion
- **Developer**: Studi kasus implementasi algoritma dalam web
- **Puzzle Enthusiast**: Memahami cara kerja Sudoku solver

---

**Dibuat dengan ❤️ untuk edukasi algoritma**