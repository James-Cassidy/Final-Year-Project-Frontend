import ClockLoader from 'react-spinners/ClockLoader'
import '../../styles/styles.scss'
import './loading-clock.css'

const CustomClockLoader = () => {
  return (
    <div className="loading-clock-wrapper">
      <div className="loading-clock-container" data-testid="loading-clock">
        <ClockLoader color={'#F37A24'} loading={true} size={50} />
      </div>
    </div>
  )
}

export default CustomClockLoader
