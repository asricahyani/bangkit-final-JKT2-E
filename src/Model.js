import * as tf from '@tensorflow/tfjs';

const MODEL_URL = "https://bangkit-JKT-2E.netlify.app/mobilenet/model.json";

const PREPROCESS_DIVISOR = tf.scalar(255 / 2 );

export const load = async () => (
  await tf.loadLayersModel(MODEL_URL)
);


export const predict = (input, model) => {
    const preprocessedInput = tf.div(
      tf.sub(input.asType('float32'), PREPROCESS_DIVISOR),
      PREPROCESS_DIVISOR);
    const reshapedInput = input.reshape([1, ...preprocessedInput.shape]);
    return model.predict(reshapedInput);
};
