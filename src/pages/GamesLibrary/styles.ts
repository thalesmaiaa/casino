import { styled, TextField } from '@mui/material'

export const WhiteBorderTextField = styled(TextField)`
  & .MuiInput-underline:before {
    border-bottom-color: #015f43;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #00be7e;
  }
`
