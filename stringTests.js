var stringTests = {
    hasLeadingOrTrailing : function(string){
        var trimmedString = string.trim()
        if(trimmedString.length == string.length){
            return false
        }else return true
    },

    isEmpty : function(string){
        if(string === ""){
            return true
        } else return false
    },

    onlyValidChars : function(string){
        var validChars = string.replace(/[^\sa-zA-Z0-9_'"]/gi, "")

        if(validChars === string){
            return true
        } else return false
    },

    validLength : function(string, length){
        var stringLength = string.length
        if(stringLength <= length ) return true
        else return false
    },

    checkString : function(string, length){
       // console.log("in checkString")
        var errors =[]
       // console.log(errors)
        if(!this.validLength(string, length)) errors.push("too long")
       // console.log(errors)
        if(!this.onlyValidChars(string)) errors.push("has one or more invalid characters")
        //console.log(errors)
        if(this.hasLeadingOrTrailing(string)) errors.push("cannot have leading or trailing spaces")
        //console.log(errors)
        return errors
    }
}

exports.data = stringTests