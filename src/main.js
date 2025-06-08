

user = "doesNotExist"     

inBounds = (x,y,z) => (x >= y && x <= z)
function onPlayerClick(){
		s[4] = 1
}
onPlayerAttemptAltAction = () => (s[5] = 1)

function movtrack(){
        let z = api.getPosition(user)
        // api.setPosition(user,[0,0,0])
        return z
}
function ctrack(){
        let ctmp = api.getPlayerFacingInfo(user)
        let vec = ctmp["camPos"]
        ctmp = ctmp["dir"]
        
        ctmp[0] = ctmp[0] * ((50-vec[2]) / ctmp[2]) + vec[0]
        ctmp[1] = ctmp[1] * ((50-vec[2]) / ctmp[2]) + vec[1]
        ctmp[0] = Math.round(ctmp[0] + 64)
        ctmp[1] = Math.round(64 - ctmp[1])
        if(inBounds(ctmp[0], 0, 125) && inBounds(ctmp[1],0,61)){
                return ctmp
        }
        return [0,0,0]
}
function jp(){
        let tmp = ctrack()
        s[2] = tmp[0]
        s[3] = tmp[1]
        tmp = movtrack()
        s[0] = tmp[0]
        s[1] = tmp[2]
        s[4] = Math.abs(s[4]-0.25)-0.25
        s[5] = Math.abs(s[4]-0.25)-0.25
}

function requestMemory(name){
        for(let i = 0; i < 256; i++){
                ram[active.indexOf(name)].push(0)
        }
}
function setProcess(name){
        ram.push([])
        active.push(name)
        requestMemory(name)
}
function killProcess(name){
        ram.splice(active.indexOf(name),1)
        active.splice(active.indexOf(name),1)
}

function cursorShape(){
        return "100011010"
}
function drawCursor(){
        let m = cursorShape()
        for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                        let pos = [s[7]-64+i,64-s[8]-j,50]
                        let tmp = display[s[7]+i][s[8]+j][1]
                        api.setBlock(pos,api.blockIdToBlockName(tmp))
                        pos = [s[2]+i-64,64-s[3]-j,50]
                        api.setBlock(pos,api.blockIdToBlockName(1724-1638*m[3*i+j]))
                }
        }
        s[7] = s[2]
        s[8] = s[3]
        return ["waitClick",task,["ptrc"]]
}
function dtxt(x,y,m){ 
        let r = 0
        for(let i = 0; i < m.length; i++){
                for(let dy = 0; dy < 5; dy++){
                        for(let dx = 0; dx < 3; dx++){
                                r = font[m[i]][3 * dy + dx]
                                if(r == "#"){
                                        display[x + dx][y + dy][1] = 86
                                } else {
                                        display[x + dx][y + dy][1] = 1724
                                }
                        }
                }
                x += 4
        }
        return 1
}
function displayFileNames(obj){ // [task, progress, starting val]
        if(obj[1] < 7 && filecount > obj[1] + obj[2]){  
                let m = "api.getStandardChest"
                m += `Items([${obj[1] + obj[2]},0,51])`
                m = eval(m)[0]["attributes"]["customAttributes"]["pages"][0]
                m = ">" + m
                dtxt(0, obj[1]*6 + 12, m)
                obj[1]++
                return ["updateDisplay",task]
        }
        return ["drawCursor"]
}
function updateDisplay(){
        for(let y = 0; y < 128; y++){
                for(let x = 0; x < 64; x++){
                        let val = display[y][x]
                        if(val[0] != val[1]){
                                val[0] = val[1]
                                let tmp = api.blockIdToBlockName(val[1])
                                api.setBlock([y - 64,64 - x,50],tmp)
                                display[y][x] = val
                        }
                }
        }
        return task[1]
}
function drawInitMenu(){
        dtxt(0, 0, "NickOS Alpha")
        dtxt(0, 6, "Files: (Click to open)")
}
function waitClick(obj){
        if(s[4] == 0.5){
                return task[2]
        }
        return task[1]
}
function clearScreen(obj){
        display = []
        for(let i = 0; i < 64; i++){
                display.push([])
                for(let z = 0; z < 128; z++){
                        display[display.length - 1].push([1724,1724])
                }
        }
        for(let i = 0; i < 32; i++){
                api.setBlockRect([4 * i, 64, 50], [4 * (i + 1), 0, 50], "White Chalk")
        }
        return task[1]
}
function executeProgram(prog, mem){
	let result = eval(`memory = [${mem[0]}]; display = [${mem[1]}]; keyboard = [${s}]; font = {${font}}; ${prog}; [memory,display]`)
	for(let i = 0; i < 64; i++){
		for(let j = 0; j < 128; j++){
			display[i][j][1] = result[1][i][j]
		}
	}
	return result
}

osOn = false
time = 0
function tick(){
        time++
        if(osOn){
                if(time % 2 == 0){
                	jp()
                }
                switch(task[0]){
                        case "initmenu":
                                drawInitMenu()
                                task = ["displayFileNames",0,0]
                                break
                        case "displayFileNames":
                                task = displayFileNames(task)
                                break
                        case "updateDisplay":
                                task = updateDisplay()
                                break
                        case "drawCursor":
                                task = drawCursor()
                                break
                        case "waitClick":
                                task = waitClick()
                                break
			case "ptrc":
				clearScreen()
				cpace = Math.floor((s[2])/6) - 1
				if(isInBounds(cpace, 1, filecount)){
					dtxt(0,6,"Execute file")
					dtxt(0,12,"View file")
					dtxt(0,18,"Delete file")
					dtxt(0,24,"Back")
					task = ["menuCallBackWait"
				} else {
					task = ["drawCursor"]
				}
				break
			case "menuCallBackWait":
				task = ["waitClick",["menuCallBackWait"],["menuOptionClicked"]]
				break
			case "menuOptionClicked":
				cp2 = Math.floor((s[2])/6)
				switch(cp2){
					case 0:
						task = ["executePrep"]
						break
					case 3:
						task = ["initMenu",0,0]
						break
				}
				break
			case "executePrep":
				program = ""
				for(let i = 1; i < 48; i++){
					program += api.getStandardChestItemSlot([cpace,0,50], i)?.attributes?.customDescription ?? "";
				}
				task[0] = "execute"
				memory = [[],display]
				break
			case "execute":
				memory = executeProgram(program, memory)
				display = memory[1]
				updateDisplay()
				break
				
                }
        }
}
