import TwoColLayout from './TwoColLayout'

// Backward compatible wrapper: this used to have a separate implementation + styles,
// but it is the same layout now.
export default function TwoColLayoutSecond(props) {
  return <TwoColLayout {...props} />
}
