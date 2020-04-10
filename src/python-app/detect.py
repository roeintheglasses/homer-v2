from utils import *
from trainingSets import *
from matplotlib import pyplot as plt


orb = cv2.ORB_create()
akaze = cv2.AKAZE_create()


maxVal = 8
maxPoint = -1
maxKP = 0



testImage  = cv2.imread("uploads/image.jpg")


# testImage = readImg('../test/files/test/test_20_1.jpg')
# print("Read image file from the given location.")

# resizing must be dynamic
# original = resizeImg(testImage, 0.4)

# display('original', original)
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

    # print(i, ' ', notes_training_set[i], '--->', len(good))


if maxVal != 8:
    # print(notes_training_set[maxPoint] +
    #       ' has total ' + 'good matches : ', maxVal)
    print()
    note_real = ''
    note = str(notes_training_set[maxPoint])[17:-4]
    for i in note:
        if i == '/':
            break
        note_real = note_real + i

    print('Detected currency denomination: ₹', note_real)

else:
    print('No Matches Found')

