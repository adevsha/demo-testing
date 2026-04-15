# language: id
Fitur: Pemeriksaan Kesehatan Endpoint
  Sebagai konsumen API
  Saya ingin memverifikasi kesehatan layanan
  Sehingga saya tahu API berjalan

  Skenario: Endpoint kesehatan mengembalikan 200 ketika layanan eksternal tersedia
    Diketahui layanan eksternal tersedia
    Ketika saya mengirim permintaan GET ke "/health"
    Maka status respons harus 200
    Dan badan respons harus mengandung "healthy"
    Dan badan respons harus mengandung data layanan eksternal

  Skenario: Endpoint kesehatan mengembalikan 200 meskipun layanan eksternal mati
    Diketahui layanan eksternal tidak tersedia
    Ketika saya mengirim permintaan GET ke "/health"
    Maka status respons harus 200
    Dan badan respons harus mengandung "healthy"
    Dan bidang layanan eksternal harus "unavailable"
