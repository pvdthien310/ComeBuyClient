/* eslint-disable no-useless-escape */
import validator from 'validator';

// Validate password if it's false then it's false
export function CheckPassword(password) {
    // at least one number, one lowercase and one uppercase letter
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    return re.test(password);
}

// validation username if it's true then it's wrong
export function CheckUsername(username) {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(username)) {
        return true;
    }
    return false;
}

// Validation email
export function CheckEmail(mail) {
    if (validator.isEmail(mail)) {
        return true;
    }
    return false;
}

// validation phone number
export function CheckPhoneNumber(contact) {
    const phoneno = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phoneno.test(contact)) {
        return true;
    }
    return false;
}
