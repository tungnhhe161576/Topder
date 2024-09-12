import { ButtomCustomStyled } from "./styled"
import '../button.scss'

const MyButton = (props) => {
  return (
    <ButtomCustomStyled
      {...props}
    >
      {props?.children}
    </ButtomCustomStyled>
  )
}

export default MyButton