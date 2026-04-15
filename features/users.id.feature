# language: id
Fitur: API CRUD Pengguna
  Sebagai konsumen API
  Saya ingin mengelola pengguna melalui REST API
  Sehingga saya dapat membuat, membaca, memperbarui, dan menghapus catatan pengguna

  # --- BUAT ---

  Skenario: Membuat pengguna baru dengan data yang valid
    Diketahui saya memiliki data pengguna yang valid
    Ketika saya mengirim permintaan POST ke API "/users/" dengan data pengguna
    Maka status respons API harus 201
    Dan badan respons API harus memiliki kunci "id"
    Dan badan respons API harus memiliki "name" sama dengan nama pengguna uji
    Dan badan respons API harus memiliki "email" sama dengan email pengguna uji

  Skenario: Membuat pengguna dengan bidang wajib yang hilang mengembalikan 422
    Ketika saya mengirim permintaan POST ke API "/users/" dengan isi:
      """
      {"email": "incomplete@example.com", "age": 25}
      """
    Maka status respons API harus 422

  Skenario: Membuat pengguna dengan tipe tidak valid untuk usia mengembalikan 422
    Ketika saya mengirim permintaan POST ke API "/users/" dengan isi:
      """
      {"name": "Test User", "email": "test@example.com", "age": "not-a-number"}
      """
    Maka status respons API harus 422

  # --- BACA ---

  Skenario: Daftar semua pengguna mengembalikan sebuah array
    Ketika saya mengirim permintaan GET ke API "/users/"
    Maka status respons API harus 200
    Dan badan respons API harus berupa array

  Skenario: Daftar pengguna menyertakan pengguna yang dibuat sebelumnya
    Diketahui saya telah membuat pengguna uji melalui API
    Ketika saya mengirim permintaan GET ke API "/users/"
    Maka status respons API harus 200
    Dan badan respons API harus berupa array
    Dan array respons API harus mengandung item dengan "id" sama dengan id pengguna yang dibuat

  Skenario: Mendapatkan pengguna berdasarkan ID yang valid
    Diketahui saya telah membuat pengguna uji melalui API
    Ketika saya mengirim permintaan GET ke API untuk pengguna yang dibuat
    Maka status respons API harus 200
    Dan badan respons API harus memiliki "name" sama dengan nama pengguna uji

  Skenario: Mendapatkan pengguna berdasarkan ID yang tidak ada mengembalikan 404
    Ketika saya mengirim permintaan GET ke API "/users/99999"
    Maka status respons API harus 404
    Dan badan respons API harus memiliki "detail" sama dengan "User not found"

  # --- PERBARUI ---

  Skenario: Memperbarui pengguna dengan data parsial
    Diketahui saya telah membuat pengguna uji melalui API
    Ketika saya mengirim permintaan PATCH ke API untuk pengguna yang dibuat dengan isi:
      """
      {"name": "Updated Name"}
      """
    Maka status respons API harus 200
    Dan badan respons API harus memiliki "name" sama dengan "Updated Name"
    Dan badan respons API harus memiliki "email" sama dengan email pengguna uji

  Skenario: Memperbarui pengguna yang tidak ada mengembalikan 404
    Ketika saya mengirim permintaan PATCH ke API "/users/99999" dengan isi:
      """
      {"name": "Ghost"}
      """
    Maka status respons API harus 404
    Dan badan respons API harus memiliki "detail" sama dengan "User not found"

  # --- HAPUS ---

  Skenario: Menghapus pengguna yang ada
    Diketahui saya telah membuat pengguna uji melalui API
    Ketika saya mengirim permintaan DELETE ke API untuk pengguna yang dibuat
    Maka status respons API harus 204

  Skenario: Menghapus pengguna yang tidak ada mengembalikan 404
    Ketika saya mengirim permintaan DELETE ke API "/users/99999"
    Maka status respons API harus 404
    Dan badan respons API harus memiliki "detail" sama dengan "User not found"

  Skenario: Menghapus pengguna yang sudah dihapus mengembalikan 404
    Diketahui saya telah membuat pengguna uji melalui API
    Dan saya telah menghapus pengguna yang dibuat melalui API
    Ketika saya mengirim permintaan DELETE ke API untuk pengguna yang dibuat
    Maka status respons API harus 404
