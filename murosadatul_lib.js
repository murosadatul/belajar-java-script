var styleInput='style="height: 34px; padding:0 4px; border-radius:5px; font-size: 14px; line-height: 1.42857143; color: #555; background-color: #fff; background-image: none; border: 1px solid #ccc;"';
///--saat file js di panggil
$(function()
{ 
    $('[data-toggle="tooltip"]').tooltip() //initialize tooltip
    var set_status = $('#set_status').val();//set status message
    var set_message = $('#set_message').val();//set pesan message
    $('#generate_barcode').val('');
     ///--- jika status tidak kosong panggil fungsi notif
    if(set_status !==''){notif(set_status, set_message);}
    // jika pesan order ugd 1 maka panggil antrian_orderugd
    if(sessionStorage.pesanorderugd==='1'){setInterval('panggilOrderUGD()', 100000);}
    // jika pesan order rm 1 maka tampil notifikasi data order rm
    if(sessionStorage.pesanorderrm==='1'){setInterval('panggilOrderRM()', 100000);}
})
function startLoading(){ $("body").addClass("loading"); }
function stopLoading(){ $("body").removeClass("loading"); }
////---seting notifikasi
function notif(status, message){$.notify({icon: 'fa fa-bell fa-lg',message: '<strong>&nbsp;'+message+'</strong>'},{type: status,timer: 1000});return true;}
////---notifikasi field kosong / empty
function alert_empty(value){$.alert({icon: 'fa  fa-warning',theme: 'modern',closeIcon: true,animation: 'scale',type: 'orange',title: 'Warning!',content: 'Please provide a valid '+value+'.!'});}
////---QRCODE
function buatqrCode () 
{      
var qrcode = new QRCode(document.getElementById("qrcode"),{width : 200,height : 200});
    var elText = document.getElementById("textqrcode");
    if (!elText.value) 
    {
        alert_empty('code to generate');
    }
    else
    {
        qrcode.makeCode(elText.value);
         setTimeout(function(){
            fungsi_cetaktopdf( document.getElementById('qrcode').innerHTML ,'<style>body{  margin: auto;}</style>');
            $("#textqrcode").val('');
            $("#textqrcode").focus();

        },2); 
    }
}
$("#textqrcode").
on("keydown", function (e) {
    if (e.keyCode == 13) {
        buatqrCode();
    }
});
/////////////////END QRCODE///////////////////////
///---print to pdf
function fungsi_cetaktopdf(content,style=''){
    w = window.open();
    w.document.write(style);
    w.document.write(content);
    w.document.write('<script type="text/javascript">' + 'window.onload = function() { window.print(); window.close(); };' + '</script>');
    w.document.close();
    w.focus(); 
}
///--jika terpilih (if select) pada dropdown
function if_select(id,selected){  var selectoption=''; if(id==selected){return selectoption='selected';}else{return selectoption='';}}
function formatTgltoSql(value)//fungsi tampil tanggal, format value: dd/mm/yyyy
{   
    v = value.split("/");
    tanggal = v[2]+'-'+v[1]+'-'+v[0];
    return tanggal;
}
function ambiltanggal(value)//fungsi tampil tanggal, format value: dd/mm/yyyy
{   
    v = value.split("/");
    tanggal = v[2]+'-'+v[1]+'-'+v[0];
    return tanggal;
}
function ambiltanggal2(value)//fungsi tampil tanggal, format value: dd-mm-yyyy
{   
    tanggal = new Date(value);
    return tanggal.getFullYear()+'-'+ (tanggal.getMonth()+1) +'-'+ tanggal.getDate();
}
///////---fungsi tampil waktu
function ambilwaktu(value){tanggal = new Date(value); tanggal = tanggal.getHours()+':'+ tanggal.getMinutes(); return tanggal;}
///////---fungsi pesan gagal
function fungsiPesanGagal(){stopLoading();return notif('danger', 'Error while get or update data, Please contact developer..!');}
function pesanUndefinedLocalStorage(){return $.alert('<p style="text-align:center"><br><b>Your browser does not support Web Storage</b><br><br> Please update your browser..!</p>');}
function qlReloadPage(time){return setTimeout(function(){ window.location.reload(true); },time);}
/////---tanda penghubung
function tandaPenghubung(nilai,tanda){var x = '';if(nilai!=''){return x = tanda;}else{return x = '';}}
//////---cek jika kosong
function if_empty(nilai){var x = '';if(nilai > 0 || nilai !=null){return x = nilai;}else{return x = '';}}
//////--- Seting Warna
function qlwarna(x){var color = ['gray','green','red','maroon','blue','purple','aqua','orange','olive','yellow'] ; while ( x > 9) {x = x-9;} return  color[x];}
//// -- ambil data poli atau unit
function qlstatuswarna(status)
{ 
    var color = {selesai:'background-color:#e0f0d8;',batal:'background-color:#f0D8D8;',tunda:'background-color:#F7E59E;'};
    return  color[""+status+""];
}
function qlstatuswarnapp(status)
{ 
    var color = {2:'background-color:#e0f0d8;',3:'background-color:#f0D8D8;'} ; return  color[status];
}
    

