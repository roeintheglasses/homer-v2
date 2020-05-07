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

for i in range(0, len(notesTrainingSet)):
    # train image
    trainingImage = cv2.imread(notesTrainingSet[i])

    (kp2, des2) = akaze.detectAndCompute(trainingImage, None)

    # brute force matcher
    allMatches = bf.knnMatch(des1, des2, k=2)

    good = []
    # give an arbitrary number -> 0.789,0.792
    # if good -> append to list of good matches
    for (m, n) in allMatches:
        if m.distance < 0.792 * n.distance:
            good.append([m])

    if len(good) > maxVal:
        maxVal = len(good)
        maxPoint = i
        maxKP = kp2

if maxVal != 75:
    noteResult = ''
    note = str(notesTrainingSet[maxPoint])[21:-4]
    for i in note:
        if i == '/':
            break
        noteResult = noteResult + i

    print(noteResult, '₹')
else:
    print('No Match Found.')

