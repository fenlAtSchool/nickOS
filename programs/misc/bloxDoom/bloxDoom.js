/*
bloxDoom Raycaster
Dependent on NickOS
*/

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
  fov = 128
  max_dist = 64
  toRad = Math.PI/180
  facing = 0
  isInit = true
}
function scan(pos,starting){
  let field = []
  for(let i = 0; i < fov; i++){
    field.push(castFromPos(pos,i+starting-(fov/2)  ))
  }
  return field
}
function tryMove(dx,dy){
  let opos = [...pos]
  pos += dx
  pos += dy
  if(getBlockIn(pos)){
    pos = opos
  }
  return 1
}
function tick(){
  let field = scan(pos,facing)
  for(let i = 0; i < 128; i++){
    display[i].forEach(v => inBounds(v-64, -field[i], field[i]) )
  }
  facing += 0.3 * (s[2] > 96 - s[2] < 32)
  if(s[0] && s[1]){
    s[0] /= Math.sqrt(2)
    s[1] /= Math.sqrt(2)
  }
  let opos = [...pos]
  tryMove(Math.sin(facing) * s[0], 0)
  tryMove(0, Math.cos(facing) * s[1])
  task = ["updateDisplay", ["execute"]]
  return 1
}

try{isInit}catch{init()}
tick()
return 1
