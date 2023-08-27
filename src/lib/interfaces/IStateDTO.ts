enum State {
  idle = 'idle',
  cooling = 'cooling',
  heating = 'heating'
}

interface IStateDTO {
  goal: number;
  state: State
}

export {
  IStateDTO,
  State
}