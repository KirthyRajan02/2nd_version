import * as d3 from 'd3'

export function getColorScale(maxParticipants: number) {
  return d3.scaleSequential()
    .domain([0, maxParticipants])
    .interpolator(d3.interpolate("#002E25", "#4FD1C5"))
} 