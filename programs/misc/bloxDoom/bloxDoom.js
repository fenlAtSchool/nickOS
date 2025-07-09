map = [
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,1],
  [1,0,0,1,1,1,0,1],
  [1,0,0,1,0,0,0,1],
  [1,1,0,0,0,1,0,1],
  [1,0,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1]
]

function getBlockIn(pos){
  return map[Math.floor(pos[1]/8)][Math.floor(pos[0]/8)]
}

function castFromPos(pos,degrees){
  let dist = 0
  let ac = 2
  let dx = Math.sin(toRad * degrees)
  let dy = Math.cos(toRad * degrees)
  let p = [...pos]
  while(getBlockIn(p) != 1 && dist < max_dist){
    dist += ac
    p[0] += ac * dx
    p[1] += ac * dy
  }
  
  if(dist >= max_dist){
    return -1
  }
  
  while(getBlockIn(p) == 1){
    dist -= 0.5
    p[0] -= 0.5*dx
    p[1] -= 0.5*dy
  }
  return dist
}

function init(){
  fov = 160
  max_dist = 64
  toRad = Math.PI/180
}
function scan(pos,starting){
  field = []
  for(let i = 0; i < fov; i++){
    field.push(castFromPos(pos,i+starting-(fov/2)  ))
  }
  return field
}
