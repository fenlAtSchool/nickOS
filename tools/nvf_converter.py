import cv2
import os
import json
from PIL import Image
from google.colab import files
video_path = 'Touhou - Bad Apple.mp4'
output_folder = 'converted.txt'
desired_fps = 2
target_resolution = (64, 29)
with open('colorsv2.json', 'r') as f:
  data = json.load(f)
data = data[:20] + data[21:71] + data[72:76] + data[77:]
charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|[]{}/-_>=+`~?.,;:<"
items = []

last = [0 for i in range(target_resolution[0] * target_resolution[1])]
def find_dif(x, y):
  return abs(x[0] - y[0]) + abs(x[1] - y[1]) + abs(x[2] - y[2])
with open('colorsv2.json', 'r') as f:
  data = json.load(f)
def findMatchingBlock(x):
  md = ["NotPossible",float("inf")]
  for i in range(len(data)):
    d = find_dif(data[i][1],x)
    if(d < md[1]):
      md[0] = i
      md[1] = d
  return md[0]
def convert_image(img):
    txt = ""
    mapped = [findMatchingBlock(pixel) for pixel in img]

    curr = mapped[0]
    length = 0

    for i in range(len(mapped)):
        item = mapped[i]
        if last[i] != item:
            toSend = item
            last[i] = item
        else:
            toSend = 79
        if curr == toSend and length < 220:
            length += 1
        else:
            txt += chr(length * 100 + curr)
            curr = toSend
            length = 1
    txt += chr(length * 100 + curr)
    return txt + ' '
vidcap = cv2.VideoCapture(video_path)

video_fps = vidcap.get(cv2.CAP_PROP_FPS)
frame_interval = int(round(video_fps / desired_fps))

count = 0
frame_idx = 0

for i in range(13):
  success, image = vidcap.read()
toWrite = []
tlen = 0
while success:
    if frame_idx % frame_interval == 0:
        image_resized = cv2.resize(image, target_resolution)
        image_rgb = cv2.cvtColor(image_resized, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(image_rgb)
        flat_pixels = list(pil_img.getdata())
        converted = convert_image(flat_pixels)
        toWrite.append(converted)
        print(len(converted))
        tlen += len(converted)
        count += 1
    success, image = vidcap.read()
    frame_idx += 1
output = ""
with open(output_folder, "w") as f:
  f.write(f"{target_resolution[0]} {target_resolution[1]} {count} ")
  output += f"{target_resolution[0]} {target_resolution[1]} {count} "
  for i in toWrite:
    f.write(i)
    output += i + " "
print(f"Done! Processed {count} frames at {desired_fps} FPS.")
print(f"Total length: {tlen}")
output = [output[i:i+8000] for i in range(0,len(output),8000)]
for i in output:
  print(i)
files.download(output_folder)
