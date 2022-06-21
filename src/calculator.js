/**
 * Scoring Tables
 */
//Push ups
const push_up_table = [
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //0
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //1
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], //2
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2], //3
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4], //4
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6], //5
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8], //6
  [ 0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8,  9], //7
  [ 0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8,  9, 10], //8
  [ 0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8,  9, 10, 11], //9
  [ 0,  0,  0,  0,  0,  1,  2,  4,  6,  8,  9, 10, 11, 12], //10
  [ 0,  0,  0,  0,  1,  2,  4,  6,  8,  9, 10, 11, 12, 13], //11
  [ 0,  0,  0,  1,  2,  4,  6,  8,  9, 10, 11, 12, 13, 14], //12
  [ 0,  0,  1,  2,  4,  6,  8,  9, 10, 11, 12, 13, 14, 15], //13
  [ 0,  1,  2,  4,  6,  8,  9, 10, 11, 12, 13, 14, 15, 15], //14
  [ 1,  2,  4,  6,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16], //15
  [ 2,  4,  6,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16], //16
  [ 4,  6,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16], //17
  [ 6,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16, 17], //18
  [ 8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16, 17, 17], //19
  [ 9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16, 17, 17, 17], //20
  [10, 11, 12, 13, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18], //21
  [11, 12, 13, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18], //22
  [12, 13, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18], //23
  [13, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19], //24
  [14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19], //25
  [15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19], //26
  [15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20], //27
  [16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20], //28
  [16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 21], //29
  [16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 21, 21], //30
  [17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 22], //31
  [17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 22], //32
  [17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 22, 22], //33
  [18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21, 22, 23], //34
  [18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 23], //35
  [18, 19, 19, 19, 20, 20, 20, 20, 21, 21, 22, 22, 23, 23], //36
  [19, 19, 19, 20, 20, 20, 20, 21, 21, 22, 22, 22, 23, 24], //37
  [19, 19, 20, 20, 20, 20, 21, 21, 21, 22, 22, 23, 23, 24], //38
  [19, 20, 20, 20, 20, 21, 21, 21, 22, 22, 23, 23, 24, 24], //39
  [20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 23, 23, 24, 25], //40
  [20, 20, 20, 21, 21, 21, 21, 22, 22, 23, 23, 24, 24, 25], //41
  [20, 20, 21, 21, 21, 21, 22, 22, 22, 23, 23, 24, 25, 25], //42
  [20, 21, 21, 21, 21, 22, 22, 22, 23, 23, 24, 24, 25, 25], //43
  [21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 24, 24, 25, 25], //44
  [21, 21, 21, 22, 22, 22, 22, 23, 23, 24, 24, 25, 25, 25], //45
  [21, 21, 22, 22, 22, 22, 23, 23, 23, 24, 24, 25, 25, 25], //46
  [21, 22, 22, 22, 22, 23, 23, 23, 24, 24, 25, 25, 25, 25], //47
  [22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 25, 25], //48
  [22, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 25, 25, 25], //49
  [22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25], //50
  [22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25], //51
  [23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25], //52
  [23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25], //53
  [23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25], //54
  [23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25], //55
  [24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //56
  [24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //57
  [24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //58
  [24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //59
];

//Sit ups
const sit_up_table = [
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //0
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //1
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], //2
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2], //3
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  3], //4
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  3,  4], //5
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  3,  4,  5], //6
  [ 0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  3,  4,  5,  6], //7
  [ 0,  0,  0,  0,  0,  0,  0,  1,  2,  3,  4,  5,  6,  6], //8
  [ 0,  0,  0,  0,  0,  0,  1,  2,  3,  4,  5,  6,  6,  7], //9
  [ 0,  0,  0,  0,  0,  1,  2,  3,  4,  5,  6,  6,  7,  7], //10
  [ 0,  0,  0,  0,  1,  2,  3,  4,  5,  6,  6,  7,  7,  8], //11
  [ 0,  0,  0,  1,  2,  3,  4,  5,  6,  6,  7,  7,  8,  9], //12
  [ 0,  0,  1,  2,  3,  4,  5,  6,  6,  7,  7,  8,  9, 10], //13
  [ 0,  1,  2,  3,  4,  5,  6,  6,  7,  7,  8,  9, 10, 11], //14
  [ 1,  2,  3,  4,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12], //15
  [ 2,  3,  4,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13], //16
  [ 3,  4,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 13], //17
  [ 4,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 13, 14], //18
  [ 5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 13, 14, 14], //19
  [ 6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 13, 14, 14, 15], //20
  [ 6,  7,  7,  8,  9, 10, 11, 12, 13, 13, 14, 14, 15, 16], //21
  [ 7,  7,  8,  9, 10, 11, 12, 13, 13, 14, 14, 15, 16, 17], //22
  [ 7,  8,  9, 10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18], //23
  [ 8,  9, 10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18], //24
  [ 9, 10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19], //25
  [10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19], //26
  [11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20], //27
  [12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20], //28
  [13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20], //29
  [13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 21], //30
  [14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21], //31
  [14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21], //32
  [15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22], //33
  [16, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22], //34
  [17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22], //35
  [18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 22, 22, 22, 23], //36
  [18, 19, 19, 20, 20, 20, 20, 21, 21, 22, 22, 22, 23, 23], //37
  [19, 19, 20, 20, 20, 20, 21, 21, 21, 22, 22, 23, 23, 23], //38
  [19, 20, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 24], //39
  [20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 23, 23, 24, 24], //40
  [20, 20, 20, 21, 21, 21, 21, 22, 22, 23, 23, 23, 24, 24], //41
  [20, 20, 21, 21, 21, 21, 22, 22, 22, 23, 23, 24, 24, 25], //42
  [20, 21, 21, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 25], //43
  [21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 24, 24, 25, 25], //44
  [21, 21, 21, 22, 22, 22, 22, 23, 23, 24, 24, 24, 25, 25], //45
  [21, 21, 22, 22, 22, 22, 23, 23, 23, 24, 24, 25, 25, 25], //46
  [21, 22, 22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25], //47
  [22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 25, 25], //48
  [22, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 25, 25, 25], //49
  [22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25], //50
  [22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25], //51
  [23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25], //52
  [23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25], //53
  [23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25], //54
  [23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25], //55
  [24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //56
  [24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //57
  [24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //58
  [24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //59
];

//2.4 run
const running_table = [
  [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], //8:30 (0)
  [49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], //8:40 (1)
  [48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], //8:50 (2)
  [47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], //9:00 (3)
  [46, 47, 48, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], //9:10 (4)
  [45, 46, 47, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], //9:20 (5)
  [44, 45, 46, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50], //9:30 (6)
  [43, 44, 45, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50], //9:40 (7)
  [42, 43, 44, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50], //9:50 (8)
  [41, 42, 43, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50], //10:00 (9)
  [40, 41, 42, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50], //10:10 (10)
  [39, 40, 41, 43, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50], //10:20 (11)
  [38, 39, 40, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 50], //10:30 (12)
  [38, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50], //10:40 (13)
  [37, 38, 38, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], //10:50 (14)
  [37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], //11:00 (15)
  [36, 37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], //11:10 (16)
  [36, 36, 37, 38, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47], //11:20 (17)
  [35, 36, 36, 37, 38, 38, 39, 40, 41, 42, 43, 44, 45, 46], //11:30 (18)
  [35, 35, 36, 37, 37, 38, 38, 39, 40, 41, 42, 43, 44, 45], //11:40 (19)
  [34, 35, 35, 36, 37, 37, 38, 38, 39, 40, 41, 42, 43, 44], //11:50 (20)
  [33, 34, 35, 36, 36, 37, 37, 38, 38, 39, 40, 41, 42, 43], //12:00 (21)
  [32, 33, 34, 35, 36, 36, 37, 37, 38, 38, 39, 40, 41, 42], //12:10 (22)
  [31, 32, 33, 35, 35, 36, 36, 37, 37, 38, 38, 39, 40, 41], //12:20 (23)
  [30, 31, 32, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 40], //12:30 (24)
  [29, 30, 31, 33, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39], //12:40 (25)
  [28, 29, 30, 32, 33, 34, 35, 35, 36, 36, 37, 37, 38, 38], //12:50 (26)
  [27, 28, 29, 31, 32, 33, 34, 35, 35, 36, 36, 37, 37, 38], //13:00 (27)
  [26, 27, 28, 30, 31, 32, 33, 34, 35, 35, 36, 36, 37, 37], //13:10 (28)
  [25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 35, 36, 36, 37], //13:20 (29)
  [24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 36], //13:30 (30)
  [23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36], //13:40 (31)
  [22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35], //13:50 (32)
  [21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], //14:00 (33)
  [20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], //14:10 (34)
  [19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], //14:20 (35)
  [18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], //14:30 (36)
  [16, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], //14:40 (37)
  [14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], //14:50 (38)
  [12, 14, 16, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], //15:00 (39)
  [10, 12, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], //15:10 (40)
  [ 8, 10, 12, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], //15:20 (41)
  [ 6,  8, 10, 14, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26], //15:30 (42)
  [ 4,  6,  8, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24, 25], //15:40 (43)
  [ 2,  4,  6, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24], //15:50 (44)
  [ 1,  2,  4,  8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23], //16:00 (45)
  [ 0,  1,  2,  6,  8, 10, 12, 14, 16, 18, 19, 20, 21, 22], //16:10 (46)
  [ 0,  0,  1,  4,  6,  8, 10, 12, 14, 16, 18, 19, 20, 21], //16:20 (47)
  [ 0,  0,  0,  2,  4,  6,  8, 10, 12, 14, 16, 18, 19, 20], //16:30 (48)
  [ 0,  0,  0,  1,  2,  4,  6,  8, 10, 12, 14, 16, 18, 19], //16:40 (49)
  [ 0,  0,  0,  0,  1,  2,  4,  6,  8, 10, 12, 14, 16, 18], //16:50 (50)
  [ 0,  0,  0,  0,  0,  1,  2,  4,  6,  8, 10, 12, 14, 16], //17:00 (51)
  [ 0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8, 10, 12, 14], //17:10 (52)
  [ 0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8, 10, 12], //17:20 (53)
  [ 0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8, 10], //17:30 (54)
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6,  8], //17:40 (55)
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4,  6], //17:50 (56)
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2,  4], //18:00 (57)
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  2], //18:10 (58)
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], //18:20 (59)
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]  //18:30 (60)
];

