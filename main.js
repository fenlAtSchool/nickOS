jop = [0,0,0,0,0,0]

/*
Movement +/- x
Movement +/- z

Cursor X
Cursor Y

Main Action
Alt Action

(NickOS runs in the +Z direction)
*/
user = -1

inBounds = (x,y,z) => (x >= y && x <= z)
onClick = () => (jp[4] = 1)
onPlayerAttemptAltAction = () => (jp[5] = 1)

function movtrack(){
        let z = api.getPosition(user)
        api.setPosition(user,[0,0,0])
        return z
}

function ctrack(){
        let ctmp = api.getPlayerFacingInfo(user)
        vec = ctmp["camPos"]
        ctmp = ctmp["dir"]
        
        ctmp[0] = ctmp[0] * (50 / ctmp[2]) + vec[0]
        ctmp[1] = ctmp[1] * (50 / ctmp[2]) + vec[1]

        if(inBounds(ctmp[0], -32, 32) && inBounds(ctmp[1],-32,32)){
                return ctmp
        }
}
function jp(){
        ram[7] = ram[2]
        ram[8] = ram[3]
        let tmp = ctrack()
        ram[2] = tmp[0]
        ram[3] = tmp[1]
        tmp = movtrack()
        ram[0] = tmp[0]
        ram[1] = tmp[2]
        ram[4] = 0
        ram[5] = 0
}
function allocMem(name){
        ramdict[
}

function OSboot(){
        ram = []
        ramdict = {""};
        for(let i = 0; i < 512; i++){
                ram.append
        }
}
