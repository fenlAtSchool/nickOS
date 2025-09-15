loaded = []
function require(x){
  if(!loaded.includes(x)){
    executeCFF('.pack', `System/Library/${x}.pack`)
    loaded[loaded.length] = x
  }
}