//Get age cat
function get_age_group(age) {
  if (age == undefined) {
    return -1;
  }
  if (age >= 0 && age < 22) {
    return 0;
  }
  if (age < 25) {
    return 1;
  }
  if (age < 28) {
    return 2;
  }
  if (age < 31) {
    return 3;
  }
  if (age < 34) {
    return 4;
  }
  if (age < 37) {
    return 5;
  }
  if (age < 40) {
    return 6;
  }
  if (age < 43) {
    return 7;
  }
  if (age < 46) {
    return 8;
  }
  if (age < 49) {
    return 9;
  }
  if (age < 52) {
    return 10;
  }
  if (age < 55) {
    return 11;
  }
  if (age < 58) {
    return 12;
  }
  if (age < 61) {
    return 13;
  }
  return -1;
}

/**
 * Push ups calculator 
 */
function get_push_up(age_group, push_ups) {
  if (push_ups < 0) {
    return 0;
  }
  if (push_ups > 59) {
    return 25;
  }
  return push_up_table[push_ups][age_group];
}

/**
 * Sit up calculator
 */
function get_sit_up(age_group, sit_ups) {
  if (sit_ups < 0) {
    return 0;
  }
  if (sit_ups > 59) {
    return 25;
  }
  return sit_up_table[sit_ups][age_group];
}

