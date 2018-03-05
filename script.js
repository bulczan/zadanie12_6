var url = 'https://restcountries.eu/rest/v2/name/';
$('#search').click(searchCountries);
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

function buildTable() {
    var headers = ['Capital', 'Population', 'Land', 'Language', 'Currency'];
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
    $theader.html(header);
    $tdata.attr('id', header.toLowerCase());
    $row.append($theader)
        .append($tdata);
    return $row
}

function buildContainer(id) {
    var $container = $('<div></div>').attr('id', id);
    var $h2 = $('<h2></h2>').attr('id', 'country');
    var $info = $('<div></div>').attr('id', 'info').text('Background Information:');
    $container.append($h2)
              .append($info)
              .append(buildTable());
    return $container
}

function showCountriesList(resp) {
    var currency = $('#currency');
    var languages = $('#language');
    resp.forEach(function(item){
        $('#country').text(item.name);
        $('#capital').html(item.capital);
        $('#population').html(item.population);
        $('#land').html(item.area + ' sq. km');
        currency.html(listToString(item['currencies']));
        languages.html(listToString(item['languages']));
    });

    function listToString(item){
        var output = [];
        for(var i = 0; i < item.length; i++ ){
            output.push(item[i].name)
        }
        return output.toString()
    }
}