function get_datapoli(getId,x='')
{
    var tampildt='<option value="0">Poli/Unit</option>';
    $.ajax({ 
        url: base_url+'cmasterdata/get_datapoli',
        type : "post",      
        dataType : "json",
        success: function(result) {
            $(getId).empty();
            for (i in result)
            {
                tampildt +='<option value="'+result[i].idunit+'" '+if_select(result[i].idunit,x)+'>'+result[i].namaunit+'</option>';
            }
            $(getId).html(tampildt);
        },
        error: function(result){                  
            fungsiPesanGagal();
            return false;
        }
    }); 
}
//// -- ambil data poli atau unit
function get_databangsal(getId,x='')
{
    var tampildt='<option value="0">Bangsal</option>';
    $.ajax({ 
        url: base_url+'cmasterdata/get_databangsal',
        type : "post",      
        dataType : "json",
        success: function(result) {
            $(getId).empty();
            for (i in result)
            {
                tampildt +='<option value="'+result[i].idbangsal+'" '+if_select(result[i].idbangsal,x)+'>'+result[i].namabangsal+'</option>';
            }
            $(getId).html(tampildt);
        },
        error: function(result){                  
            fungsiPesanGagal();
            return false;
        }
    }); 
}
//// -- ambil data poli atau unit
function get_dataasalobatbhp(getId,x='')
{
    //ini memang begini karena ada bugs
    //tapi entah kenapa tidak ngisi select
    $.ajax({
        url: '../cmasterdata/kosongan',
        type : "post",      
        dataType : "json",
        succcess: function(result){
            $(getId).empty();
            $("#"+getId).append('<option value="dalam" '+if_select("dalam",x)+'>Tagihan</option>');
            $("#"+getId).append('<option value="luar" '+if_select("luar",x)+'>Mandiri, Tagihan</option>');
            $("#"+getId).append('<option value="luarlunas" '+if_select("luarlunas",x)+'>Mandiri, Non Tagihan</option>');
        },
        error: function(result){
            $(getId).empty();
            $("#"+getId).append('<option value="dalam" '+if_select("dalam",x)+'>Tagihan</option>');
            $("#"+getId).append('<option value="luar" '+if_select("luar",x)+'>Mandiri, Tagihan</option>');
            $("#"+getId).append('<option value="luarlunas" '+if_select("luarlunas",x)+'>Mandiri, Non Tagihan</option>');
        }
    });
   
}
/// -- BUTTON PANE DISPLAY WHEN HOVER TABLE ROW
function button_pane()
{
    $('#table tbody tr').hover(function() {
    $(this).addClass('hover');

    var rowP = $(this).offset();
    var rowH = $(this).height();
    var offset = rowP.top + (rowH - 132);
    var left = $('td:first', $(this)).width() + 30;

    $('td:first', $(this)).prepend($('.button-pane'));
    $('.button-pane', $(this)).css({
      'margin-top': offset + 'px',
      'margin-left': left + 'px'
    }).show();

  }, function(event) {
    $(this).remove('.button-pane');
    $(this).removeClass('hover');
    $('.button-pane').hide();
  });
}

