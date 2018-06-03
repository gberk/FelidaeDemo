UserStore = function(){
    var userStore = {};
    return {
        get: (Context) => {
            return new Promise((resolve, reject) =>{
                return resolve(userStore[Context.deviceProfile.id] || {})
            }) 
        },
        set: (Context, data) => {
            userStore[Context.deviceProfile.id] = data
        }
    }
}()

module.exports = UserStore;