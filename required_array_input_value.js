
function save(){
//get value input by jquery map function
var arrOB  = $("select[name='obidbarang[]']").map(function(){return $(this).val();}).get();
var arrICD = $("select[name='icd[]']").map(function(){return $(this).val();}).get();
var arrjumlahtindakan = $("input[name='jumlahtindakan[]']").map(function(){return $(this).val();}).get();
var arrjumlahperhari = $("input[name='jumlahperhari[]']").map(function(){return $(this).val();}).get();
var arrselama = $("input[name='selama[]']").map(function(){return $(this).val();}).get();
var arrobpemberian = $("input[name='obpemberian[]']").map(function(){return $(this).val();}).get();
var arrobperhari = $("input[name='obperhari[]']").map(function(){return $(this).val();}).get();
var arrobsatuan = $("select[name='obsatuan[]']").map(function(){return $(this).val();}).get();
var arrobselama = $("input[name='obselama[]']").map(function(){return $(this).val();}).get();


   if(empty_array(arrICD))
   {                 
      alert('Tindakan Belum Dipilih Semua');
   }
   else if(empty_array(arrjumlahtindakan))
   {
       alert('Jumlah Tindakan Belum Diisi Semua');
   }
   else if(empty_array(arrjumlahperhari))
   {
       alert('Jumlah Per Hari Belum Diisi Semua');
   }
   else if(empty_array(arrselama))
   {
       alert('Lama Rencana Tindakan (Selama [Hari]) Belum Diisi Semua');
   }
   else if(empty_array(arrOB))
   {
       alert('Obat / BHP  Belum Dipilih Semua');
   }
   else if(empty_array(arrobpemberian))
   {
       alert('Jumlah Pemberian Belum Diisi Semua');
   }
   else if(empty_array(arrobperhari))
   {
       alert('Jumlah Pemberian Obat/BHP Per Hari Belum Diisi Semua');
   }
   else if(empty_array(arrobsatuan))
   {
       alert('Satuan Pemberian Obat Belum Dipilih Semua');
   }
   else if(empty_array(arrobselama))
   {
       alert('Lama Rencana Pemberian Obat Belum Diisi Semua');
   }
   else
   {
      submitFormInput();
   }
}

function empty_array(arrData)
{
    for(var x in arrData)
    {
        if(arrData[x] == 0)
        {
            return true;
        }
        return false;
    }
    return false;
}
