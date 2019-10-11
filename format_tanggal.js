function convertDateOnlyNumberFormat(dateMysqlFormat){
    var dateMySqlArr = dateMysqlFormat.split('-');
    var year = dateMySqlArr[0];
    var month = dateMySqlArr[1];
    var day = dateMySqlArr[2];

    var dateFormat = day+'-'+month+'-'+year;
    return dateFormat;
}

function convertDateTextFormat(dateMysqlFormat){
    var dateMySqlArr = dateMysqlFormat.split('-');
    var year = dateMySqlArr[0];
    var month = dateMySqlArr[1];
    var day = dateMySqlArr[2];

    var dateFormat = day+' '+numberToMonthShort(month)+' '+year;
    return dateFormat;
}

function convertDateTextFormatIndonesia(dateMysqlFormat){
    var dateMySqlArr = dateMysqlFormat.split('-');
    var year = dateMySqlArr[0];
    var month = dateMySqlArr[1];
    var day = dateMySqlArr[2];

    var dateFormat = year+'-'+numberToMonthShort(month)+'-'+day;
    return dateFormat;
}

function convertDateTimeNumberFormat(dateMysqlFormat){
    var fullDateMySqlArr = dateMysqlFormat.split(' ');
    var dateArr = fullDateMySqlArr[0].split('-');
    var timeArr = fullDateMySqlArr[1].split(':');

    var year = dateArr[0];
    var month = dateArr[1];
    var day = dateArr[2];

    var dateTimeFormat = day+' '+numberToMonthShort(month)+' '+year+', '+timeArr[0]+'.'+timeArr[1];
    return dateTimeFormat;
}

function numberToMonthShort(monthNumber){
    var month = '';
    if(monthNumber == '01'){month = 'Jan';};
    if(monthNumber == '02'){month = 'Feb';};
    if(monthNumber == '03'){month = 'Mar';};
    if(monthNumber == '04'){month = 'Apr';};
    if(monthNumber == '05'){month = 'May';};
    if(monthNumber == '06'){month = 'Jun';};
    if(monthNumber == '07'){month = 'Jul';};
    if(monthNumber == '08'){month = 'Aug';};
    if(monthNumber == '09'){month = 'Sep';};
    if(monthNumber == '10'){month = 'Oct';};
    if(monthNumber == '11'){month = 'Nov';};
    if(monthNumber == '12'){month = 'Dec';};

    return month;
}

function monthToNumber(month){

    var monthNumber = '';
    if(month == 'Jan'){monthNumber = '01';};
    if(month == 'Feb'){monthNumber = '02';};
    if(month == 'Mar'){monthNumber = '03';};
    if(month == 'Apr'){monthNumber = '04';};
    if(month == 'May'){monthNumber = '05';};
    if(month == 'Jun'){monthNumber = '06';};
    if(month == 'Jul'){monthNumber = '07';};
    if(month == 'Aug'){monthNumber = '08';};
    if(month == 'Sep'){monthNumber = '09';};
    if(month == 'Oct'){monthNumber = '10';};
    if(month == 'Nov'){monthNumber = '11';};
    if(month == 'Dec'){monthNumber = '12';};
    
    return monthNumber;
}

function dateFormatting(dateReport){
    
    var day, month, year;
    var dateReportArr = dateReport.split(' ');
    day = dateReportArr[0];
    month = dateReportArr[1];
    year = dateReportArr[2];

    var monthNumber = 0;
    if(month == 'Jan'){monthNumber = '01';};
    if(month == 'Feb'){monthNumber = '02';};
    if(month == 'Mar'){monthNumber = '03';};
    if(month == 'Apr'){monthNumber = '04';};
    if(month == 'May'){monthNumber = '05';};
    if(month == 'Jun'){monthNumber = '06';};
    if(month == 'Jul'){monthNumber = '07';};
    if(month == 'Aug'){monthNumber = '08';};
    if(month == 'Sep'){monthNumber = '09';};
    if(month == 'Oct'){monthNumber = '10';};
    if(month == 'Nov'){monthNumber = '11';};
    if(month == 'Dec'){monthNumber = '12';};

    var dateFormat = day+'-'+monthNumber+'-'+year;
    return dateFormat;
}


function detail_date_format (date){
    var date_value = date;
    var hari = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var bulan = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    //value date
    var _hari= new Date(date_value).getDay();
    var tanggal = new Date(date_value).getDate();
    var _bulan= new Date(date_value).getMonth();
    var _tahun= new Date(date_value).getYear();
    var hari = hari[_hari];
    var bulan = bulan[_bulan];
    var tahun = ( _tahun < 1000) ? _tahun + 1900 : _tahun;
    var show_date = (hari +', '+ bulan +' ' + tanggal + ', ' + tahun);
    return show_date;
}

function tambah_hari(date,tambah){
    var myDate = new Date(date);
    var date = myDate.getTime()+ (86400000 * tambah);
    var date = new Date(date);

    return date;
}