//Get the run time
function get_run_row(run_time_m, run_time_s) {
  if (run_time_m < 0 || run_time_s < 0) {
    return 60;
  }
  if (run_time_m < 8) {
    return 0;
  }
  if (run_time_m == 8) {
    if (run_time_s <= 30) {
      return 0;
    }
    if (run_time_s <= 40) {
      return 1;
    }
    if (run_time_s <= 50) {
      return 2;
    }
    if (run_time_s <= 59) {
      return 3;
    }
  } 
  if (run_time_m == 9) {
    if (run_time_s == 0) {
      return 3;
    }
    if (run_time_s <= 10) {
      return 4;
    }
    if (run_time_s <= 20) {
      return 5;
    }
    if (run_time_s <= 30) {
      return 6;
    }
    if (run_time_s <= 40) {
      return 7;
    }
    if (run_time_s <= 50) {
      return 8;
    }
    if (run_time_s <= 59) {
      return 9;
    }
  } 
  if (run_time_m == 10) {
    if (run_time_s == 0) {
      return 9;
    }
    if (run_time_s <= 10) {
      return 10;
    }
    if (run_time_s <= 20) {
      return 11;
    }
    if (run_time_s <= 30) {
      return 12;
    }
    if (run_time_s <= 40) {
      return 13;
    }
    if (run_time_s <= 50) {
      return 14;
    }
    if (run_time_s <= 59) {
      return 15;
    }
  } 
  if (run_time_m == 11) {
    if (run_time_s == 0) {
      return 15;
    }
    if (run_time_s <= 10) {
      return 16;
    }
    if (run_time_s <= 20) {
      return 17;
    }
    if (run_time_s <= 30) {
      return 18;
    }
    if (run_time_s <= 40) {
      return 19;
    }
    if (run_time_s <= 50) {
      return 20;
    }
    if (run_time_s <= 59) {
      return 21;
    }
  }
  if (run_time_m == 12) {
    if (run_time_s == 0) {
      return 21;
    }
    if (run_time_s <= 10) {
      return 22;
    }
    if (run_time_s <= 20) {
      return 23;
    }
    if (run_time_s <= 30) {
      return 24;
    }
    if (run_time_s <= 40) {
      return 25;
    }
    if (run_time_s <= 50) {
      return 26;
    }
    if (run_time_s <= 59) {
      return 27;
    }
  }
  if (run_time_m == 13) {
    if (run_time_s == 0) {
      return 27;
    }
    if (run_time_s <= 10) {
      return 28;
    }
    if (run_time_s <= 20) {
      return 29;
    }
    if (run_time_s <= 30) {
      return 30;
    }
    if (run_time_s <= 40) {
      return 31;
    }
    if (run_time_s <= 50) {
      return 32;
    }
    if (run_time_s <= 59) {
      return 33;
    }
  }
  if (run_time_m == 14) {
    if (run_time_s == 0) {
      return 33;
    }
    if (run_time_s <= 10) {
      return 34;
    }
    if (run_time_s <= 20) {
      return 35;
    }
    if (run_time_s <= 30) {
      return 36;
    }
    if (run_time_s <= 40) {
      return 37;
    }
    if (run_time_s <= 50) {
      return 38;
    }
    if (run_time_s <= 59) {
      return 39;
    }
  }
  if (run_time_m == 15) {
    if (run_time_s == 0) {
      return 39;
    }
    if (run_time_s <= 10) {
      return 40;
    }
    if (run_time_s <= 20) {
      return 41;
    }
    if (run_time_s <= 30) {
      return 42;
    }
    if (run_time_s <= 40) {
      return 43;
    }
    if (run_time_s <= 50) {
      return 44;
    }
    if (run_time_s <= 59) {
      return 45;
    }
  }
  if (run_time_m == 16) {
    if (run_time_s == 0) {
      return 45;
    }
    if (run_time_s <= 10) {
      return 46;
    }
    if (run_time_s <= 20) {
      return 47;
    }
    if (run_time_s <= 30) {
      return 48;
    }
    if (run_time_s <= 40) {
      return 49;
    }
    if (run_time_s <= 50) {
      return 50;
    }
    if (run_time_s <= 59) {
      return 51;
    }
  }
  if (run_time_m == 17) {
    if (run_time_s == 0) {
      return 51;
    }
    if (run_time_s <= 10) {
      return 52;
    }
    if (run_time_s <= 20) {
      return 53;
    }
    if (run_time_s <= 30) {
      return 54;
    }
    if (run_time_s <= 40) {
      return 55;
    }
    if (run_time_s <= 50) {
      return 56;
    }
    if (run_time_s <= 59) {
      return 57;
    }
  }
  if (run_time_m == 18) {
    if (run_time_s == 0) {
      return 57;
    }
    if (run_time_s <= 10) {
      return 58;
    }
    if (run_time_s <= 20) {
      return 59;
    }
  }
  return 60;
}

