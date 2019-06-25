# -decision_tree
Example of the simplest decision tree

# Dataset
```sh
[
    ['Green', 3, 'Apple'],
    ['Yellow', 4, 'Apple'],
    ['Red', 2, 'Grape'],
    ['Red', 1, 'Grape'],
    ['Yellow', 3, 'Lemon'],
]
```
  
# Results 
```sh
Is color == Red
--> True
 Dự đoán:  { Grape: 2 }
--> False
 Is color == Yellow
 --> True
  Dự đoán:  { Apple: 1, Lemon: 1 }
 --> False
  Dự đoán:  { Apple: 1 }
  ```
