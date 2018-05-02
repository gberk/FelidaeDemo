StateProvider = function(){
    var userStateStore = {};
    return {
        getState: () => {
            return new Promise((resolve, reject) =>{
                return resolve("default")
            }) 
        },
        setState: (Context) => {
            
        }
    }
}()

module.exports = StateProvider;