const MessageNotBlank = (value: string): string => {
  return `${value} can't be left blank!`;
};
const MessageIncorrect = (value: string): string => {
  return `${value}  incorrect format`;
};
export { MessageNotBlank, MessageIncorrect };
