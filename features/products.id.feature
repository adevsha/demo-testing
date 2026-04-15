# language: id
Fitur: API CRUD Produk
  Sebagai konsumen API
  Saya ingin mengelola produk melalui REST API
  Sehingga saya dapat membuat, membaca, memperbarui, dan menghapus catatan produk

  # --- BUAT ---

  Skenario: Membuat produk baru dengan data yang valid
    Diketahui saya memiliki data produk yang valid
    Ketika saya mengirim permintaan POST ke API "/products/" dengan data produk
    Maka status respons API harus 201
    Dan badan respons API harus memiliki kunci "id"
    Dan badan respons API harus memiliki "name" sama dengan nama produk uji
    Dan badan respons API harus memiliki "price" sama dengan harga produk uji

  Skenario: Membuat produk dengan bidang wajib yang hilang mengembalikan 422
    Ketika saya mengirim permintaan POST ke API "/products/" dengan isi:
      """
      {"name": "Incomplete Product"}
      """
    Maka status respons API harus 422

  Skenario: Membuat produk dengan tipe tidak valid untuk harga mengembalikan 422
    Ketika saya mengirim permintaan POST ke API "/products/" dengan isi:
      """
      {"name": "Bad Product", "description": "test", "price": "free", "in_stock": true}
      """
    Maka status respons API harus 422

  Skenario: Membuat produk dengan harga nol
    Ketika saya mengirim permintaan POST ke API "/products/" dengan isi:
      """
      {"name": "Free Sample", "description": "A free item", "price": 0, "in_stock": true}
      """
    Maka status respons API harus 201
    Dan badan respons API harus memiliki "price" sama dengan 0

  Skenario: Membuat produk yang habis stok
    Ketika saya mengirim permintaan POST ke API "/products/" dengan isi:
      """
      {"name": "Sold Out Item", "description": "Currently unavailable", "price": 49.99, "in_stock": false}
      """
    Maka status respons API harus 201
    Dan badan respons API harus memiliki "in_stock" sama dengan false

  # --- BACA ---

  Skenario: Daftar semua produk mengembalikan sebuah array
    Ketika saya mengirim permintaan GET ke API "/products/"
    Maka status respons API harus 200
    Dan badan respons API harus berupa array

  Skenario: Daftar produk menyertakan produk yang dibuat sebelumnya
    Diketahui saya telah membuat produk uji melalui API
    Ketika saya mengirim permintaan GET ke API "/products/"
    Maka status respons API harus 200
    Dan badan respons API harus berupa array
    Dan array respons API harus mengandung item dengan "id" sama dengan id produk yang dibuat

  Skenario: Mendapatkan produk berdasarkan ID yang valid
    Diketahui saya telah membuat produk uji melalui API
    Ketika saya mengirim permintaan GET ke API untuk produk yang dibuat
    Maka status respons API harus 200
    Dan badan respons API harus memiliki "name" sama dengan nama produk uji

  Skenario: Mendapatkan produk berdasarkan ID yang tidak ada mengembalikan 404
    Ketika saya mengirim permintaan GET ke API "/products/99999"
    Maka status respons API harus 404
    Dan badan respons API harus memiliki "detail" sama dengan "Product not found"

  # --- PERBARUI ---

  Skenario: Memperbarui produk dengan data parsial
    Diketahui saya telah membuat produk uji melalui API
    Ketika saya mengirim permintaan PATCH ke API untuk produk yang dibuat dengan isi:
      """
      {"name": "Updated Product Name"}
      """
    Maka status respons API harus 200
    Dan badan respons API harus memiliki "name" sama dengan "Updated Product Name"
    Dan badan respons API harus memiliki "price" sama dengan harga produk uji

  Skenario: Memperbarui produk yang tidak ada mengembalikan 404
    Ketika saya mengirim permintaan PATCH ke API "/products/99999" dengan isi:
      """
      {"name": "Ghost Product"}
      """
    Maka status respons API harus 404
    Dan badan respons API harus memiliki "detail" sama dengan "Product not found"

  Skenario: Memperbarui hanya status stok produk
    Diketahui saya telah membuat produk uji melalui API
    Ketika saya mengirim permintaan PATCH ke API untuk produk yang dibuat dengan isi:
      """
      {"in_stock": false}
      """
    Maka status respons API harus 200
    Dan badan respons API harus memiliki "in_stock" sama dengan false
    Dan badan respons API harus memiliki "name" sama dengan nama produk uji

  # --- HAPUS ---

  Skenario: Menghapus produk yang ada
    Diketahui saya telah membuat produk uji melalui API
    Ketika saya mengirim permintaan DELETE ke API untuk produk yang dibuat
    Maka status respons API harus 204

  Skenario: Menghapus produk yang tidak ada mengembalikan 404
    Ketika saya mengirim permintaan DELETE ke API "/products/99999"
    Maka status respons API harus 404
    Dan badan respons API harus memiliki "detail" sama dengan "Product not found"

  Skenario: Menghapus produk yang sudah dihapus mengembalikan 404
    Diketahui saya telah membuat produk uji melalui API
    Dan saya telah menghapus produk yang dibuat melalui API
    Ketika saya mengirim permintaan DELETE ke API untuk produk yang dibuat
    Maka status respons API harus 404
