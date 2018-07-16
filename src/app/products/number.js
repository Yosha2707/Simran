
function formValidations() {
    alert("called")
    jQuery('.numbersOnly').on('keyup blur', function () { 
     this.value = this.value.replace(/[^0-9]/g, ''); 
               });           
     jQuery('.numbersOnlyfloat').on('keyup blur', function () {
     this.value = this.value.replace(/[^0-9\.]/g, '');           
     });           
      jQuery('.letterOnly').on('keyup blur', function () { 
     //var regexp = /[^a-z A-Z % @@ /.,'() & - = *]/g;               
      //this.value = this.value.replace(regexp, '');           
     });            
     jQuery('.textareaOnly').on('keyup blur', function () {               
          //var regexp = /[^a-z A-Z 0-9 % @@ /.,'() & - = *]/g;               
           //this.value = this.value.replace(regexp, '');           
         });       
         }