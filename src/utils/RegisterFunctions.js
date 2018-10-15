import _ from "underscore";

module.exports = {
    isEmailValid: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    isStringBlank: function(valueString) {
        _.mixin({
        isBlank: function(string) {
          return (_.isUndefined(string) || _.isNull(string) || string.trim().length === 0)
        }
      });
      
      return _(valueString).isBlank();
    },
    isPasswordValid: function(password){
        if (password.length < 6) {
            return false;
        } else if (password.length > 50) {
            return false;
        } else if (password.search(/\d/) == -1) {
            return false;
        } else if (password.search(/[a-zA-Z]/) == -1) {
            return false;
        } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
            return false;
        }
        
        return true;
    },
    getPasswordError: function(password){
            if (password.length < 6) {
                return("too_short");
            } else if (password.length > 50) {
                return("too_long");
            } else if (password.search(/\d/) == -1) {
                return("no_num");
            } else if (password.search(/[a-zA-Z]/) == -1) {
                return("no_letter");
            } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
                return("bad_char");
            }
            return("ok");
    },
    isPasswordCofirmationValid: function(password, passwordConfirmation){
        let result = password.localeCompare(passwordConfirmation);
        if(result === 0){
            return true;
        }

        return false;
    }
}