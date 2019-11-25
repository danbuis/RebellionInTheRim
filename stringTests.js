var methods = {
    hasLeadingOrTrailing = function(string){
        var trimmedString = string.trim(string)
        if(trimmedString === string){
            return false
        }else return true
    },

    isEmpty = function(string){
        if(string === ""){
            return true
        } else return false
    },

    onlyValidChars = function(string){
        var validChars = string.replace(/[^a-zA-Z0-9_'"]/gi, "")

        if(validChars === string){
            return true
        } else return false
    },

    validLength = function(string){
        var length = string.length
        if(length <= 20 ) return true
        else return false
    }
}

exports.data = methods