// -- format ribuan
function converToRupiahInput(name)
{
    var rupiah = $('input[name="'+name+'"]').val();
    rupiah.addEventListener('keyup', function(e){
        // tambahkan 'Rp.' pada saat form di ketik
        // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
        // rupiah.value = convertToRupiah(this.value, 'Rp. ');
        rupiah.value = convertToRupiah(this.value);
    });
}

// - Fungsi replace 4 angka dari belakang
function hapus3digitkoma(value)
{
    return value.replace(/.000/g,"");
}
function convertToRupiahBulat(angka)
{
    var rupiah = '';        
    var angkarev = bulatkanRatusan(angka).toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return rupiah.split('',rupiah.length-1).reverse().join('');
}

/* Fungsi formatRupiah */
function convertToRupiah(angka)
{
    var rupiah = '';        
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return rupiah.split('',rupiah.length-1).reverse().join('');
}

function bulatkanRatusan(angka)
{
    return Math.ceil(angka / 100) * 100;
}
// is NaN
function isnan(x) {
  if (isNaN(x)) x = 0;
  return x * 1;
}
// pembulatan angka
function bulatkan(angka)
{
    return Math.round(angka);
}
// format angka desimal 
function angkadesimal(angka,digit)
{
    return parseFloat(Math.round(angka * 100) / 100).toFixed(digit);
}
////////////////////////// -- change input number text field
function NumberInput(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    if(textbox){
        textbox.addEventListener(event, function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          }
        });
    }
  });
}
// -- hanya angka
function setInputAngka(getId){ NumberInput(document.getElementById(getId), function(value) {return /^\d*[.,]?\d*$/.test(value); });}
// Install input filters. 
// setInputFilter(document.getElementById("intTextBox"), function(value) { //Integer (both positive and negative):
//   return /^-?\d*$/.test(value); });
// setInputFilter(document.getElementById("uintTextBox"), function(value) { //Integer (positive only):
//   return /^\d*$/.test(value); });
// setInputFilter(document.getElementById("intLimitTextBox"), function(value) { //Integer (positive and <= 500):
//   return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500); });
// setInputFilter(document.getElementById("floatTextBox"), function(value) { //Floating point (use . or , as decimal separator):
//   return /^-?\d*[.,]?\d*$/.test(value); });
// setInputFilter(document.getElementById("currencyTextBox"), function(value) { //Currency (at most two decimal places):
//   return /^-?\d*[.,]?\d{0,2}$/.test(value); });
// setInputFilter(document.getElementById("hexTextBox"), function(value) { //Hexadecimal:
//   return /^[0-9a-f]*$/i.test(value); });
///////////////////////// -- end change input number text field 

// -- ambil data dokter
function tampilDataDokter(htmlTagName)
{
    var select='<option value="0">Pilih</option>';
    $.ajax({
        url:base_url+'cmasterdata/get_dokter', //load controller
        type:'POST',
        dataType:'JSON',
        success: function(result){
            htmlTagName.empty();
            for(i in result)
            {
                select = select + '<option value="'+ result[i].idpegawai +'" >' + result[i].namalengkap + '</option>';
            }
            htmlTagName.html(select);
            $('.select2').select2();
        },
        error: function(result){
            fungsiPesanGagal(); // console.log(result.responseText);
            return false;
        }
    }); 
}

// -- ambil data icd
function tampilDataIcd(htmlTagName, jenisicd)
{
    var select='<option value="0">Pilih</option>';
    $.ajax({
        url:base_url+'cpelayananranap/cariicd', //load controller
        type:'POST',
        dataType:'JSON',
        data:{ji:jenisicd},
        success: function(result){
            htmlTagName.empty();
            for(i in result)
            {
                select = select + '<option value="'+ result[i].icd +'" >' + result[i].namaicd + '</option>';
            }
            htmlTagName.html(select);
            $('.select2').select2();
        },
        error: function(result){
            fungsiPesanGagal(); // console.log(result.responseText);
            return false;
        }
    }); 
}

