sqm = []
vertexes = []
print("OBJ File Converter into Plot3d Mesh: fenl")
obj = input("File Name: ")
try: 
    obj = open(obj)
except:
    raise FileNotFoundError(f"File {obj} not found.")
    
for x in obj:
    tmp = x.split()
    tmp.append("t")
    if(tmp[0] == "v"):
        vertexes.append([float(tmp[1]),float(tmp[2]),float(tmp[3])])
    if(tmp[0] == "f"):
        sqm.append([vertexes[tmp[1]],vertexes[tmp[2]],vertexes[tmp[3]]])
obj.close()
sqm = [sqm[i:i + 150] for i in range(0, len(sqm), 150)]
    
k = input("Save as: ")
k = open(k,"w")
k.write("squareMesh = [] \n")
for i in sqm:
    k.write("j = " + str(i))
    k.write("\nfor(let i = 0; i < j.length; i++){\n   squareMesh.push(j[i])\n}\n")
k.close()

'''
fpos = [parseInt(api.getChestItemSlot([0,0,51]).attributes.customAttributes.pages[0]),0,51]
for(let m = 0; m < 48; m++){
    fpos[2]++
    api.setBlock(fpos,"Chest")
    api.setStandardChestItemSlot(fpos,0,'Book',1,undefined,{'customAttributes': {'pages': j[m].map(x=>x)  }})
}
'''
