const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

const randomColor = () =>{
  return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export { randomNumber , randomColor }