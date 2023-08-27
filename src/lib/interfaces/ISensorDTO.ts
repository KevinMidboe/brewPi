enum Location {
  inside = 'inside',
  outside = 'outside'
}

interface ISensorDTO {
  location: Location;
  temperature?: number
  temperature_unit?: string
  humidity?: number
  humidity_unit?: string
  pressure?: number
  pressure_unit?: string
}

export {
  ISensorDTO,
  Location
}