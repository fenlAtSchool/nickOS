jop = [0,0,0,0,0,0]

/*
Movement +/- x
Movement +/- z

Cursor X
Cursor Y

Main Action
Alt Action
*/
user = -1

function onClick(){
        jp[4] = 1
} 
function onPlayerAttemptAltAction(){
        jp[5] = 1
}

functon ctrack(){
        let ctmp = api.getPlayerFacingInfo(user)
        vec = ctmp["camPos"]
        ctmp = ctmp["dir"]

        // To be finished
}

function jp(){
        let tmp = ctrack()
        jp[2] = tmp[0]
        jp[3] = tmp[1]
        tmp = movtrack()
        jp[0] = tmp[0]
        jp[1] = tmp[1]

        jp[0] = 
}
