# bangkit-final-JKT2-E
Bangkit Final Project by Group JKT2-E

In this project, we made a ASL-guessing game called **GuessASL**👋 using a TensorFlow-based image classifier to identify whether the user correctly guessed the letter.

### Image Classification Model

To train the model, run the `train_cnn.ipynb` . In the notebook we could found the baseline model and several models that used pre-trained weights, such as Inception, MobileNet and VGG16.

Train all of the models to find the model that returns the highest metric. In this case, we used validation accuracy for our metric and we found that MobileNet returns the highest validation accuracy. 

Save the model by running

    model_name.save('model_name.h5')

### Predicting the Model
