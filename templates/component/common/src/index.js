const { Component } = require('@serverless-devs/s-core');
class MyComponent extends Component {
  async test(inputs) {
    // 输入的inputs参数结构
    console.log(JSON.stringify(inputs));
    
    // 将Args转成Object
    const tempArgs = this.args(inputs.Args, [], []);
    
    // 返回结果
    return {
      'Result': 'hello world',
      'Args': tempArgs
    };
    
  }
}
module.exports = MyComponent;