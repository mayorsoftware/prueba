function LoadCities() {
    $.ajax({
        url: "php/getData.php?q=cities",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                   for (var i = 0; i < data.length; i++) {
                    $("#selectCiudad").append('<option value=' + data[i].replace(/ /g,"_") + '>' + data[i] + '</option>');
                }
            } else {
                alert('Disculpe no hay ciudades par cargar');
                return
            }
        },
        error: function (jqXHR, status, error) {
            alert('No pudimos conectar a la base de datos. Comprueba el config.php');
            return;
        }
    })

}

function LoadTypes() {
    $.ajax({
        url: "php/getData.php?q=types",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                   for (var i = 0; i < data.length; i++) {
                    $("#selectTipo").append('<option value=' + data[i].replace(/ /g,"_") + '>' + data[i] + '</option>');
                }
            } else {
                alert('Disculpe no hay tipos que cargar');
                return
            }
        },
        error: function (jqXHR, status, error) {
            alert('No pudimos conectar a la base de datos. Comprueba el config.php');
            return;
        }
    })

}

function LoadProperties() {
    $("#saved_properties").html("");
    $.ajax({
        url: "php/getData.php?q=all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                   for (var i = 0; i < data.length; i++) {
                    LoadProperty(data[i],'properties');
                }
            } else {
                alert('Disculpe no hay propiedades para cargar');
                return
            }
        },
        error: function (jqXHR, status, error) {
            alert('No pudimos conectar a la base de datos. Comprueba el config.php');
            return;
        }
    })

}

function LoadSavedProperties() {
    $("#saved_properties").html("");
    $.ajax({
        url: "php/database.php?action=select",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                   for (var i = 0; i < data.length; i++) {
                    LoadProperty(data[i],"saved_properties");
                }
            } else {
                alert('Disculpe no hay propiedades para cargar');
                return
            }
        },
        error: function (jqXHR, status, error) {
            alert('No pudimos conectar a la base de datos. Comprueba el config.php');
            return;
        }
    })

}

function LoadProperty(property,div)
{
  //alert(property.Id)
  $("#"+div).append('<div id="property_'+property.Id+'" class="card"><div class="image"><img src="img/home.jpg" width="100%"></div><div class="text"><div onclick="save('+property.Id+')" class="fab">&#43;</div><h5>Código #'+property.Id+'</h5><br><p><b>Ciudad:</b> '+property.Ciudad+'</p><p><b>Dirección:</b> '+property.Direccion+'</p><p><b>Teléfono:</b> '+property.Telefono+'</p><p><b>Código Postal:</b> '+property.Codigo_Postal+'</p><p><b>Tipo:</b> '+property.Tipo+'</p><h5>'+property.Precio+'</h5></div></div>');
}


function search() {

    $('#properties').html("Loading...");
    var city = $( "#selectCiudad" ).val();
    var type = $( "#selectTipo" ).val();

    $.ajax({
        url: "php/search.php?city="+city+"&type="+type,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) { 

                $('#properties').html("");

                   for (var i = 0; i < data.length; i++) {
                    LoadProperty(data[i],'properties');
                }
            } else {
                alert('Disculpe no hay propiedades con ese criterio');
                return
            }
        },
        error: function (jqXHR, status, error) {
            alert('No pudimos conectar a la base de datos. Comprueba el config.php');
            return;
        }
    })

}

function save(id) {


    $.ajax({
        url: "php/database.php?action=save&id="+id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data) { 

                alert("Propiedad guardada con exito");
                LoadSavedProperties();

                  
            } else {
                alert('Esta propiedad ya ha sido guardada');
                return
            }
        },
        error: function (jqXHR, status, error) {
            alert('No pudimos conectar a la base de datos. Comprueba el config.php');
            return;
        }
    })

}


$( document ).ready(function() {

    LoadCities();
    LoadTypes();
    LoadProperties();
    LoadSavedProperties()  


  });

  $('#submitButton').click(function() {

    search()

   });

   