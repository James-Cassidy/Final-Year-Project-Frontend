function calculateSeconds(minutes: string, seconds: string) {
  return 180 - (parseInt(minutes) * 60 + parseInt(seconds))
}
export default calculateSeconds
