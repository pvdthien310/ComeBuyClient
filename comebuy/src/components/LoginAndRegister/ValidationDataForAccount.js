//Vaidate password if it's false then it's false
export default function CheckPassword(password) {
    // at least one number, one lowercase and one uppercase letter
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    return re.test(password);
  }