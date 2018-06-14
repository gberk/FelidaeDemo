UserStore = function(){
    var userStore = {};
    return {
        get: (Context) => {
            return new Promise((resolve, reject) =>{
                return resolve(userStore[Context.deviceProfile.id] || {})
            }) 
        },
        set: (Context, data) => {
            Object.assign(userStore[Context.deviceProfile.id] || {}, data)
        },
        reset: (Context) => {
            userStore[Context.deviceProfile.id] = {}
        }
    }
}()

module.exports = UserStore;