import { Box, Modal, styled } from '@mui/material'

export const AuthModal = styled(Modal)``

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #000;
  box-shadow: 24;
  padding: 2rem;
  background: #323238;
  z-index: 20;
  min-height: 400px;
  min-width: 600px;

  display: flex;
  flex-direction: column;
`

export const ModalHeader = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const InputArea = styled(Box)`
  background: white;
  padding: 0.4rem;
  border-radius: 6px;
`
