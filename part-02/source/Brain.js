
const _random = function() {
    return (Math.random() * 2) - 1;
};

const _sigmoid = function(value) {
    return (1 / (1 + Math.exp((-1 * value) / 1)));
};

const Brain = function(settings) {
    this.layers = [];
};

Brain.prototype.initialize = function(inputs, outputs) {

    let input_size  = inputs.length;
    let output_size = outputs.length;

    let layers_size = 3;
    let hidden_size = 1;
    let weight_size = 0;

    if (input_size > output_size) {
        hidden_size = input_size;
        layers_size = Math.max(input_size - output_size, 3);
    } else {
        hidden_size = output_size;
        layers_size = Math.max(output_size - input_size, 3);
    }


    this.layers = new Array(layers_size).fill(0).map((layer, l) => {

        let prev = hidden_size;
        let size = hidden_size;

        // input layer
        if (l === 0) {
            prev = 0;
            size = input_size;
        // first hidden layer
        } else if (l === 1) {
            prev = input_size;
        // output layer
        } else if (l === layers_size - 1) {
            size = output_size;
        }

        // neuron has value and weights (for each previous neuron)
        return new Array(size).fill(0).map(_ => ({
            value:   _random(),
            weights: new Array(prev).fill(0).map(val => _random())
        }));


    });

};

Brain.prototype.compute = function(inputs) {

    let layers = this.layers;

    // set input values
    layers[0].forEach((neuron, n) => neuron.value = inputs[n]);


    // feed forward update
    layers.slice(1).forEach((layer, l) => {

        let prev_layer = layers[layers.indexOf(layer) - 1];

        layer.forEach(neuron => {

            // neuron.weights[p] represents connection
            let values   = prev_layer.map((prev, p) => prev.value * neuron.weights[p])
            let value    = values.reduce((a, b) => a + b, 0);
            neuron.value = _sigmoid(value);

        });

    });

    // return output values
    return layers[layers.length - 1].map(neuron => neuron.value);

};



let brain = new Brain();
let data  = { inputs: [1,0], outputs: [1] };

brain.initialize(data.inputs, data.outputs);


let outputs = brain.compute(data.inputs);

console.log('computed:', outputs);
console.log('expected:', data.outputs);

