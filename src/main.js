

user = "doesNotExist"     
s = [0,0,0,0,0]
inBounds = (x,y,z) => (x >= y && x <= z)
function onPlayerClick(){
		s[4] = 1
}
onPlayerAttemptAltAction = () => (s[5] = 1)
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
        tmp = api.getPosition(user)
        s[0] = tmp[0]
        s[1] = tmp[2]
        s[4] = Math.abs(s[4]-0.25)-0.25
        s[5] = Math.abs(s[4]-0.25)-0.25
}
function drawCursor(){
        let m = "100011010"
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
		if(x > 124){
			x = 0
			y += 6
		}
        }
}
function displayFileNames(obj){ // [task, progress, starting val]
        if(obj[1] < 7 && filecount > obj[1] + obj[2]){  
                let m = "api.getStandardChest"
                m += `Items([${obj[1] + obj[2] + 1},0,51])`
                m = eval(m)[0]["attributes"]["customAttributes"]["pages"][0]
                m = ">" + m
                dtxt(0, obj[1]*6 + 12, m)
                obj[1]++
                return ["updateDisplay",task]
        }
        return ["waitClick",["directwaitClick"],["ptrc"]]
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
        } return task[1]
}
function waitClick(obj){
        if(s[4] == 0.5){
                return task[2]
        }
        return task[1]
}
function clearScreen(obj){
        display = []
        for(let i = 0; i < 128;i++){
                display.push([])
                for(let z = 0; z < 64; z++){
                        display[display.length - 1].push([1724,1724])
                }
        }
		
        for(let i = 0; i < 32; i++){
                api.setBlockRect([4 * i - 64, 64, 50], [4 * (i + 1) - 64, 0, 50], "White Chalk")
        }
        return task[1]
}
function executeProgram(prog, mem){
	let tmp1 = `memory = [${mem}]; ${prog} [memory,display]`
	let result = eval(tmp1)
	for(let i = 6; i < 64; i++){
		for(let j = 0; j < 128; j++){
			display[i][j][1] = result[1][i][j]
		}
	}
	return result[0]
}

osOn = false
time = 0
function tick(){
        time++
        if(osOn){
                jp()
		try{drawCursor()}catch{}
                switch(task[0]){
                        case "initmenu":
                                dtxt(0, 0, "NickOS Beta V1.20.26")
        			dtxt(0, 6, "Files: (Click to open)")
				updateDisplay()
                                task = ["displayFileNames",0,0]
                                break
                        case "displayFileNames":
                                task = displayFileNames(task)
                                break
                        case "updateDisplay":
                                task = updateDisplay()
                                break
			case "directwaitClick":
				task = ["waitClick",["directwaitClick"],["mainMenuClicked"]]
				break
                        case "waitClick":
                                task = waitClick()
                                break
			case "clearScreen":
				task = clearScreen()
				break
			case "mainMenuClicked":
				cpace = Math.floor((s[3])/6) -1
				if(inBounds(cpace, 1, filecount)){
					task = ["clearScreen",["drawFileMenu"]]
				} else {
					task = ["directWaitClick"]
				}
				break
			case "drawFileMenu":
				dtxt(0,6,"Execute file")
				dtxt(0,12,"View file")
				dtxt(0,18,"Delete file")
				dtxt(0,24,"Back")
				updateDisplay()
				task = ["menuCallBackWait"]
				break
			case "menuCallBackWait":
				task = ["waitClick",["menuCallBackWait"],["menuOptionClicked"]]
				break
			case "viewingTextRedir":
				task = ["waitClick",["viewingTextRedir"],["clearScreen",["initmenu"]]]
				break
			case "menuOptionClicked":
				cp2 = Math.floor((s[3])/6) + 1
				program = ""
				for(let i = 0; i < 47; i++){
					program += api.getStandardChestItemSlot([cpace,0,51], i)?.attributes?.customDescription ?? "";
				}
				name = api.getStandardChes\u{74}\u{49}\u{74}emSlot([cpace,0,51],0).attributes.customAttributes.pages[0]
				if(inBounds(cp2,2,5)){
					switch(cp2){
						case 2:
							dtxt(0,0,"Exit")
							task = ["execute"]
							memory = []
							break
						case 3:
							api.log("DISPLAYING")
							task = ["clearScreen",["displayFile"]]
							break
						case 4:
							break
						case 5:
							task = ["cinitmenu"]
							break
					}
				} else {
					task = ["menuCallBackWait"]
				}
				break
			case "execute":
				memory = executeProgram(program, memory)
				updateDisplay()
				if(s[2]<6 && s[4] == 0.5){
					task = ["clearScreen",["initmenu"]]
				}
				break
			case "displayFile":
				dtxt(0,0,name)
				dtxt(0,6,program)
				updateDisplay()
				task = ["viewingTextRedir"]
				break
				
                }
        }
}
