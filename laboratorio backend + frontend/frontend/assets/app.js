
$( "#form_registro_cliente").validate({
    
    rules: {
        username_input: {
        required: true 
      },
        celular_input: {
        required: true
      },
      email_input: {
        required: true
      },
      messages: {
        username_input: {
            required: "Este campo es obligatorio.",
            minlength: "Su nombre debe tener más de 2 caracteres."
            },
        },
    },
    
    
    submitHandler: function(form, event) {
        event.preventDefault();
        $.ajax({
            //data: {"parametro1" : "valor1", "parametro2" : "valor2"},
           data:JSON.stringify({"nombre":$("#username_input").val(),"celular":$("#celular_input").val(),"email":$("#email_input").val(),"password":$("#password_input").val()}),
           type: "POST",
           dataType: "json",
           contentType: "application/json; charset=utf-8",
           url: "http://localhost:9000/crear",
         })
         .done(function( data, textStatus, jqXHR ) {
               if(data.resultado[0]!=null){
                   $("#formulario").css("display","none");
                   $("#mensaje").html("Bienvenido "+data.resultado[0].Usuario);
               }
               else 
                  $("#mensaje").html("El usuario o password no son correctos");
         })
         .fail(function(jqXHR, textStatus, errorThrown ) {
               if ( console && console.log ) {
                   console.log( "La solicitud a fallado: " +  textStatus);
               }
         });

        form.submit();
        
    },
  });

$( "#ver_clientes_boton" ).on( "click", function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:9000/clientes', // Replace with your server-side endpoint URL
        success: function(response) {
            // Handle success response
            if (response.status === 'success') {
              var dataContainer = $('#lista_clientes');
      
              // Clear the container before adding new data
              dataContainer.empty();
      
              // Loop through the data array
              response.data.forEach(function(item) {
                var username = item.nombre;
                var phone = item.celular;
                var email = item.email;
      
                // Create HTML elements to display the data
                var userDiv = $('<li>');
                userDiv.append($('<p>').text('Username: ' + username));
                userDiv.append($('<p>').text('Phone: ' + phone));
                userDiv.append($('<p>').text('Email: ' + email));
      
                // Add the userDiv to the dataContainer
                dataContainer.append(userDiv);
              });
            }
          },
          error: function(xhr, status, error) {
            // Handle error response
            console.error('Error:', error);
          }
      });
    
} );
