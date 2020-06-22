# bangkit-final-JKT2-E - GuessASL👋
Bangkit Final Project by Group JKT2-E

In this project, we made a ASL-guessing game called **GuessASL**👋 using a TensorFlow-based image classifier to identify whether the user correctly guessed the letter.

### Image Classification Model

To train the model, run the `train_cnn.ipynb` . In the notebook we could found the baseline model and several models that used pre-trained weights, such as Inception, MobileNet and VGG16.

Train all of the models to find the model that returns the highest metric. In this project, we used validation accuracy score. 

Save your preferred model by running

    model_name.save('model_name.h5')
	

### Convert your Model


1. Install tensorflowjs

        pip install tensorflowjs

2.  Run this script to convert the .h5 model to  aweb-friendly format


    tensorflowjs_converter --input_format=keras  dir/model_name.h5  dir/tfjs_model

[More information about tensorflowjs converter](https://huningxin.github.io/tfjs-converter/ "More information about tensorflowjs converter")
### Predicting the Image

To predict the image, run this command:

    yarn install
and then:

        yarn start
to run the project in development mode
