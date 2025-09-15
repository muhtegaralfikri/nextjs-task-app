# Next.js Task App (My Task App)

![Screenshot Aplikasi My Task App](.\assets\app-screenshot.png)

Sebuah aplikasi To-Do List (Task Management) sederhana namun fungsional yang dibangun untuk mendemonstrasikan fondasi full-stack menggunakan Next.js. Project ini mencakup operasi CRUD yang lengkap dengan state yang persisten di sisi client.

---

## 🚀 Fitur Utama (Features)

* **Create:** Menambahkan task baru melalui form input.
* **Read:** Menampilkan daftar task.
* **Update (Toggle):** Menandai task sebagai "selesai" (atau batal) menggunakan checkbox.
* **Update (Edit):** Mengedit teks task secara *in-line* (langsung di tempat).
* **Delete:** Menghapus task dari daftar.
* **State Persisten:** Data task disimpan di **Local Storage** browser, sehingga data tidak hilang saat halaman di-refresh.
* **SSR Hydration Safe:** Dibangun dengan pola yang benar untuk menghindari *hydration mismatch* antara Server (SSR) dan Client (`localStorage`).
* **UI Responsif:** Dibuat dengan Tailwind CSS.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

* **Framework:** Next.js 14 (App Router)
* **Bahasa:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React Context API
* **Penyimpanan (Storage):** Local Storage (Client-side)
* **Linting/Formatting:** ESLint & Prettier (via Next.js)
* **Bundler:** Turbopack

---

## LOCAL (Cara Menjalankan Lokal)

1.  Clone repository ini:
    ```bash
    git clone https://github.com/muhtegaralfikri/nextjs-task-app.git
    ```

2.  Masuk ke direktori project:
    ```bash
    cd nextjs-task-app
    ```

3.  Install semua dependensi:
    ```bash
    npm install
    ```

4.  Jalankan development server:
    ```bash
    npm run dev
    ```

5.  Buka [http://localhost:3000](http://localhost:3000) di browser-mu.