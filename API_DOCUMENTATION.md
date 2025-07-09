# 📚 Dokumentasi API dan Teknis

Dokumentasi ini ditujukan untuk developer yang ingin memahami arsitektur internal aplikasi dan mengembangkannya lebih lanjut.

## 📋 Daftar Isi

- [Arsitektur Aplikasi](#arsitektur-aplikasi)
- [API Reference](#api-reference)
- [Data Structures](#data-structures)
- [Event System](#event-system)
- [CSS Classes](#css-classes)
- [Performance Considerations](#performance-considerations)
- [Testing Guidelines](#testing-guidelines)

## 🏗️ Arsitektur Aplikasi

### Application Flow

```
User Interaction → Event Handler → Algorithm Logic → Animation Queue → DOM Update
```

### Core Components

1. **Grid Manager**: Mengelola state dan manipulasi grid Sudoku
2. **Algorithm Engine**: Implementasi algoritma backtracking
3. **Animation Controller**: Mengatur visualisasi step-by-step
4. **Validation System**: Memvalidasi input berdasarkan aturan Sudoku
5. **UI Controller**: Menangani interaksi pengguna

## 🔧 API Reference

### Global Variables

```javascript
// State Variables
var papan;           // Grid 2D array berisi DOM elements
var kecepatan;       // String: "Fast", "Average", "Slow"
var kecepatanInt;    // Number: delay dalam ms untuk animasi
var solusi;          // Array 2D berisi solusi puzzle
var sedangProses;    // Boolean: flag untuk mencegah multiple execution

// Audio Controller
const audio;         // HTMLAudioElement untuk musik latar
const lagu;          // Array berisi nama file musik
```

### Core Functions

#### Grid Management

```javascript
/**
 * Mengambil representasi grid saat ini dari DOM
 * @returns {Array<Array<HTMLElement>>} 2D array elemen grid
 */
const ambilPapanSaatIni = () => { /* ... */ }

/**
 * Menghapus semua nilai dari grid
 * @returns {void}
 */
const hapusPapan = () => { /* ... */ }

/**
 * Mengatur class CSS untuk styling grid
 * @returns {void}
 */
const aturKelas = () => { /* ... */ }
```

#### Puzzle Generation

```javascript
/**
 * Membuat puzzle Sudoku baru
 * @returns {void}
 */
const buatPuzzle = () => { /* ... */ }

/**
 * Mengisi bagian diagonal grid secara acak
 * @returns {void}
 */
const isiSeksiDiagonalSecara = () => { /* ... */ }

/**
 * Menghapus sel secara acak untuk membuat puzzle
 * @returns {void}
 */
const hapusSecara = () => { /* ... */ }
```

#### Backtracking Algorithm

```javascript
/**
 * Algoritma backtracking utama untuk menyelesaikan Sudoku
 * @param {Array<Array<HTMLElement>>} papan - Grid Sudoku
 * @param {number} kecepatanInt - Delay animasi dalam ms
 * @param {boolean} datangDariGenerator - Flag untuk mode generator
 * @param {number} baris - Baris saat ini (default: 0)
 * @param {number} kolom - Kolom saat ini (default: 0)
 * @param {Object} penghitung - Counter untuk iterasi dan waktu
 * @param {Array} daftarAnimasi - Queue untuk animasi
 * @returns {boolean} true jika solusi ditemukan
 */
const backtracking = (
  papan, 
  kecepatanInt, 
  datangDariGenerator = false,
  baris = 0, 
  kolom = 0, 
  penghitung = null, 
  daftarAnimasi = null
) => { /* ... */ }
```

#### Validation Functions

```javascript
/**
 * Validasi baris Sudoku
 * @param {Array<Array<HTMLElement>>} papan - Grid Sudoku
 * @param {number} indeksBaris - Index baris yang akan divalidasi
 * @returns {boolean} true jika baris valid
 */
const apakahBarisValid = (papan, indeksBaris) => { /* ... */ }

/**
 * Validasi kolom Sudoku
 * @param {Array<Array<HTMLElement>>} papan - Grid Sudoku
 * @param {number} indeksKolom - Index kolom yang akan divalidasi
 * @returns {boolean} true jika kolom valid
 */
const apakahKolomValid = (papan, indeksKolom) => { /* ... */ }

/**
 * Validasi kotak 3x3 Sudoku
 * @param {number} indeksBaris - Index baris sel
 * @param {number} indeksKolom - Index kolom sel
 * @param {Array<Array<HTMLElement>>} matriks - Grid Sudoku
 * @returns {boolean} true jika kotak valid
 */
const apakahKotakValid = (indeksBaris, indeksKolom, matriks) => { /* ... */ }

/**
 * Validasi sel tunggal berdasarkan semua aturan Sudoku
 * @param {number} baris - Index baris sel
 * @param {number} kolom - Index kolom sel
 * @param {Array<Array<HTMLElement>>} matriks - Grid Sudoku
 * @returns {boolean} true jika sel valid
 */
const apakahSelValid = (baris, kolom, matriks) => { /* ... */ }
```

#### Utility Functions

```javascript
/**
 * Mencari sel kosong berikutnya dalam grid
 * @param {Array<Array<HTMLElement>>} papan - Grid Sudoku
 * @param {number} baris - Baris awal pencarian
 * @param {number} kolom - Kolom awal pencarian
 * @returns {Array<number>|null} [baris, kolom] atau null jika tidak ada
 */
const cariSelanjutnyaKosong = (papan, baris, kolom) => { /* ... */ }

/**
 * Menganimasikan solusi algoritma
 * @param {Array} daftarAnimasi - Queue berisi langkah-langkah animasi
 * @param {number} kecepatanInt - Delay antar frame dalam ms
 * @returns {void}
 */
const animasi = (daftarAnimasi, kecepatanInt) => { /* ... */ }

/**
 * Mengaktifkan kembali menu setelah animasi selesai
 * @param {number} acara - Jumlah frame animasi
 * @returns {void}
 */
const aktifkanMenu = (acara) => { /* ... */ }

/**
 * Menampilkan peringatan kepada pengguna
 * @param {string} pesan - Pesan yang akan ditampilkan
 * @param {string} namaKelas - Class CSS untuk styling ("success"|"danger")
 * @returns {void}
 */
const tampilkanPeringatan = (pesan, namaKelas) => { /* ... */ }
```

#### Audio Functions

```javascript
/**
 * Memuat file audio
 * @param {string} lagu - Nama file tanpa ekstensi
 * @returns {void}
 */
function muatLagu(lagu) { /* ... */ }

/**
 * Memutar musik latar
 * @returns {void}
 */
function putarLagu() { /* ... */ }
```

## 📊 Data Structures

### Grid Structure

```javascript
// Representasi grid internal (DOM elements)
papan = [
  [td, td, td, td, td, td, td, td, td],  // Baris 0
  [td, td, td, td, td, td, td, td, td],  // Baris 1
  // ... 7 baris lainnya
]

// Setiap elemen td berisi:
{
  children: [input],     // HTMLInputElement untuk nilai
  className: string,     // CSS class untuk status
  classList: DOMTokenList
}
```

### Solution Structure

```javascript
// Array 2D berisi solusi lengkap
solusi = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["4", "5", "6", "7", "8", "9", "1", "2", "3"],
  // ... 7 baris lainnya
]
```

### Animation Queue Structure

```javascript
// Setiap elemen dalam daftarAnimasi:
[baris, kolom, nilai, namaKelas]

// Contoh:
daftarAnimasi = [
  [0, 0, "1", "wrong"],    // Coba nilai 1 di [0,0], tandai sebagai salah
  [0, 0, "2", "correct"],  // Coba nilai 2 di [0,0], tandai sebagai benar
  [0, 1, "3", "wrong"],    // Lanjut ke sel berikutnya
  [0, 0, "", ""],          // Backtrack: hapus nilai di [0,0]
]
```

### Performance Counter Structure

```javascript
penghitung = {
  iterasi: number,      // Jumlah iterasi algoritma
  waktuMulai: number    // Timestamp mulai eksekusi (Date.now())
}
```

## ⚡ Event System

### Event Listeners Registration

```javascript
// Grid Input Events
papan.forEach((baris, indeksBaris) =>
  baris.forEach((td, indeksKolom) => {
    td.children[0].addEventListener("input", inputHandler);
  })
);

// Button Events
document.getElementById("clearBtn").addEventListener("click", hapusPapan);
document.getElementById("generateBtn").addEventListener("click", buatPuzzle);
document.getElementById("visualizeBtn").addEventListener("click", visualizationHandler);

// Speed Control Events
document.querySelectorAll("#speed ~ ul > li").forEach(btn => {
  btn.addEventListener("click", speedChangeHandler);
});

// Menu Toggle Events
document.querySelectorAll("nav li input[type='checkbox']").forEach(menu => {
  menu.addEventListener("click", menuToggleHandler);
});
```

### Custom Events

Aplikasi menggunakan standard DOM events dan tidak memiliki custom event system.

## 🎨 CSS Classes

### Grid Cell States

```css
/* Status sel Sudoku */
.correct {
  /* Sel dengan nilai benar */
  background: linear-gradient(145deg, #10b981, #059669);
  color: #fff;
  animation: pulseCorrect 0.5s ease;
}

.wrong {
  /* Sel dengan nilai salah atau perlu backtrack */
  background: linear-gradient(145deg, #ef4444, #b91c1c);
  color: #fff;
  animation: pulseWrong 0.5s ease;
}

.fixed {
  /* Sel dengan nilai tetap (tidak berubah) */
  background: linear-gradient(145deg, #334155, #1e293b);
  color: #fff;
  font-weight: bold;
}
```

### Alert Types

```css
.alert.success {
  /* Peringatan sukses */
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-left: 5px solid #047857;
}

.alert.danger {
  /* Peringatan error */
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  border-left: 5px solid #7f1d1d;
}

.alert.hidden {
  /* Peringatan tersembunyi */
  transform: translateX(-100%);
  opacity: 0;
}
```

### UI States

```css
/* Menu aktif */
li.active {
  background-color: #334155;
  color: #38bdf8;
  border-left: 3px solid #38bdf8;
}

/* Efek hover */
nav > ul li:hover {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  transform: translateY(-2px);
}

/* Input focus */
.row td input:focus {
  background: #475569;
  box-shadow: 0 0 0 2px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.6);
}
```

## 🚀 Performance Considerations

### Algorithm Optimization

1. **Iteration Limit**: Maksimal 100,000 iterasi untuk mencegah infinite loop
   ```javascript
   if (penghitung["iterasi"] >= 100000) {
     tampilkanPeringatan("Backtracking adalah algoritma yang naif...", "danger");
     return false;
   }
   ```

2. **Early Termination**: Validasi dilakukan seawal mungkin
   ```javascript
   if (apakahSelValid(barisSel, kolomSel, papan)) {
     // Lanjut hanya jika valid
   }
   ```

### DOM Optimization

1. **Batch DOM Updates**: Animasi menggunakan `setTimeout` untuk non-blocking updates
   ```javascript
   setTimeout(() => {
     papan[baris][kolom].children[0].value = nilai;
     papan[baris][kolom].className = namaKelas;
   }, acara * kecepatanInt);
   ```

2. **Event Delegation**: Minimal event listeners untuk performa optimal

3. **CSS Transitions**: Hardware-accelerated animations menggunakan `transform`

### Memory Management

1. **Avoid Memory Leaks**: Event listeners dibersihkan saat tidak diperlukan
2. **Efficient Data Structures**: Menggunakan array native JavaScript
3. **Garbage Collection**: Variables di-scope dengan benar

## 🧪 Testing Guidelines

### Unit Testing Structure

```javascript
// Contoh test cases yang bisa diimplementasikan

describe('Sudoku Validation', () => {
  test('apakahBarisValid should return true for valid row', () => {
    // Setup grid dengan baris valid
    // Assert bahwa fungsi mengembalikan true
  });

  test('apakahKolomValid should return false for duplicate in column', () => {
    // Setup grid dengan duplikat di kolom
    // Assert bahwa fungsi mengembalikan false
  });

  test('apakahKotakValid should validate 3x3 box correctly', () => {
    // Setup grid dengan kotak 3x3 yang valid/invalid
    // Assert hasil yang diharapkan
  });
});

describe('Backtracking Algorithm', () => {
  test('should solve simple puzzle', () => {
    // Setup puzzle sederhana
    // Run backtracking
    // Assert solusi benar
  });

  test('should handle unsolvable puzzle', () => {
    // Setup puzzle yang tidak bisa diselesaikan
    // Assert bahwa fungsi mengembalikan false
  });
});

describe('Grid Management', () => {
  test('hapusPapan should clear all cells', () => {
    // Setup grid dengan nilai
    // Call hapusPapan
    // Assert semua sel kosong
  });

  test('buatPuzzle should generate valid puzzle', () => {
    // Call buatPuzzle
    // Assert puzzle memiliki sel terisi dan solusi valid
  });
});
```

### Integration Testing

```javascript
// Test untuk workflow lengkap
describe('Complete Workflow', () => {
  test('generate → solve → visualize workflow', () => {
    // 1. Generate puzzle
    // 2. Solve using backtracking
    // 3. Verify visualization queue
    // 4. Assert final state
  });
});
```

### Performance Testing

```javascript
describe('Performance', () => {
  test('algorithm should complete within time limit', () => {
    const startTime = Date.now();
    backtracking(papan, 0, true);
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(5000); // 5 detik
  });

  test('animation should not block UI', () => {
    // Test bahwa animasi tidak memblokir user interaction
  });
});
```

## 🔧 Development Setup

### Required Dependencies

```json
{
  "devDependencies": {
    "http-server": "^14.1.1",
    "jest": "^29.0.0",          // Untuk testing (optional)
    "eslint": "^8.0.0",         // Untuk linting (optional)
    "prettier": "^2.0.0"        // Untuk formatting (optional)
  }
}
```

### Development Scripts

```json
{
  "scripts": {
    "start": "npx http-server -o -c-1",
    "build": "mkdir -p dist && cp *.html *.js *.css favicon.ico dist/ && mkdir -p dist/music && cp music/* dist/music/",
    "test": "jest",
    "lint": "eslint *.js",
    "format": "prettier --write *.js *.css *.html"
  }
}
```

### Code Style Guidelines

1. **Naming Convention**: 
   - Variables: camelCase (`kecepatanInt`)
   - Functions: camelCase (`apakahSelValid`)
   - Constants: UPPER_CASE (`MAX_ITERATIONS`)

2. **Comments**: Gunakan bahasa Indonesia untuk konsistensi
   ```javascript
   // Fungsi untuk memvalidasi baris Sudoku
   const apakahBarisValid = (papan, indeksBaris) => {
     // Implementasi validasi
   }
   ```

3. **Error Handling**: Selalu sediakan fallback
   ```javascript
   try {
     // Risky operation
   } catch (error) {
     tampilkanPeringatan("Terjadi kesalahan", "danger");
   }
   ```

## 🐛 Debugging Tips

### Common Issues

1. **Grid Not Updating**: Check DOM element references
   ```javascript
   console.log('Papan state:', papan);
   console.log('Element value:', papan[0][0].children[0].value);
   ```

2. **Animation Not Playing**: Verify animation queue
   ```javascript
   console.log('Animation queue:', daftarAnimasi);
   console.log('Speed setting:', kecepatanInt);
   ```

3. **Validation Errors**: Log validation steps
   ```javascript
   console.log('Row valid:', apakahBarisValid(papan, baris));
   console.log('Column valid:', apakahKolomValid(papan, kolom));
   console.log('Box valid:', apakahKotakValid(baris, kolom, papan));
   ```

### Development Tools

1. **Browser DevTools**: Gunakan untuk debug DOM dan performance
2. **Console Logging**: Tambahkan logging untuk trace algorithm steps
3. **Breakpoints**: Set breakpoints di fungsi kritikal

---

**Dokumentasi ini akan terus diperbarui seiring pengembangan aplikasi.** 

Untuk pertanyaan teknis atau kontribusi, silakan buka issue di repository GitHub.