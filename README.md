# TodoKita

<img width="1495" alt="Screenshot 2024-07-21 at 23 47 07" src="https://github.com/user-attachments/assets/602d8240-0be4-4b55-9a68-8708c515626e">


## Deskripsi

TodoKita adalah aplikasi web manajemen tugas yang sederhana namun powerful. Dirancang untuk memudahkan pengguna dalam mengelola aktivitas sehari-hari, TodoKita menawarkan antarmuka yang intuitif dan fitur-fitur esensial. Dengan TodoKita, pengguna dapat dengan mudah membuat, mengedit, dan menghapus tugas-tugas mereka. Fitur unggulan aplikasi ini adalah kemampuan untuk berbagi tugas dengan orang lain, memungkinkan kolaborasi yang efektif dalam tim atau antar individu. TodoKita adalah solusi ideal bagi mereka yang menginginkan cara cepat dan efisien untuk mengorganisir kegiatan pribadi maupun profesional.

## Teknologi yang Digunakan

- [Laravel](https://laravel.com/) - Framework PHP
- [React Js](https://react.dev/) - Framework JavaScript
- [MySQL](https://www.mysql.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

## Database

Proyek ini menggunakan MySQL sebagai database utama. Struktur database dapat dilihat di file `database/migrations`.

## Package yang Digunakan

- [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum) - untuk autentikasi API
- [Mailtrap](https://mailtrap.io/) - untuk testing email
- [Laravel Modules](https://github.com/nWidart/laravel-modules) - untuk modularisasi aplikasi Laravel
- [Laravel Nested Set](https://github.com/lazychaser/laravel-nestedset) - untuk mengelola struktur data hierarkis
- [Laravel Notifications](https://laravel.com/docs/11.x/notifications) - untuk mengirim notifikasi melalui berbagai channel
- [Laravel Polymorphic Relations](https://laravel.com/docs/11.x/eloquent-relationships#many-to-many-polymorphic-relations) - untuk relasi many-to-many polimorfik
- [Laravel Userstamps](https://github.com/sqits/laravel-userstamps) - untuk melacak pengguna yang membuat atau memperbarui model
- [Laravel Policies](https://laravel.com/docs/11.x/authorization#writing-policies) - untuk otorisasi berbasis kebijakan
- [ShadCn](https://ui.shadcn.com/) - untuk menggunakan tailwind versi component

## Instalasi

### Backend (Laravel)

1. Clone repositori ini
2. Masuk ke direktori backend: (contoh : `cd todo-kita/backend` )
3. Jalankan `composer install`
4. Salin `.env.example` ke `.env` dan sesuaikan konfigurasi
5. Jalankan `php artisan key:generate`
6. Jalankan migrasi database dengan `php artisan migrate`

### Frontend (React)

1. Masuk ke direktori frontend: (contoh : `cd todo-kita/frontend` )
2. Pastikan Anda telah menginstal Bun. Jika belum, ikuti panduan instalasi di [situs resmi Bun](https://bun.sh/)
3. Jalankan `bun install` untuk menginstal dependensi dari bun
4. Jalankan `npm install` untuk menginstal dependensi dari npm
5. Untuk menjalankan aplikasi dalam mode pengembangan, gunakan:

### Menjalankan Aplikasi

- Untuk menjalankan backend Laravel, gunakan: `php artisan serve`
- Untuk menjalankan frontend React, gunakan: `bun dev`

# Note : Pastikan untuk menjalankan kedua bagian aplikasi (backend dan frontend) secara bersamaan untuk fungsionalitas penuh.

## Konfigurasi Email Testing

Untuk testing email, proyek ini menggunakan Mailtrap. Konfigurasikan `.env` Anda dengan kredensial Mailtrap:

.Env Laravel

`MAIL_MAILER=smtp`
`MAIL_HOST=sandbox.smtp.mailtrap.io`
`MAIL_PORT=2525`
`MAIL_USERNAME=bbbbec3f914885`
`MAIL_PASSWORD=b76786633d4733`
`MAIL_ENCRYPTION=null`
`MAIL_FROM_ADDRESS="hello@example.com"`
`MAIL_FROM_NAME="${APP_NAME}"`

## Kontak

Fikri Nurhakim
- LinkedIn: [Fikri Nurhakim](https://www.linkedin.com/in/fikri-nurhakim-22a698253/)
- GitHub: [akufikri](https://github.com/akufikri)
