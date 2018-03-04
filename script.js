var url = 'https://restcountries.eu/rest/v2/name/';
$('#search').click(searchCountries);
var searches = [];

function searchCountries() {
    var countryName = $('#country-name').val();
if (!countryName.length) countryName = 'Poland';
$.ajax({
        url: url + countryName,
        method: 'GET',
        success: buildOutput
    });
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

function buildContainer(integer) {
    var $container = $('<div></div>').attr('id', integer.toString());
    var $h2 = $('<h2></h2>').attr('id', 'country');
    var $info = $('<div></div>').addClass('back').text('Background Information:');
    $container.append($h2)
              .append($info)
              .append(buildTable().insertAfter(".back"));
    return $container
}

function buildOutput(resp) {
    var result = buildContainer(searches.length);

    showCountriesList(resp);
    searches.push(result);

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