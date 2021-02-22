// This is not my own code. It is a function I use often and it comes from 
// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404

export default async (array: any[], callback: Function): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