// -- ambil data icd
function tampilDataIcdpaket(htmlTagName, jenisicd)
{
    var select='<option value="0">Pilih</option>';
    $.ajax({
        url:base_url+'cpelayananranap/pemeriksaanranap_cariicdpaket', //load controller
        type:'POST',
        dataType:'JSON',
        data:{ji:jenisicd},
        success: function(result){
            htmlTagName.empty();
            for(i in result)
            {
                select = select + '<option value="'+ result[i].idpaketpemeriksaan +'" >' + result[i].namapaketpemeriksaan + '</option>';
            }
            htmlTagName.html(select);
            $('.select2').select2();
        },
        error: function(result){
            fungsiPesanGagal(); // console.log(result.responseText);
            return false;
        }
    }); 
}
// -- ambil data bangsal
function tampilDataBangsal(htmlTagName, selected)
{
    var select='<option value="0">Pilih</option>';
    $.ajax({
        url:base_url+'cmasterdata/get_databangsal', //load controller
        type:'POST',
        dataType:'JSON',
        success: function(result){
            htmlTagName.empty();
            for(i in result)
            {
                select = select + '<option value="'+ result[i].idbangsal +'" ' + ((result[i].idbangsal===selected)?'SELECTED':'') + '>' + result[i].namabangsal + '</option>';
            }
            htmlTagName.html(select);
            $('.select2').select2();
        },
        error: function(result){
            fungsiPesanGagal(); // console.log(result.responseText);
            return false;
        }
    }); 
}

// -- ambil data pasien rawat inap
function tampilDataRawatinap(htmlTagName, selected)
{
    var select='<option value="0">Pilih</option>';
    $.ajax({
        url:base_url+'cpelayananranap/carirawatinap', //load controller
        type:'POST',
        dataType:'JSON',
        success: function(result){
            htmlTagName.empty();
            for(i in result)
            {
                select = select + '<option value="'+ result[i].idinap +'" ' + ((result[i].idinap===selected)?'SELECTED':'') + '>' + result[i].datainap + '</option>';
            }
            htmlTagName.html(select);
            $('.select2').select2();
        },
        error: function(result){
            fungsiPesanGagal(); // console.log(result.responseText);
            return false;
        }
    }); 
}

// -- ambil data jadwal poli
function tampilDataPoliklinik(htmlTagName,date)
{
    var select='<option value="0">Pilih</option>';
    $.ajax({
        url:base_url+'cpelayanan/caripoliklinik', //load controller
        type:'POST',
        dataType:'JSON',
        data:{date:date},
        success: function(result){
            htmlTagName.empty();
            for(i in result)
            {
                select = select + '<option value="'+ result[i].idjadwal +'" >' + result[i].namaunit +' '+ result[i].namadokter +' (' +result[i].tanggal+')</option>';
            }
            htmlTagName.html(select);
            $('.select2').select2();
        },
        error: function(result){
            fungsiPesanGagal(); // console.log(result.responseText);
            return false;
        }
    }); 
}
// -- ubah format tanggal di js dari 20/12/2019  >>> 2019-12-20
function tglubah_format1(value)
{
    var tgl = value.substr(6), tgl2= value.substr(3,2), tgl3 = value.substr(0,2);
    return tgl+'-'+tgl2+'-'+tgl3;
}
function is_null(value){ return is_undefined(value); }
function is_empty(value){ return is_undefined(value); }
function is_undefined(value){ return (value == undefined) || (value == '') || (value == null) || (value == 'null'); }
function if_null(value, alternative=''){ return if_undefined(value, alternative); }
function if_empty(value, alternative=''){ return if_undefined(value, alternative); }
function if_undefined(value, alternative=''){if(is_undefined(value)){return alternative;}else{return value;}}
function startLoading(){ $("body").addClass("loading"); }
function stopLoading(){ $("body").removeClass("loading"); }

function fungsi_tampilloket(selected) //panggil fungsi tampil loket
{
    var select='';
    $.ajax({
        url:base_url+'cadmission/masterjadwal_cariloket',
        type:'POST',
        dataType:'JSON',
        success: function(result){
            $('select[name="loket"]').empty();
            for(i in result)
            {
                select = select + '<option '+if_select(result[i].idloket,selected)+' value="'+ result[i].idloket +'" >'+ result[i].namaloket +'</option>';
            }
            $('select[name="loket"]').html('<option value="0">Pilih</option>' + select + '</select>');
            
            $('.select2').select2();
        },
        error: function(result){
            console.log(result);
        }

    }); 
}


