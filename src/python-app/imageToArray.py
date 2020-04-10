import numpy as np
from PIL import Image
import os
import json
# load the image
image = Image.open('../test/files/test/test_20_1.jpg')
# convert image to numpy array
data = np.asarray(image)
data2 = data.tolist()
json_str = json.dumps(data2)

# print(json_str)
print('python3 detect.py'+json_str)
os.system('python3 detect.py'+json_str)
# print((data2))