/**
 * 2.4km calculator
 */
 function get_run_score(age_group, run_group) {
  return running_table[run_group][age_group];
}

function score(age, push_ups, sit_ups, run_time_m, run_time_s) {
  let age_group = get_age_group(age);
  //Handle garbage entries
  if (age_group == -1) {
    return 0;
  }

  //Calculate individual scores
  let push_ups_score = get_push_up(age_group, push_ups);
  let sit_ups_score = get_sit_up(age_group, sit_ups);
  let run_group = get_run_row(run_time_m, run_time_s);
  let run_score = get_run_score(age_group, run_group);

  //Calculate final score
  let total_score = push_ups_score + sit_ups_score + run_score;
  console.log("push ups: " +push_ups_score);
  console.log("sit ups: " +sit_ups_score);
  console.log("2.4 Run: " +run_score);
  return total_score;
}

/**
 * calculate addtional reps for push ups
 */
function get_add_push_up(age_group, push_ups, push_up_score) {
  //Handle max score
  if (push_up_score == 25) {
    console.log("Push ups maxed out");
    return "Maxed out";
  }

  //Calculate addtional reps.
  let i = push_ups;
  while (push_up_table[i][age_group] <= push_up_score) {
    i++;
  }
  console.log("New push up points: " +(push_up_table[i][age_group]));
  console.log("Addtional Pushups: " +(i - push_ups));
  return ((i - push_ups) + " more rep(s) to " +(Number(push_up_score) + 1) + " point(s).");
}