function fungsi_tampiljadwalgrup(selected) //panggil fungsi tampil loket
{
    var select='';
    $.ajax({
        url:base_url+'cadmission/masterjadwal_carijadwalgrup',
        type:'POST',
        dataType:'JSON',
        success: function(result){
            $('select[name="jadwalgrup"]').empty();
            for(i in result)
            {
                select = select + '<option '+if_select(result[i].idjadwalgrup,selected)+' value="'+ result[i].idjadwalgrup +'" >'+ result[i].namagrup +'</option>';
            }
            $('select[name="jadwalgrup"]').html('<option value="0">Tidak Ada Grup</option>' + select + '</select>');
            
            $('.select2').select2();
        },
        error: function(result){
            console.log(result);
        }

    }); 
}

function window_open(url)
{
   return window.open(base_url+url);
}
function buatQrPasien(data)
{
    var code = new QRCode(document.getElementById("qrcode"),{width : 88,height : 88});
    $.ajax({
        url:base_url+"cadmission/getdt_kartupasien",
        data:{id:data},
        dataType:"JSON",
        type:"POST",
        success:function(result){
            code.makeCode(result['norm']);
            setTimeout(function(){
            var qrPasien = document.getElementById('qrcode').innerHTML;
            var cetak = '<div style="position:relative;text-align:left;height:5,350cm;widht:9,500cm">'//
            +'<img style="position:absolute;left:0;top:0;" >'// /src="'+base_url+'/assets/images/krtpasien.svg"
            +'<br><br>'
            +'<table width="50%" padding="0" style="z-index:100; margin-top:20px; position:absolute;margin-top:3px;margin-left:10px;font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;color: #333333;">'
            +'<tr><td width="20%;" >'+qrPasien+'</td><td colspan="3" align="left"><div style="width:100%; padding-left:5px;font-size:13px;" ><b>'+result['namalengkap']+'</b><br><span style="font-size:11.7px;"><b>'+result['tanggallahir']+'</b></span><br><span style="font-size:11px;">'+result['jeniskelamin']+'</span></div></td></tr>'
            +'<tr><td width="20%;" align="center"><b>'+result['norm']+'</b></td><td></td><td></td></tr>'
            +'</table></div>';
            fungsi_cetaktopdf(cetak,'<style>/*@page {size:9cm;margin:0.1cm;}*/</style>');
            },2);
            hitungcetakkartu_berobat(result['norm']);//fungsi hitung cetak kartu pasien
            window.location.reload(true);
        }, 
        error:function(){

        }
    });
}
function hitungcetakkartu_berobat(norm)
{
    $.ajax({
        url:base_url+"cadmission/hitungcetakkartu_berobat",
        data:{id:norm},
        dataType:"JSON",
        type:"POST",
        success:function(result){
            
        }, 
        error:function(){

        }
    });
}
function qlbulan(x)
{
    var hasil = x-1;
    var dt = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    return dt[hasil];
}
// explode dengan mengambil array tertentu
function explode_getdt(str,split,getnoarray='')
{
    var myStr = str;
    var strArray = myStr.split(split);
    var result ='';
    result = strArray[getnoarray];
    return result;
}
function split_to_array(data)
{
    return data.split(',');
}

