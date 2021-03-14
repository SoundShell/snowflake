import {
  GetNextMillisecondFunction,
  GetTimestampFunction,
  HandleClockBackFunction,
  HandleTimestampEqualFunction,
  NextMillisecondFunction
} from './interface/timestamp'

export const getTimestamp: GetTimestampFunction = () => BigInt(Date.now())
export const nextMillisecond: NextMillisecondFunction = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence
}) => {
  const nextSequence = (sequence + 1n) & maxSequence

  return nextSequence === 0n
    ? {
        timestamp: getNextMillisecond(timestamp, lastTimestamp),
        sequence: nextSequence
      }
    : { timestamp, sequence: nextSequence }
}

export const getNextMillisecond: GetNextMillisecondFunction = (
  timestamp,
  lastTimestamp
) =>
  timestamp <= lastTimestamp
    ? getNextMillisecond(getTimestamp(), lastTimestamp)
    : timestamp

export const handleTimestampEqual: HandleTimestampEqualFunction = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? nextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: 0n }

export const handleClockBack: HandleClockBackFunction = (timestamp) => (
  lastTimestamp
) => {
  if (timestamp < lastTimestamp) {
    return (
      `The clock moves backwards and rejects the id generated for ` +
      `${lastTimestamp - timestamp}.`
    )
  }
}