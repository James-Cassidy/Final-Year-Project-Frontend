import '../../styles/styles.scss'

interface PopUpButtonInterface {
  id: string
  onClose: () => void
  className?: string
  text?: string
  disabled?: boolean
}

const PopUpButton = ({
  id: componentId,
  className,
  onClose,
  text,
  disabled,
}: PopUpButtonInterface) => {
  return (
    <button
      id="pop-up-close-button"
      className={className ? className : 'pop-up-button'}
      data-testid={`${componentId}-close-button`}
      onClick={onClose}
      disabled={disabled}
    >
      {text ? text : 'Back'}
    </button>
  )
}

export default PopUpButton
