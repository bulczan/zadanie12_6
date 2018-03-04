var url = 'https://restcountries.eu/rest/v2/name/';

$('#search').click(searchCountries);

function searchCountries() {
    var countryName = $('#country-name').val();
if (!countryName.length) countryName = 'Poland';
$.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList
    });
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