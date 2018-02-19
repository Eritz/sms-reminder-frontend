// Example of format: 123-456-7890
export const phoneWithDashes = (input) => {
    let phone = input.replace(/\D/g,'');
    phone = phone.substring(0,10);
    let size = phone.length;
    if(size < 4){
        return phone;
    } else if(size < 7){
            phone = phone.substring(0,3)+'-'+phone.substring(3,6);
    }else {
            phone = phone.substring(0,3)+'-'+phone.substring(3,6)+'-'+phone.substring(6,10);
    }
    return phone; 
}

export const phoneWoDashes = (input) => {
    input = input.replace(/-/g, "");
    return input;
}