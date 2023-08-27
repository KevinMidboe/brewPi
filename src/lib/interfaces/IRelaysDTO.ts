enum Controls {
  heating = 'heating',
  cooling = 'cooling',
  fan = 'fan',
  lights = 'lights'
}

interface IRelaysDTO {
  controls: Controls;
  pin: number;
  state: boolean;
}

export {
  IRelaysDTO,
  Controls
}