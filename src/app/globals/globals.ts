export var successMessage = "";
export var errorMessage = "";
export var UserName = "";
export var Role = "";

export function setSuccess(newValue: string) {
    successMessage = newValue;
}
export function getSuccess(){
    return this.successMessage;
}

export function setError(newValue: string) {
    errorMessage = newValue;
}
export function getError(){
    return this.errorMessage;
}

export function setUserName(newValue: string) {
    UserName = newValue;
}
function getUserName(){
    return this.UserName;
}

export function setRole(newValue: string) {
    Role = newValue;
}
function getRole(){
    return this.Role;
}