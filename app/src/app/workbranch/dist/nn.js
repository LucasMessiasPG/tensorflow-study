"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs");
// @ts-ignore
window.tf = tf;
// tf.setBackend('cpu');
var INPUTS = 4;
var NODES = 64;
var OUTPUTS = 4;
var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork(nn) {
        if (nn) {
            this.model = nn;
        }
        else {
            this.model = NeuralNetwork.createModel();
        }
    }
    NeuralNetwork.createModel = function () {
        var model = tf.sequential();
        var inputlayer = tf.layers.dense({
            inputShape: [INPUTS],
            units: NODES,
            activation: 'sigmoid'
        });
        var hiddenlayers = [];
        var totalHiddenLayer = 16;
        var nodes = NODES;
        for (var i = 0; i < totalHiddenLayer; i++) {
            hiddenlayers.push(tf.layers.dense({
                units: nodes,
                activation: 'relu'
            }));
        }
        var outputLayer = tf.layers.dense({
            units: OUTPUTS,
            activation: 'sigmoid'
        });
        model.add(inputlayer);
        hiddenlayers.forEach(function (layer) { return model.add(layer); });
        model.add(outputLayer);
        model.compile({ optimizer: "adam", loss: tf.losses.sigmoidCrossEntropy, metrics: 'accuracy' });
        return model;
    };
    NeuralNetwork.prototype.dispose = function () {
        this.model.dispose();
    };
    NeuralNetwork.prototype.copy = function () {
        var _this = this;
        // @ts-ignore
        return tf.tidy(function () {
            var modelCopy = NeuralNetwork.createModel();
            var w = _this.model.getWeights();
            for (var i = 0; i < w.length; i++) {
                w[i] = w[i].clone();
            }
            modelCopy.setWeights(w);
            var nn = new NeuralNetwork(modelCopy);
            return nn;
        });
    };
    NeuralNetwork.prototype.mutate = function (func) {
        var _this = this;
        tf.tidy(function () {
            var w = _this.model.getWeights();
            for (var i = 0; i < w.length; i++) {
                var shape = w[i].shape;
                var arr = w[i].dataSync().slice();
                for (var j = 0; j < arr.length; j++) {
                    arr[j] = func(arr[j]);
                }
                var newW = tf.tensor(arr, shape);
                w[i] = newW;
            }
            _this.model.setWeights(w);
        });
    };
    NeuralNetwork.prototype.predict = function (input_array) {
        var _this = this;
        // console.log(input_array);
        return tf.tidy(function () {
            var xs = tf.tensor([input_array]);
            var ys = _this.model.predict(xs);
            // @ts-ignore
            var y_values = ys.dataSync();
            return y_values;
        });
    };
    return NeuralNetwork;
}());
exports["default"] = NeuralNetwork;
