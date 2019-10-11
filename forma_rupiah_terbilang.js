function terbilang(angka){
    var bilangan=angka;
    var kalimat="";
    var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
    var kata    = new Array('','One','Two','Three','Four','Five','Six','Seven','Eight','Nine');
    var tingkat = new Array('','Thousand','Million','Billion','Trillion');
    var panjang_bilangan = bilangan.length;
     
    /* pengujian panjang bilangan */
    if(panjang_bilangan > 15){
        kalimat = "Beyond the limits";
    }else{
        /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
        for(i = 1; i <= panjang_bilangan; i++) {
            angka[i] = bilangan.substr(-(i),1);
        }
         
        var i = 1;
        var j = 0;
         
        /* mulai proses iterasi terhadap array angka */
        while(i <= panjang_bilangan){
            subkalimat = "";
            kata1 = "";
            kata2 = "";
            kata3 = "";
             
            /* untuk Ratusan */
            if(angka[i+2] != "0"){
                if(angka[i+2] == "1"){
                    kata1 = "One Hundred";
                }else{
                    kata1 = kata[angka[i+2]] + " Hundred";
                }
            }
             
            /* untuk Puluhan atau Belasan */
            if(angka[i+1] != "0"){
                if(angka[i+1] == "1"){
                    if(angka[i] == "0"){
                        kata2 = "Ten";
                    }else if(angka[i] == "1"){
                        kata2 = "Elevent";
                    }else if(angka[i] == "2"){
                        kata2 = "Twelve";
                    }else if(angka[i] == "3"){
                        kata2 = "Thirteen";
                    }else{
                        kata2 = kata[angka[i]] + "teen";
                    }
                }else if(angka[i+1] == "2"){
                    kata2 = "Twenty";
                }else if(angka[i+1] == "3"){
                    kata2 = "Thirty";
                }else{
                    kata2 = kata[angka[i+1]] + "ty";
                }
            }
             
            /* untuk Satuan */
            if (angka[i] != "0"){
                if (angka[i+1] != "1"){
                    kata3 = kata[angka[i]];
                }
            }
             
            /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
            if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")){
                subkalimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
            }
             
            /* gabungkan variabe sub kalimat (untuk Satu blok 3 angka) ke variabel kalimat */
            kalimat = subkalimat + kalimat;
            i = i + 3;
            j = j + 1;
        }
         
        /* mengganti Satu Ribu jadi Seribu jika diperlukan */
        if ((angka[5] == "0") && (angka[6] == "0")){
            kalimat = kalimat.replace("One Thousand","One Thousand");
        }
    }
    return kalimat;
}

function format_rupiah(angka){
    var bilangan = angka;
        bilangan = bilangan.toString();
    var sisa = bilangan.length % 3;
    var rupiah  = bilangan.substr(0, sisa);
    var ribuan  = bilangan.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    return rupiah;
}
