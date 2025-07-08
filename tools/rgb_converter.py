from PIL import Image
import numpy as np
import json
image = Image.open(input("File?")).convert("RGB")
image = image.resize((40, 30))
rgb_array = np.array(image)
rgb_tuples = rgb_array.reshape(-1, 3)
rgb_tuples = [[int(x) for x in i] for i in rgb_tuples]
unique_colors = set(map(tuple, rgb_tuples))

dat_ids = [2,1694,5,650,6,8,139,28,29,31,474,40,41,42,45,465,1008,652,959,958,976,106,1630,1621,1629,946,947,948,949,950,951,482,484,486,471,140,961,962,147,952,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,336,344,352,360,368,376,384,392,400,408,416,424,432,440,448,456,1361,1369,1377,1385,1393,1401,1409,1417,1425,1433,1441,1449,1457,1465,1473,1481,97,93,92,90,99,91,94,84,85,89,95,87,88,98,96,86,1722,1056,1271,212,1510,1576,1605,1607,1608,1609,1674,1678,1682,1686,1690,1718]
def find_dif(x, y):
  return abs(x[0] - y[0]) + abs(x[1] - y[1]) + abs(x[2] - y[2])
with open(input("Standard Color file (Usually colors.json)?"), 'r') as f:
  data = json.load(f)
def findMatchingBlock(x):
  md = ["NotPossible",99999]
  for i in data:
    d = find_dif(i[1],x)
    if(d < md[1]):
      md[0] = i[0]
      md[1] = d
  return md[0]

for i in range(len(data)):
  data[i][0] = dat_ids[i]
data = data[:16] + data[17:39] + data[40:56] + data[88:114]
for i in range(len(rgb_tuples)):
  rgb_tuples[i] = findMatchingBlock(rgb_tuples[i])
print(len(data))
print(len(rgb_tuples))
txt = ""
for i in rgb_tuples:
  txt += str(i) + " "
txt = txt[:-1]
print(txt)
