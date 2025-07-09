from PIL import Image
import numpy as np
import json
image = Image.open(input("File?")).convert("RGB")
size = (58,58)
image = image.resize(size)
rgb_array = np.array(image)
rgb_tuples = rgb_array.reshape(-1, 3)
rgb_tuples = [[int(x) for x in i] for i in rgb_tuples]
unique_colors = set(map(tuple, rgb_tuples))


def find_dif(x, y):
  return abs(x[0] - y[0]) + abs(x[1] - y[1]) + abs(x[2] - y[2])
with open(input("Standard Color file (Usually colors.json)?"), 'r') as f:
  data = json.load(f)
def findMatchingBlock(x):
  md = ["NotPossible",99999]
  for i in range(len(data)):
    d = find_dif(data[i][1],x)
    if(d < md[1]):
      md[0] = i
      md[1] = d
  return md[0]

data = data[:20] + data[21:71] + data[72:76] + data[77:]

for i in range(len(rgb_tuples)):
  rgb_tuples[i] = findMatchingBlock(rgb_tuples[i])
charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|[]{}/-_>=+`~?.,;:"
items = [str(size[0]) + " " + str(size[1])]
length = 0
item = rgb_tuples[0]
print(rgb_tuples)
txt = ""
for i in rgb_tuples:
  '''
  if i == item and length < 80:
    length += 1
  else:
    txt += charset[length - 1] + charset[i]
    item = i
    length = 1
  '''
  txt += charset[i]
items += [txt[i:i+460] for i in range(0,len(txt),460)]
print(items)
print(len(txt))
print(len(rgb_tuples))
