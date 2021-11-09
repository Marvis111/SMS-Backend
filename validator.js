const ValidateForm = body =>{
    const formState = {success:false,error:[],errNo:0};
    for(let FieldName in body){
       switch (FieldName) {
           case 'Email':
            formState.error.push({
                FieldName,
                err: body[FieldName] ===''?"Email is required." :""
            })
               break;
            case 'Password':
                formState.error.push({
                    FieldName,
                    err: body[FieldName] ===''?"Password is required." :""
                })
                break;
            case 'Category':
                 formState.error.push({
                        FieldName,
                        err: body[FieldName] ===''?"User category is required." :""
                    })
                 break;
           default:
               break;
       }
  }
  formState.error.forEach(input =>{
    if(input.err !== ""){
          formState.errNo += 1;
    }
})
if(formState.errNo == 0){
    formState.success = true
}
return formState;

}

  module.exports = ValidateForm;

  