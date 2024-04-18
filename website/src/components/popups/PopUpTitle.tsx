import '../../styles/styles.scss'

interface PopUpTitleInterface {
  title: string
}

const PopUpTitle = ({ title }: PopUpTitleInterface) => {
  return (
    <h1 data-testid="pop-up-title" className="pop-up-title">
      {title}
    </h1>
  )
}

export default PopUpTitle