// explode dengan mengganti tanda
function explode_replace(str,split,replace='')
{
    var myStr = str;
    var split = ((str==='')?'':split);
    var strArray = myStr.split(split);
    var result ='';
    for(var i = 0; i < strArray.length; i++){ result+= replace + strArray[i];}
    return result;
}
// ambil usia
function ambilusia(date1, date2)
{
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    var datediff = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    var tahun = parseInt(datediff/360);
    // var bulan = parseInt(tahun%360);
    return tahun+' tahun ';
}
// buat antrian farmasi
function farmasi_buatantrian(value)
{
    if(value!='')
    {
        $.ajax({
            url:base_url+"cantrian/farmasi_buatantrian",
            type:"POST",
            dataType:"JSON",
            data:{norm:value},
            success: function(result){
                if(result.status=='danger'){notif(result.status,result.message);return;}
                var cetak = '<div style="width:6cm;float: none;padding-left:4px;"><img style="opacity:0.5;filter:alpha(opacity=70);width:6cm" src="'+base_url+'/assets/images/background.svg" />\n\
                      <table border="0" style="width:6cm;font-size:small;font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;color: #333333;">'+
                      '<tr><td><b>'+result.loket['namaloket']+' </b></td></tr>'+
                      '<tr><td><span style="padding-left:25px;font-size:80px;margin:0; text-align:center;"">'+ result.no +'</span></td></tr>'+
                      '<tr><td><span>Klinik [ '+ result.datapasien['namaunit'] +' ]</span></td></tr>'+
                      '<tr><td><span>'+ result.datapasien['norm'] +'</span></td></tr>'+
                      '<tr><td><span>'+ result.datapasien['namalengkap'] +'</span></td></tr>'+
                      '<tr><td><div>'+ result.datapasien['alamat'] +'</td></tr>';
                fungsi_cetaktopdf(cetak,'<style>@page {size:7.6cm 100%;margin:0.1cm;}</style>');
            },
            error:function(result){
                fungsiPesanGagal();
                return false;
            }
        });
    }
}
// fungsi panggil antrian order ugd
function panggilOrderUGD()
{
    $.ajax({
        url:base_url+"cantrian_1/panggil_antrianorderugd",
        type:"POST",
        dataType:"JSON",
        success: function(result){
            var dt = '', antri=0;
            for(x in result)
            {
                antri += parseInt(result[x].antri);
                dt+= '<div>Loket '+result[x].namaloket+' antri '+result[x].antri+' total '+result[x].antriandiambil+' </div>'; 
            }
            if(antri!==0){
                $('#infopanggilan').empty();$('#infopanggilan').html('<audio  src="'+base_url+'assets/departure.mp3" autoplay></audio>');
                notif('info',dt);
            }
            // setInterval($('#infopanggilan').empty(), 5000);
        },
        error:function(result){
            fungsiPesanGagal();
            return false;
        }
    })
}
// panggil order rm
function panggilOrderRM()
{
    var tglawal = new Date(), tglakhir = new Date();
    $.ajax({
        type: "POST",
        url: base_url+"cadmission/loaddtarusrekamedis",
        dataType: "JSON",
        data : {tgl1:ambiltanggal(tanggaljs()),tgl2:ambiltanggal(tanggaljs()), status:'2' },
        success: function(result) {
            var no=0, data='';
            console.log(result);
            for(x in result)
            {
                no++;
            }
            data+= no+' Berkas RM dalam status order..! '; 
            if(no!==0){
                $('#infopanggilan').empty();$('#infopanggilan').html('<audio  src="'+base_url+'assets/departure.mp3" autoplay></audio>');
                notif('info',data);
            }
            // setInterval($('#infopanggilan').empty(), 5000);
        },
        error: function(result) {
            fungsiPesanGagal();
            return false;
        }
  });
}
function waktujs()
{
    var clientTime = new Date();
    //buat object date dengan menghitung selisih waktu client dan server
    var time = new Date(clientTime.getTime());
    //ambil nilai jam
    var sh = time.getHours().toString();
    //ambil nilai menit
    var sm = time.getMinutes().toString();
    //ambil nilai detik
    var ss = time.getSeconds().toString();
    //tampilkan jam:menit:detik dengan menambahkan angka 0 jika angkanya cuma satu digit (0-9)
    var clock = (sh.length==1?"0"+sh:sh) + ":" + (sm.length==1?"0"+sm:sm) + ":" + (ss.length==1?"0"+ss:ss);
   
}
function tanggaljs()
{
    var clientTime = new Date();
    var tanggal = clientTime.getDate() + '/' + parseInt(clientTime.getMonth()+1) +'/' + clientTime.getFullYear();
    return tanggal;
   
}
function ql_identitas(nama)
{
    var result = nama.toLowerCase();
    var left = result.substr(0, 3);
    var right = result.substr(-3);
    if(left=='an ' || left=='nn ' || left=='ny ' || left=='sdr ' || left=='tn ') { result = result.replace(left,''); }
    if(right==' an' || right==' nn' || right==' ny' || right==' sdr' || right==' tn') { result = result.replace(right,''); }
    // if(right==' an' || right==' nn' || right==' ny' || right==',sdr' || right==',tn' || ' an' || right==',nn' || right==',ny' || right==',sdr' || right==',tn') { result =  result.replace(right,'');}
    result = result;
    return result.toLocaleUpperCase();
}
function toCamelCase(str)
{
    var arr = str.toLowerCase().split(' ');
    var words = arr.filter(v=>v!='');
    words.forEach((w, i)=>{
        words[i] = w.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
    });
    return words.join(' ');
}
function toSubstringRight(string,delimiter)
{
    var str = string.substring(parseInt(string.indexOf(delimiter))+1,string.length);
    return str;
}
// mahmud, clear
function tampilpilihloket(selectId,idstasiun)
{
    $.ajax({
        type: "POST",
        url: base_url+"cmasterdata/tampil_loketbystasiun",
        dataType: "JSON",
        data : {stasiun:idstasiun},
        success: function(result) {
            var dtloket = '';
            for(x in result)
            {
                dtloket+='<option value="'+result[x].idloket+'">'+result[x].namaloket+'</option>';
            }
            selectId.empty();
            selectId.html(dtloket);
        },
        error: function(result) {
            fungsiPesanGagal();
            return false;
        }
    });
}
function getAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("menuBacktoTop").style.display = "block";
  } else {
    document.getElementById("menuBacktoTop").style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//mahmud, clear :: verifikasi pasien
function verifikasi_pendaftaran(value='')
{
    if(!value=='')
    {
        verifpendaftaran(value);
    }
    else
    {
        notif('danger','No.Identitas harus diisi..!');
        $('#noidentitas').focus();
        $('#noidentitas').css('background-color','#ffedeb');
    }
}

function verifpendaftaran($norm)
{
    $.ajax({
        type: "POST",
        url: base_url+"cantrian/cek_verifdaftarperiksa",
        dataType: "JSON",
        data : {rm:norm},
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            fungsiPesanGagal();
            return false;
        }
    });
}
function ql_replacebr(str)
{
    if(str!==''){

    // var str = ;
    var regex = /<br\s*[\/]?>/gi;
    return str.replace(regex, "");
    }
}
function includejs(namafile)
{
    var data = document.createElement('script');
    data.src = base_url+namafile;
    return document.head.appendChild(data);
}
function tooltip(title){return 'data-toggle="tooltip" data-original-title="'+title+'"';}
function cetakEtiket(result, value)
{
      var cetak = '<div style="width:5.5cm;height:5cm;border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;float: center;text-align:center;"><img style="width:4cm" src="'+base_url+'assets/images/headerkuitansismall.jpg" />\n\
                    <table border="0" style="font-size:small;text-align:center;float:center;font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;color: #333333;">';
      cetak += "<tr style='margin-bottom:2px;font-size:10.8px;'><td colspan='4' align='left'><b>Apoteker : Nurun Ni'mah B,.S. Farm,.Apt.</b></td></tr>";
      cetak += "<tr style='font-size:8px;'><td colspan='4'>=============================================</td></tr>";
      cetak += "<tr style='font-size:10px;solid #000;'><td colspan='2' align='left'>"+result['norm']+"</td><td align='right'>Tgl :"+result['tglperiksa']+"</td><td></td></tr>";
      cetak += "<tr style='font-size:11px;'><td colspan='4' align='left'>"+toCamelCase(result['namalengkap'])+"<br></td></tr>";
      cetak += "<tr style='font-size:8px;'><td colspan='4'>=============================================</td></tr>";
      if(value!==''){
      cetak += "<tr style='font-size:12px;'><td colspan='4'>"+ ((result['grup']=='0')? result['namaobat'] : '') +"</td></tr>";
      cetak += "<tr style='font-size:14.5px;'><td colspan='4'><b>"+result['aturanpakai']+"</b></td></tr>";
      cetak += "<tr style='font-size:12px;'><td colspan='4'>"+((result['penggunaan']!=='')?result['penggunaan']+' Makan':'')+"</td></tr>";
      }else{
          cetak += "<tr style='font-size:12px;'><td colspan='4'>"+ $('textarea[name="aturanpakai"]').val() +"</td></tr>";
      }
      cetak +='</table></div><div style="width:5.5cm;height:1cm;border-right:1px solid #000;border-left:1px solid #000;border-bottom:1px solid #000; float: center;text-align:center;"><table style="font-size:small;text-align:center;float:center;font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;color: #333333;">';
      cetak += "<tr style='font-size:12px;'><td style='padding-left:30px;'>Pagi / Siang / Sore / Malam</td></tr>";
      cetak += "<tr style='font-size:12px;'><td style='padding-left:30px;'>Semoga Lekas Sembuh</td></tr>";
      cetak += '</table></div>';
      fungsi_cetaktopdf(cetak,'<style>@page {size:6cm 7cm;margin:0.1cm;}</style>');
}

