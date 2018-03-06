var url = 'https://restcountries.eu/rest/v2/name/';
$('#search').click(searchCountries);

// Enter press detection in the search field
$('#country-name').keypress(function(e){
    if (e.which === 13){
        searchCountries();
    }
});

var buffer = [];

function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName.length) countryName = 'Poland';
    if (!checkQuery(countryName)) {
        $.ajax({
            url: url + countryName,
            method: 'GET',
            success: buildOutput
        });
    }
}

// Helper Functions
function checkQuery(selection) {
    var result = false;
    if(buffer.length > 0){
        for(var i = 0; i < buffer.length; i++){
            buffer[i].forEach(function(item){
                if(item.name === selection) {
                    result = true;
                }
            })

        }
    }
    return result
}

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

// Main constructor function
function buildOutput(resp) {
    if (buffer.length === 4) {
        buffer.shift();
        $('.main').children().last().remove();
    }
    if (buffer.length === 0) {
        $('.main').append(buildContainer(randomString()));
    }
    else {
        $('.main').prepend(buildContainer(randomString()));
    }
    showCountriesList(resp);
    buffer.push(resp);
}

// Table building
function buildTable() {
    var headers = ['Capital', 'Population', 'Land Area', 'Language', 'Currency'];
    var items = [];
    var $table = $('<table></table>');
    for (var i=0; i < headers.length; i++) {
        items.push(buildRow(headers[i]));
    }
    $table.append(items);
    return $table
}

function buildRow(header) {
    var $row = $('<tr></tr>');
    var $theader = $('<th></th>');
    var $tdata = $('<td></td>');
    function hyphenate(header) {
        if (header === 'Land Area') {
            return 'land-area';
        }
        else {
            return header.toLowerCase();
        }
    }
    $theader.html(header);
    $tdata.attr('id', hyphenate(header));
    $row.append($theader)
        .append($tdata);
    return $row
}

// Container building
function buildContainer(id) {
    var $container = $('<div></div>').attr('id', id);
    var $country = $('<div></div>').attr('id', 'country');
    var $flag = $('<img src="#">').attr('id', 'flag');
    var $h2 = $('<h2></h2>').attr('id', 'name');
    var $info = $('<div></div>').attr('id', 'info').text('Background Information:');
    var $tableFooter = $('<div></div>').attr('id', 'table-footer');
    $country.append($flag)
             .append($h2);
    $container.append($country)
              .append($info)
              .append(buildTable())
              .append($tableFooter);
    return $container
}

// Parsing REST call, populating tables
function showCountriesList(resp) {
    var currency = $('#currency');
    var languages = $('#language');
    resp.forEach(function(item){
        $('#flag').attr('src', item.flag);
        $('#name').text(item.name);
        $('#capital').html(' : ' + item.capital);
        $('#population').html(' : ' + item.population);
        $('#land-area').html(' : ' + item.area + ' sq. km');
        currency.html(' : ' + listToString(item['currencies']));
        languages.html(' : ' + listToString(item['languages']));
    });
    
    /* Other option */
    
    /*
        function listToString(items, items2){
            return items.map(function(item) {
                return item.name;
            });
        }
        
        ES6
        private listToString = String(items => items.map(item => item.name));
    */

    function listToString(item){
        var output = [];
        for(var i = 0; i < item.length; i++ ){
            output.push(item[i].name)
        }
        return output.toString()
    }
}
