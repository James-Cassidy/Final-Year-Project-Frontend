import { useCallback, useContext } from 'react'
import { SettingsContext } from '../../SettingsContext/SettingsContext'

interface AdminOptionButtonInterface {
  id: string
  title: string
  method?: () => void
}

const AdminOptionButton = ({
  id,
  title,
  method,
}: AdminOptionButtonInterface) => {
  const prefix = useContext(SettingsContext).getStylePrefix()

  return (
    <button
      className={`${prefix}-admin-menu-button`}
      onClick={method}
      id={id}
      data-testid={id}
    >
      {title}
    </button>
  )
}

export default AdminOptionButton
