const inb = (x,y,z) => (x >= y && x <= z)
			
function init(){
	render_dist = 20
	fov = 160
	a = 0.5
	nr = 0.2
	time = 37  
	display = []
	camera = [0,0,0]
	light = [0,0,-1]
	for(let i = 0; i < 64; i++){
		display.push([])
		for(let j = 0; j < 128; j++){
	 		display[display.length - 1].push([0,90])
		}
	}
	light = normalize(light)
}
function vecxmatr(x,y){
	let out = []
	for(let i = 0; i < y[0].length; i++){
		sum = 0
		for(let j = 0; j < y.length; j++){
			sum += x[j] * y[j][i]
		}
		out.push(sum)
	}
	return out
}
function updateDisplay(){
	for(let i = 0; i < 64; i++){
		for(let j = 0; j < 128; j++){
			if(display[i][j][0] != display[i][j][1]){
				api.setBlock(j-64,64-i,50,api.blockIdToBlockName(display[i][j][1]))
				display[i][j][0] = display[i][j][1]
			}
		}
	}
}
function project(coord){
  let f = 1 / Math.tan(fov * Math.PI / 90)
  let q = render_dist / (render_dist - nr)
  coord.push(1)
  let ret = vecxmatr(coord,[[a*f,0,0,0],[0,f,0,0],[0,0,q,1],[0,0,0-coord[2]*nr*q,0]])
  ret[0] /= ret[3]
  ret[1] /= ret[3]
  return ret
}
function drawLine(a, b, color){
  let xd = a[0] - b[0]
  let xy = a[1] - b[1]
  let distance = Math.abs(xd) + Math.abs(xy)
  for(let i = 0; i < distance; i++){
    let x = Math.floor(b[0] + (i * xd)/distance)
    let y = Math.floor(b[1] + (i * xy)/distance)
    if(inb(x,0, 127) && inb(y,0,63)){
      display[y][x][1] = color
    }
  }
}
function dotProduct(x,y){
	return x[0] * y[0] + x[1] * y[1] + x[2] * y[2]
}
function difference(x,y){
	return [x[0]-y[0], x[1]-y[1], x[2]-y[2]]
}
function normalize(x){
	let dist = Math.sqrt(x[0] ** 2 + x[1] ** 2 + x[2] ** 2)
	return x.map(v => v/dist)
}
function fillTri(n,color){
	let x = n[0]
	let y = n[1]
	let z = n[2]
	let pos = [...x]
	let tmp = [0,0]
	let manhattanDist = Math.abs(z[0]-x[0]) + Math.abs(z[1]-x[1]) + 1
	// api.log(`x: ${x} y: ${y} z: ${z}`)
	for(let i = 0; i < manhattanDist; i++){
		tmp[0] = pos[0] + i*(z[0]-x[0])/manhattanDist
		tmp[1] = pos[1] + i*(z[1]-x[1])/manhattanDist
		drawLine(tmp,y,color)
	}
}
function scale(d){
  d[0] += 1
  \u{64}[1] += 1
  \u{64}[0] *= 64
  d[1] *= 32
  d[1] = 63 - d[1]
  return [d[0],d[1]]

}
function csc(){
	for(let i = 0; i < 64; i++){
	 for(let j = 0; j < 128; j++){
		display[i][j][1] = 90
	 }
   }
}
function getNormal(tri){
	let diff = [difference(tri[1],tri[0]),difference(tri[2],tri[0])]
	let normal = [diff[0][1] * diff[1][2] - diff[1][1] * diff[0][2], diff[0][2] * diff[1][0] - diff[0][0] * diff[1][2], diff[0][0] * diff[1][1] - diff[0][1] * diff[1][0]]
	return normalize(normal)
}
function draw3dtri(k,color){
	let n = getNormal(k)
	let tmp = difference(k[0],camera)
	if(dotProduct(n,tmp) < 0){
		k = k.map(v => scale(project(v)))
		color = getColor(dotProduct(light,n))
		fillTri(k,color)
	}
	/*
  	drawLine(k[0],k[1],color+1)
  	drawLine(k[0],k[2],color+1)
  	drawLine(k[1],k[2],color+1)
	*/
	
}
function getColor(norm){
	colors = [1724,8,97,85,84,86]
	if(inb(norm,0,1)){
		return colors[Math.floor(norm*6)]
	} else if (norm > 1){
		return 86
	} else {
		return 97
	}
}

squareMesh = [
  [[0,0,0],[0,1,0],[1,1,0]],
  [[0,0,0],[1,1,0],[1,0,0]],
  [[1,0,0],[1,1,0],[1,1,1]],
  [[1,0,0],[1,1,1],[1,0,1]],
  [[1,0,1],[1,1,1],[0,1,1]],
  [[1,0,1],[0,1,1],[0,0,1]],
  [[0,0,1],[0,1,1],[0,1,0]],
  [[0,0,1],[0,1,0],[0,0,0]],
  [[0,1,0],[0,1,1],[1,1,1]],
  [[0,1,0],[1,1,1],[1,1,0]],
  [[1,0,1],[0,0,1],[0,0,0]],
  [[1,0,1],[0,0,0],[1,0,0]]
]
init()
function t(){
 	 j = api.getStandardChestItemSlot([0,0,52+curr_page],curr_tri).attributes.customAttributes.pages
 	 j = j.map(v => JSON.parse(v))

 	 let s = Math.sin(time); let c = Math.cos(time)
 	 let hs = Math.sin(time/2); let hc = Math.cos(time/2)
 	 matrotz = [
	[c,s,0],
	[-s,c,0],
	[0,0,1]
	]
  	matrotx = [
	[0,hc,hs],
	[0,-hs,c],
	[1,0,0]
	]
  	for(let m = 0; m < 3; m++){
		j[m] = vecxmatr(j[m],matrotx)
		j[m] = vecxmatr(j[m],matrotz)
		j[m][2] += 15
	}
	draw3dtri(j,40 + curr_page)
	
}	
on = false
curr_page = 1
task = "tick"
function tick(){
  if(on){
	switch(task){
		case "tick":
			if(curr_page == objcount){
				time += 0.2;
				curr_page = 1;
				task = "updateDisplay"
			} else {
				for(let i = 0; i < 12; i++){
				t()
				curr_tri++
				if(curr_tri == 36){
					curr_tri = 0
					curr_page++
					api.log(curr_page)
					break
				}
				}
			}
			break
		case "updateDisplay":
			updateDisplay()
			task = "csc"
			break
		case "csc":
			csc()
			task = "tick"
			break
	}
  }
}