function periksa_cetakresep(grupresep,obat, fontstyle='')
{
    var cetakresep='';
    for(x in obat){
        var resep = obat[x];
        totaldiresepkan = (resep.kekuatanperiksa/resep.kekuatan) * resep.jumlahdiresepkan;
        ((resep.grup==0 || grup!==resep.grup)? no=1 : no +=1  );
        cetakresep +=  "<tr "+((fontstyle==='')?"style='font-size:10px;'":'')+"><td colspan='2'>"+((resep.grup==0 || grup!==resep.grup)?'R/':'&nbsp;&nbsp;&nbsp;')+"  "+resep.namabarang+ ', jumlah: ' +((resep.jumlahRacikan!=null)? (totaldiresepkan/resep.jumlahRacikan).toFixed(3) : totaldiresepkan ) + ' '+ ((resep.grup==='0')?((resep.pemakaian===null)?'': resep.pemakaian ):'') +" </td></tr>";
        if (resep.grup==0)
        {
            cetakresep +="<tr "+((fontstyle==='')?"style='font-size:10px;'":'')+"><td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;"+((resep.signa===null)?'':resep.signa)+"</td></tr>";
        }
        for(i in grupresep)
        {
            if(resep.grup!=0 && grupresep[i].jumlahgrup==no && resep.grup==grupresep[i].grup )
            {
                cetakresep +="<tr "+((fontstyle==='')?"style='font-size:10px;'":'')+"><td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;<i>"+resep.kemasan+" dtd no "+resep.jumlahRacikan+"</i></td></tr>";
                cetakresep +="<tr "+((fontstyle==='')?"style='font-size:10px;'":'')+"><td colspan='2'>&nbsp;&nbsp;&nbsp;&nbsp;"+((resep.signa===null)?'':resep.signa)+"</td></tr>";
            }
        }
        var grup = resep.grup;
    }

    return cetakresep;
}
// function ql_carapulang(no)
// {
//     var dt = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
//     return dt[hasil];
// }
// // buat antrian
// function antrianBuatAntrian(value)
// {
//     $.ajax({
//         data:{norm:value},
//         dataType:"JSON",
//         type:"POST",
//         url:base_url+"cantrian_1/create_antrianfarmasi",
//         success:function(result){
//             notif(result.status,result.message);
//             var cetak = '<div style="width:4cm;float: none;padding-left:4px;"><img style="opacity:0.5;filter:alpha(opacity=70);width:4cm" src="'+base_url+'/assets/images/background.svg" />\n\
//                           <table border="0" style="width:6cm;font-size:small;font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;color: #333333;">'+
//                               '<tr><td><b>Antrian  Farmasi & Kasir</b></td></tr>'+
//                               '<tr><td><span style="padding-left:25px;font-size:60px;margin:0; text-align:center;"">'+ result.noantrian +'</span></td></tr>';
//                         fungsi_cetaktopdf(cetak,'<style>@page {size:7.6cm 100%;margin:0.2cm;}</style>');
                        
//         },
//         error:function(result){

//         }
//     })
// }

