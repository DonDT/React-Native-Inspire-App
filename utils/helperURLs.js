export const dataToArray = data => {
  let array = [];

  data.forEach(element => {
    let item = element.val();
    let key = element.key;

    array.push(item);
  });

  return array;
};
