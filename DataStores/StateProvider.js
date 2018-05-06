StateProvider = function(){
    var userStateStore = {};
    return {
        getState: (Context) => {
            return new Promise((resolve, reject) =>{
                return resolve(userStateStore[Context.deviceProfile.id] || "default")
            }) 
        },
        setState: (Context, state) => {
            userStateStore[Context.deviceProfile.id] = state
        }
    }
}()

module.exports = StateProvider;