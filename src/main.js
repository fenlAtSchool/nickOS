
	

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
	parentFolder = [0]
	directory = ["~"]
	itemSlotPath = []
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
"/":"__#_##_#_##_#__",
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
"}":"##__#__##_#_##_",
"~":"______#_#_#____"
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
        if(obj[1] < 7 && obj[1] + obj[2] < 36){  
                let m = api.getStandardChestItemSlot([parentFolder.at(-1),0,51], obj[1]+obj[2]+2)
				if(m != null){
					m = parseInt(m.attributes.customDescription)
					let f = api.getStandardChestItemSlot([m,0,51], 0).attributes.customDescription
					f += api.getStandardChestItemSlot([m,0,51], 1).attributes.customDescription
                	f = ">" + f
                	dtxt(0, obj[3]*6 + 18, f)
					obj[3]++
				}
                obj[1]++
                return task
        }
        return ["updateDisplay",["waitTC",["mainMenuClicked"]]]
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
                return obj[2]
        }
        return obj[1]
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
				let txt = ""
				for(const i of directory){
					txt += i + "/"
				}
        			dtxt(0, 0, txt.slice(0,32))
				dtxt(0, 6, "Back")
				dtxt(24,6, "Next")
				dtxt(44,6, "Option")
				dtxt(88,6, "Dark Mode")
				if(txt != "~/"){
					dtxt(0, 12, `Return to ${directory.at(-2)}`     )
				}
				updateDisplay()
                                task = ["displayFolderSons",0,curr_page,0]
                                break
                        case "displayFolderSons":
                                task = displayFolderSons(task)
                                break
                        case "updateDisplay":
                                task = updateDisplay()
                                break
                        case "waitClick":
                                task = waitClick(task)
                                break
						case "waitTC":
								if(s[4] == 0.5){
									task = task[1]
								}
								break
			case "clearScreen":
				task = clearScreen()
				break
			case "shut":
				osOn = false
				break
			case "mainMenuClicked":
				if(inBounds(s[3],6,12)){
					if(inBounds(s[2],0,16)){
						curr_page -= 6
						task = ["clearScreen",["initmenu"],0]
						break
					}
					if(inBounds(s[2],24,40)){
						curr_page += 6
						task = ["clearScreen",["initmenu"],0]
						break
					}
					if(inBounds(s[2],44,68)){
						task = ["clearScreen",["folderMenu"],0]
						break
					}
					if(inBounds(s[2],88,124)){
						tmp = palette[0]
						palette[0] = palette[1]
						palette[1] = tmp
						task = ["clearScreen",["initmenu"],0]
						break
					}
				}
				cpace = curr_page + Math.floor((s[3])/6) - 2
				let f = api.getStandardChestItemSlot([parentFolder.at(-1),0,51], cpace)

				if(cpace == 0 && parentFolder.length > 1){
					parentFolder.pop()
					directory.pop()
					itemSlotPath.pop()
					task = ["clearScreen",["initmenu"],0]
					break
				}
				if(f === null || cpace < 1){
					task = ["waitTC", ["mainMenuClicked"]]
					break
				}
				f = parseInt(f.attributes.customDescription)
				let zf = api.getStandardChestItems([f,0,51])
				if(zf[1].attributes.customDescription == ".fol"){
					directory.push(zf[0].attributes.customDescription)
					parentFolder.push(f)
					itemSlotPath.push(cpace)
					curr_page = 0
					task = ["clearScreen",["initmenu"],0]
					break
				}
				task = ["clearScreen",["drawFileMenu",zf,f,cpace],0]
				break
			case "drawFileMenu":
				cItems = task[1]
				chestPos = task[2] + 0
				cpace = task[3] + 0
				let name = cItems[0].attributes.customDescription + cItems[1].attributes.customDescription
				dtxt(0,0,`File: ${name}`)
				dtxt(0,6,"Execute file")
				dtxt(0,12,"View file")
				dtxt(0,18,"Delete file")
				dtxt(0,24,"Back")
				updateDisplay()
				task = ["waitTC",["menuOptionClicked"]]
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
				for(let i = 2; i < 36; i++){
					program += cItems[i]?.attributes?.customDescription ?? "";
				}
				if(inBounds(cp2,2,5)){
					switch(cp2){
						case 2:
							task = ["clearScreen",["initexecute"],0]
							memory = []
							break
						case 3:
							task = ["clearScreen",["displayFile",0,256],0]
							break
						case 4:
							api.setStandardChestItemSlot([parentFolder.at(-1),0,51], cpace, "Air", 1, undefined)
							api.setStandardChestItemSlot([chestPos, 0, 51], 0, "Air", 1, undefined)
							task = ["clearScreen",["initmenu"],0]
							break
						case 5:
							curr_page = 0
							task = ["clearScreen",["initmenu"],0]
							break
					}
				} else {
					task = ["waitTC",["menuOptionClicked"]]
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
				dtxt(0,0,cItems[0].attributes.customDescription + cItems[1].attributes.customDescription)
				api.log(program)
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
			case "folderMenu":
				dtxt(0,0,"About")
				dtxt(0,6,"Exit")
				dtxt(0,12,"Upload")
				dtxt(0,18,"Delete")
				task = ["updateDisplay",["waitTC",["folderMenuClicked"]]]
				break
			case "folderMenuClicked":
				if(inBounds(s[3], 0, 24)){
					if(inBounds(s[3],0,6)){
						task = ["clearScreen",["about"]]
						break
					}
					if(inBounds(s[3],7,12)){
						task = ["clearScreen",["initmenu"]]
						break
					}
					if(inBounds(s[3],13,18)){
						task = ["clearScreen",["upload"]]
						break
					}
					
				}
				task = ["waitTC",["folderMenuClicked"]]
				break
			case "about":
				dtxt(0,0,"NickOS V2.2.0 (c) 2025 fenl_")
				dtxt(0,6,"GPLV3 github.com/tendergalaxy/nickos")
				dtxt(0,18,"Credits to the_ccccc, sulfrox, delfineon, and nickname")
				dtxt(0,30,"Click to exit")
				updateDisplay()
				task = ["waitTC", ["clearScreen",["folderMenu"],0]]
				break
			case "upload":
				dtxt(0,0,"Waiting for user input")
				dtxt(0,6,"Click to exit")
				updateDisplay()
				p = 0
				while(p < 36 && api.getStandardChestItemSlot([parentFolder.at(-1),0,51],p) != null ){
					p++
				}
				if(p == 36){
					dtxt(0,12,"Folder Space Full")
					dtxt(0,18,"Delete a file to clear space")
					task = ["updateDisplay",["waitTC",["clearScreen",["about"]]]]
				} else {
					task = ["findChest"]
				}
			case "findChest":
				cpos = 0
				while(api.getBlock(cpos,0,51).startsWith("Chest")){
					cpos++
				}
				task = ["waitUpload"]
			case "waitUpload": // isFile contents fileName extension
				if(isFile){
					api.log(cpos)
					api.log(p)
					api.setStandardChestItemSlot([parentFolder.at(-1),0,51], p, "Net", 1, undefined, {customDescription: cpos.toString()  })
					api.setBlock([cpos,0,51], "Chest")
					api.setStandardChestItemSlot([cpos,0,51], 0, "Net", 1, undefined, {customDescription: fileName })
					api.setStandardChestItemSlot([cpos,0,51], 1, "Net", 1, undefined, {customDescription: extension} )
					for(let i = 0; i < 34; i++){
						api.setStandardChestItemSlot([cpos,0,51], i+2, "Net", 1, undefined, {customDescription: contents[i]} )
					}
					isFile = false
					task = ["clearScreen", ["about"]]
					break
				}
				if(s[4] == 0.5){
					task = ["clearScreen",["folderMenu"]]
					break
				}
            }
        }
}
