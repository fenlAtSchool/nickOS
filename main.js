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
        let tmp = ctrack()
        jp[2] = tmp[0]
        jp[3] = tmp[1]
        tmp = movtrack()
        jp[0] = tmp[0]
        jp[1] = tmp[1]
        jp[4] = 0
        jp[5] = 0
}
