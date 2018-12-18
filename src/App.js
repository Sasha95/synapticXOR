import React, { Component } from "react";
import { Layer, Network } from "synaptic";

const inputLayer = new Layer(2);
const hiddenLayer = new Layer(3);
const outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

class App extends Component {
  state = {
    first: undefined,
    sec: undefined,
    thr: undefined,
    fo: undefined
  };
  f = () => {
    const learningRate = 0.1;
    for (let i = 0; i < 20000; i++) {
      // 0,0 => 0
      myNetwork.activate([0, 0]);
      myNetwork.propagate(learningRate, [0]);

      // 0,1 => 1
      myNetwork.activate([0, 1]);
      myNetwork.propagate(learningRate, [1]);

      // 1,0 => 1
      myNetwork.activate([1, 0]);
      myNetwork.propagate(learningRate, [1]);

      // 1,1 => 0
      myNetwork.activate([1, 1]);
      myNetwork.propagate(learningRate, [0]);
    }
    this.setState({
      first: myNetwork.activate([0, 0]),
      sec: myNetwork.activate([0, 1]),
      thr: myNetwork.activate([1, 0]),
      fo: myNetwork.activate([1, 1])
    });
  };
  render() {
    return (
      <div className="text">
        <br />
        <button onClick={this.f}>start</button>
        <br />
        {this.state.first} <br />
        {this.state.sec} <br />
        {this.state.thr} <br />
        {this.state.fo}
      </div>
    );
  }
}

export default App;
