        var misDatos = {nombre:"Pedro",
                        edad:"16",
                        correo:"pedro@gmail.com"};
        var misDatosParaPut = {nombre:"Pedro Perez",
                        edad:"26",
                        correo:"pedro@gmail.com"};
        var llaveParaPedro = "-L7bUJ5MswFrCiizlR3B";


        var postAlServer=function(datos){
                $.ajax({
                    method:"POST",
                    url:"https://geekshubs-b97d3.firebaseio.com/users.json",
                    data: JSON.stringify(datos) ,
                    success:function(response){
                        console.log(response,'resServidor');
                    },
                    error:function(response){
                        console.log(response,'errorServidor');
                    }
                });
            };


        var putAlServer=function(llave, datos){
                $.ajax({
                    method:"PUT",
                    url:"https://geekshubs-b97d3.firebaseio.com/users/" + llave + ".json",
                    data: JSON.stringify(datos) ,
                    success:function(response){
                        console.log(response,'resServidor');
                    },
                    error:function(response){
                        console.log(response,'errorServidor');
                    }
                });
            };


        var getAlServer=function(){
                $.ajax({
                    method:"GET",
                    url:"https://geekshubs-b97d3.firebaseio.com/users.json",
                    success:function(response){

                        var cont = 0;
                        for(var propertyName in response) {
                            if (++cont == 5) {
                                console.log('edad desde json: ' + response[propertyName].edad);
                                actualizaEdad(response[propertyName].edad);
                            }
                        }
                        //console.log(response);
                    },
                    error:function(response){
                        console.log(response,'errorServidor');
                    }
                });
            };




        //postAlServer(misDatos);
        //putAlServer(llaveParaPedro,misDatosParaPut);
        getAlServer();


var edad = 18;
console.log('edad antes:' + edad);

function actualizaEdad(edadNueva) {
    edad = edadNueva;
    console.log('edad despues:' + edad);
}

