import { GenerateIdFunction } from './interface/id'

export const generateId: GenerateIdFunction = ({
  twEpoch,
  timestampLeftShift,
  dataCenterId,
  dataCenterLeftShift,
  workId,
  workLeftShift
}) => ({ timestamp, sequence }) => ({
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (workId << workLeftShift) |
    sequence,
  lastTimestamp: timestamp,
  sequence
})
