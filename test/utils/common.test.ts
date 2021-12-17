import core from '../../src/utils/core'
const { colors } = core;


const makeUnderLine = (text: string) => {
    const matchs = text.match(/http[s]?:\/\/[^\s]+/);
    const def = text.replace(matchs[0], colors.underline(matchs[0]));
    console.log(text);
    console.log(def);
}

makeUnderLine("abc https://baidu.com/sds/ds/index.html ncie to seee you!");