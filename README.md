# **Student-Management-App**
### ***Web application to manage student data, create (with password strenght meter), load, filter. (Angular-Material) (Front)***

<p align="center">
  <img 
    src="/mockup/app.png"
  >
</p>

# **Requisitos técnicos:**

               Aplicación en angular con datos guardados persistentemente en local storage.

               Para este ejercicio no queremos que perdáis nada de tiempo en maquetar.

               La aplicación se debe subir a vuestros perfiles de git

# **Requisitos funcionales:**

## Alta de alumnos
**Se requiere una pantalla para dar de alta alumnos. Para cada alumno se deben incluir los siguientes campos:**

              - Nombre
               > Obligatorio

              - Apellido 1
               > Obligatorio

              - Apellido 2
               > > > Opcional
	
              - Email
               > Obligatorio
               > Validación de email válido
	
              - DNI
               > Obligatorio		
               > Validación de DNI válido

              - Teléfono móvil
               > Obligatorio
               > Validación de móvil español válido
	
              - Otro teléfono
               > > > Opcional

              - País dirección
               > Desplegable con posibles países
	
              - Provincia	
               > Obligatorio
               > Desplegable si se selecciona España en país
	
              - Código postal	
               > Obligatorio		
               > Validar CP correcto (2 primeros dígitos) si se selecciona España en país
	
              - Localidad		
               > Obligatorio
	
              - Nickname
               > Obligatorio

              - Contraseña
               > Obligatorio	
               > Mínimo 6 caracteres
	
	
 **En la contraseña se debe mostrar el grado de fortaleza de la misma con la siguiente lógica:**
 **Se asignará a la contraseña un valor numérico de 1 a 10. Siendo:**


                1 y 2: Muy débil

                3 a 5: Débil

                5 a 7: Moderada

                8 y 9: Fuerte

                10: muy fuerte


 **El valor numérico se asigna de la siguiente forma:**

                Longitud:
                          De 0 a 6: 0 puntos
                          7 u 8 caracteres: 1 punto
                          De 9 a 12: 2 puntos
                          Más de 12: 3 puntos

                Uso de letras:
                          1 punto

                Uso de mayúsculas y minúsculas:
                          Uso de ambas: 2 puntos

                Uso de números:
                          1 punto
	
                Uso de símbolos		
                          2 puntos

                Combinación de máximo de puntos (máximo en longitud; uso de letras; mayúsculas y minúsculas; números; símbolos)	
                          1 punto extra

  *En caso de querer guardar una contraseña con una puntuación inferior a 8, el usuario debe confirmarlo. Este valor mínimo no debe estar hardcodeado.*


## Listado de alumnos

  Pantalla de listado de alumnos, pudiendo filtrar por nombre y apellidos, dni o email
  Poder borrar alumno desde el listado.
  Link a edición del alumno.


## Pantalla de edición del alumno

  Pantalla análoga a la de alta, en la que previamente se cargan los datos del alumno seleccionado. Se deben poder guardar los datos del alumno.

  No se debe poder mostrar la contraseña. En caso de querer actualizar la contraseña marcar de alguna forma que se va a hacer este cambio y se debe tener la lógica de contraseñas especificada en el alta.
