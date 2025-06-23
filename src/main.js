

user = "doesNotExist"     
s = [0,0,0,0,0]
inBounds = (x,y,z) => (x >= y && x <= z)
function onPlayerClick(id){
	let item = api.getHeldItem(id)
	if(item != null){
		if(item.name == "Spawn Block (Gray)" && item.attributes.customDescription == "NickOS Remote"){
			if(osOn){
				palette[0] = 86
				task = ["clearScreen",["shut"],0]
			} else {
				OSboot()
				user = id
			}
			return
		} 
	}
	if(osOn){
		s[4] = 1
	}
}
function onPlayerAttemptAltAction(id){
	if(user == id && osOn){
		s[5] == 1
	}
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
                        api.setBlock(pos,api.blockIdToBlockName(palette[m[3*i+j]]))
                }
        }
        s[7] = s[2]
        s[8] = s[3]
}
function OSboot(){
        active = []
        ram = []
        s = [0,0,0,0,0,0,0,0,0]
        display = [] //sulfrox code format used
        filecount = parseInt(api.getStandardChes\u{74}\u{49}\u{74}emSlot([0,0,51],0)["attributes"]["customAttributes"]["pages"][0])
		palette = [144,86]
        for(let i = 0; i < 128; i++){
                display.push([])
                for(let z = 0; z < 64; z++){
                        display[display.length - 1].push([palette[0],palette[0]])
                }
        }
        task = ["initmenu"]
        loadFont()
		for(let i = 0; i < 32; i++){
                api.setBlockRect([4 * i - 64, 64, 50], [4 * (i + 1) - 65, 0, 50], api.blockIdToBlockName(palette[0]))
        }
	curr_page = 0
	parentFolder = [0,0,51]
        api.log("osSuccesfullyBooted")
	osOn = true
}
function loadFont(){

font = {
"A":"#### ##### ## #",
"B":"## # ### # ### ",
"C":"####  #  #  ###",
"D":"## # ## ## ### ",
"E":"####  ####  ###",
"F":"####  ####  #  ",
"G":"####  # ## ####",
"H":"# ## ##### ## #",
"I":"### #  #  # ###",
"J":"  #  #  ## ####",
"K":"# ## ### # ## #",
"L":"#  #  #  #  ###",
"M":"########## ## #",
"N":"#### ## ## ## #",
"O":"#### ## ## ####",
"P":"#### #####  #  ",
"Q":"#### ## ## ### ",
"R":"#### ## ### # #",
"S":"####   #   ####",
"T":"### #  #  #  # ",
"U":"# ## ## ## ####",
"V":"# ## ## ### #  ",
"W":"# ## ## #######",
"X":"# ## # # # ## #",
"Y":"# ## ## # #  # ",
"Z":"###  # # #  ###",
"a":"______ ### # ##",
"b":"#  #  #### ####",
"c":"______####  ###",
"d":"  #  ##### ####",
"e":"_______#_#_###_",
"f":"  # # ### #  # ",
"g":"____#_#_#_####_",
"h":"#  #  #### ## #",
"i":"___ # ___ #  # ",
"j":"  #___  #  ####",
"k":"#  #  # ### # #",
"l":"  #  #  #  # # ",
"m":"______####### #",
"n":"______#### ## #",
"o":"______#### ####",
"p":"___#### #####  ",
"q":"___#### ####  #",
"r":"______####  #  ",
"s":"______ ## # ## ",
"t":"___ # ### #  # ",
"u":"______# ## ####",
"v":"______# ## # # ",
"w":"______# #######",
"x":"______# # # # #",
"y":"______#_#_#_#__",
"z":"______##  #  ##",
"0":"#### ## ## ####",
"1":"##  #  #  # ###",
"2":"###  #####  ###",
"3":"###  ####  ####",
"4":"# ## ####  #  #",
"5":"####  ###  ####",
"6":"####  #### ####",
"7":"###  #  #  #  #",
"8":"#### ##### ####",
"9":"#### ####  #  #",
"-":"______###______",
"=":"___###___###___",
"_":"____________###",
"+":"___ # ### # ___",
"*":"___# # # # #___",
"/":"__#_#__#__#_#__",
" ":"               ",
".":"_____________#_",
"!":"_#__#__#_____#_",
"?":"##___#_#_____#_",
">":"______##___###_",
"<":"_______###___##",
":":"____#_____#____",
'"':"#_##_#_________",
"'":"_#__#_#________",
"&":"_#_#___#_#_###_",
",":"__________#_#__",
"^":"_#_#_##_#______",
"|":"_#__#__#__#__#_",
"full":"###############",
"blank":"_______________",
"(":"_#_#__#__#___#_",
";":"____#_____#_#__",
")":"_#___#__#__#_#_",
"[":"##_#__#__#__##_",
"]":"_##__#__#__#_##",
"%":"#____#_#_#____#",
"*":"#_#_#_#_#______",
"{":"_##_#_##__#__##",
"}":"##__#__##_#_##_"
}


}
function dtxt(x,y,m){ 
        let r = 0
        for(let i = 0; i < m.length; i++){
                for(let dy = 0; dy < 5; dy++){
                        for(let dx = 0; dx < 3; dx++){
                                r = font[m[i]][3 * dy + dx]
                                if(r == "#"){
                                        display[x + dx][y + dy][1] = palette[1]
                                } else {
                                        display[x + dx][y + dy][1] = palette[0]
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
function displayFolderSons(obj){ // [task, progress, starting val]
        if(obj[1] < 7 && obj[1] + obj[2] < 46){  
                let m = api.getStandardChestItemSlot(parentFolder.at(-1), obj[1]+obj[2]+2).attributes.customDescription
		m = api.getStandardChestItemSlot([0,0,parseInt(m)], 0).attributes.customDescription
		m += api.getStandardChestItemSlot([0,0,parseInt(m)], 1).attributes.customDescription
                m = ">" + m
                dtxt(0, obj[1]*6 + 18, m)
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
        for(let i = task[2]; i < 128;i++){
                display.push([])
                for(let z = 0; z < 64; z++){
                        display[i][z] = [palette[0],palette[0]]
                }
		api.setBlockRect([i-64,64,50],[i-64,0,50],api.blockIdToBlockName(palette[0]))
		task[2] = i
        }
        return task[1]
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
                                dtxt(0, 0, "NickOS Beta V1.29.25")
        			dtxt(0, 6, "Files: (Click to open)")
				dtxt(0, 12, "Back")
				dtxt(24,12, "Next")
				dtxt(88,12, "Dark Mode")
				updateDisplay()
                                task = ["displayFolderSons",0,curr_page]
                                break
                        case "displayFolderSons":
                                task = displayFolderSons(task)
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
			case "shut":
				osOn = false
				break
			case "mainMenuClicked":
				cpace = Math.floor((s[3])/6) - 2
				let f = api.getStandardChestItemSlot(parentFolder.at(-1), cpace+1).attributes??.customDescription??
				if(f == "null"){
					break
				}
				f = parseInt(f)
				f = api.getStandardChestItems([0,0,f])
				if(f[1].attributes.customDescription == ".fol"){
					parentFolder.push(f[0].attributes.customDescription)
					curr_page = 0
					task = ["initmenu"]
					break
				}
				if(inBounds(s[3],12,18)){
					if(inBounds(s[2],0,16)){
						curr_page -= 6
						task = ["clearScreen",["initmenu"],0]
					}
					if(inBounds(s[2],24,40)){
						curr_page += 6
						task = ["clearScreen",["initmenu"],0]
					}
					if(inBounds(s[2],88,124)){
						tmp = palette[0]
						palette[0] = palette[1]
						palette[1] = tmp
						task = ["clearScreen",["initmenu"],0]
					}
				}
				break
			case "drawFileMenu":
				name = api.getStandardChes\u{74}\u{49}\u{74}emSlot([cpace,0,51],0).attributes.customAttributes.pages[0]
				dtxt(0,0,`File: ${name}`)
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
				if(s[4] == 0.5 && inBounds(s[3],6,12)){
					if(inBounds(s[2],0,16)){
						task[1] -= 256
						task[2] -= 256
						task[0] = "displayFile"
						task = ["clearScreen",task,0]
					}
					if(inBounds(s[2],24,40)){
						task[1] += 256
						task[2] += 256
						task[0] = "displayFile"
						task = ["clearScreen",task,0]
					}
					if(inBounds(s[2],48,64)){
						task = ["clearScreen",["drawFileMenu"],0]
					}
				}
				break
			case "menuOptionClicked":
				cp2 = Math.floor((s[3])/6) + 1
				program = ""
				for(let i = 2; i < 48; i++){
					program += api.getStandardChestItemSlot([cpace,0,51], i)?.attributes?.customDescription ?? "";
				}
				if(inBounds(cp2,2,5)){
					switch(cp2){
						case 2:
							task = ["clearScreen",["initexecute"],0]
							memory = []
							break
						case 3:
							api.log("DISPLAYING")
							task = ["clearScreen",["displayFile",0,256],0]
							break
						case 4:
							break
						case 5:
							curr_page = 0
							task = ["clearScreen",["initmenu"],0]
							break
					}
				} else {
					task = ["menuCallBackWait"]
				}
				break
			case "execute":
				if(s[3]<6 && s[4] == 0.5){
					task = ["clearScreen",["drawFileMenu"],0]
				}
				eval(program)
				dtxt(0,0,"Exit")
				updateDisplay()
				break
			case "displayFile":
				dtxt(0,0,name)
				dtxt(0,6,"Back")
				dtxt(24,6,"Next")
				dtxt(48,6,"Exit")
				dtxt(0,12,program.slice(task[1],task[2]))
				updateDisplay()
				task[0] = "viewingTextRedir"
				break
			case "initexecute":
				dtxt(0,0,"Exit")
				updateDisplay()
				task = ["execute"]
				break
				
                }
        }
}
