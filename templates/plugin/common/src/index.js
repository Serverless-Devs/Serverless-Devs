export function plugin(inputs) {
  // 输入的参数信息
  console.log(JSON.stringify(inputs));

  // 返回对应的结果
  // 此处的返回的内容，将会作为组件的入参，或者是整体的返回结果，所以要认真对待
  return inputs;
}
