# language: id
Fitur: Pemeriksaan Kesehatan API
  Sebagai konsumen API
  Saya ingin memeriksa kesehatan demo-rest API
  Sehingga saya tahu layanan berjalan

  Skenario: Endpoint kesehatan mengembalikan 200 dengan status sehat
    Ketika saya mengirim permintaan GET ke API "/health"
    Maka status respons API harus 200
    Dan badan respons API harus memiliki "status" sama dengan "healthy"

  Skenario: Respons endpoint kesehatan mengandung bidang yang diharapkan
    Ketika saya mengirim permintaan GET ke API "/health"
    Maka status respons API harus 200
    Dan badan respons API harus memiliki kunci "status"