/**
 * calculate addtional reps for sit ups
 */
 function get_add_sit_up(age_group, sit_ups, sit_up_score) {
  //Handle max score
  if (sit_up_score == 25) {
    console.log("Sit ups maxed out");
    return "Maxed out";
  }

  //Calculate addtional reps.
  let i = sit_ups;
  while (sit_up_table[i][age_group] <= sit_up_score) {
    i++;
  }
  console.log("New sit up points: " +(sit_up_table[i][age_group]));
  console.log("Addtional Situps: " +(i - sit_ups));
  return ((i - sit_ups) + " more rep(s) to " +(Number(sit_up_score) + 1) + " point(s).");
}

//Convert timing from min and sec to sec.
function convert_min_sec(run_time_m, run_time_s) {
  if (run_time_s == "00") {
    run_time_s = 0;
  }
  return Number(run_time_m * 60) + Number(run_time_s);
}

//Convert timing from sec to min and sec.
function convert_sec_min(run_time_s) {
  if (run_time_s <= 60) {
    return (run_time_s + " second(s) ");
  }
  return (Math.floor(run_time_s / 60) + " min(s) and " + (run_time_s % 60) + " second(s) ");
}

/**
 * calculate timing to cut.
 */
 function get_run_time_cut(age_group, run_time_m, run_time_s, run_row, run_score) {
  //Handle max score
  if (run_score == 50) {
    console.log("Running maxed out");
    return "Maxed out";
  }

  const row_to_time = [ 
                       [ 8, 30], // (0)
                       [ 8, 40], // (1)
                       [ 8, 50], // (2)
                       [ 9,  0], // (3)
                       [ 9, 10], // (4)
                       [ 9, 20], // (5)
                       [ 9, 30], // (6)
                       [ 9, 40], // (7)
                       [ 9, 50], // (8)
                       [10,  0], // (9)
                       [10, 10], // (10)
                       [10, 20], // (11)
                       [10, 30], // (12)
                       [10, 40], // (13)
                       [10, 50], // (14)
                       [11,  0], // (15)
                       [11, 10], // (16)
                       [11, 20], // (17)
                       [11, 30], // (18)
                       [11, 40], // (19)
                       [11, 50], // (20)
                       [12,  0], // (21)
                       [12, 10], // (22)
                       [12, 20], // (23)
                       [12, 30], // (24)
                       [12, 40], // (25)
                       [12, 50], // (26)
                       [13,  0], // (27)
                       [13, 10], // (28)
                       [13, 20], // (29)
                       [13, 30], // (30)
                       [13, 40], // (31)
                       [13, 50], // (32)
                       [14,  0], // (33)
                       [14, 10], // (34)
                       [14, 20], // (35)
                       [14, 30], // (36)
                       [14, 40], // (37)
                       [14, 50], // (38)
                       [15,  0], // (39)
                       [15, 10], // (40)
                       [15, 20], // (41)
                       [15, 30], // (42)
                       [15, 40], // (43)
                       [15, 50], // (44)
                       [16,  0], // (45)
                       [16, 10], // (46)
                       [16, 20], // (47)
                       [16, 30], // (48)
                       [16, 40], // (49)
                       [16, 50], // (50)
                       [17,  0], // (51)
                       [17, 10], // (52)
                       [17, 20], // (53)
                       [17, 30], // (54)
                       [17, 40], // (55)
                       [17, 50], // (56)
                       [18,  0], // (57)
                       [18, 10], // (58)
                       [18, 20], // (59)
                       [18, 30], // (60)
                      ];

  //Find better timing.
  let i = run_row;
  let initial_time = convert_min_sec(run_time_m, run_time_s);
  console.log("Initial time: " +initial_time);
  console.log("first i: " +i);
  while (running_table[i][age_group] <= run_score) {
    i--;
  }
  console.log("second i: " +i);
  let new_run_time_m = row_to_time[i][0];
  let new_run_time_s = row_to_time[i][1];
  let improved_time = convert_min_sec(new_run_time_m, new_run_time_s);
  console.log("Improved time: " +improved_time);

  //Calculate timing to cut
  let time_to_cut = initial_time - improved_time;
  console.log("New 2.4 points: " +(running_table[i][age_group]));
  console.log("Timing to cut: " +time_to_cut);
  return ((convert_sec_min(time_to_cut)) + "to " + (run_score + 1) + " point(s).");
}

export { score,
         get_age_group,
         get_push_up,
         get_sit_up,
         get_run_row,
         get_run_score,
         get_add_push_up,
         get_add_sit_up,
         get_run_time_cut,
};