import cv2
import numpy as np
from trainingSets import *


orb = cv2.ORB_create()
akaze = cv2.AKAZE_create()


maxVal = 75
maxPoint = -1
maxKP = 0

testImage  = cv2.imread("src/uploads/image.jpg")
bf = cv2.BFMatcher()
(kp1, des1) = akaze.detectAndCompute(testImage, None)

for i in range(0, len(notes_training_set)):
    # train image
    train_img = cv2.imread(notes_training_set[i])

    (kp2, des2) = akaze.detectAndCompute(train_img, None)

    # brute force matcher
    all_matches = bf.knnMatch(des1, des2, k=2)

    good = []
    # give an arbitrary number -> 0.789,0.792
    # if good -> append to list of good matches
    for (m, n) in all_matches:
        if m.distance < 0.792 * n.distance:
            good.append([m])

    if len(good) > maxVal:
        maxVal = len(good)
        maxPoint = i
        maxKP = kp2

    print(i, ' ', notes_training_set[i], '--->', len(good))


if maxVal != 75:
    print(notes_training_set[maxPoint] +
          ' has total ' + 'good matches : ', maxVal)
    print()
    note_real = ''
    note = str(notes_training_set[maxPoint])[21:-4]
    for i in note:
        if i == '/':
            break
        note_real = note_real + i

    print(note_real, '₹')
else:
    print('No Match Found')

