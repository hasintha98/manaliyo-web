import { cilArrowRight, cilSave, cilXCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../../common/colors'



function ErrorModal({ title, description, open, onOpen, addAnother = null }) {
  const navigate = useNavigate()
  return (
    <CModal
      alignment="center"
      visible={open}
      onClose={() => onOpen(false)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody className="m-3">
        <div
          style={{
            textAlign: 'center',
          }}
          className="mb-3"
        >
          {/* <CIcon icon={cilSave} size="3xl" /> */}
          <CIcon style={{ color: COLORS.RED_BTN }} icon={cilXCircle} width={80} />
        </div>
        <p style={{ textAlign: 'center', fontSize: "1.2em" }}>{description}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="light" onClick={() => onOpen(false)}>
          Close
        </CButton>
        {addAnother && (
          <CButton
            color="primary"
            style={{ backgroundColor: COLORS.RED_BTN, border: '0px' }}
            onClick={() => {
              addAnother()
              onOpen(false)
            }}
          >
            Add Another
          </CButton>
        )}
     
      </CModalFooter>
    </CModal>
  )
}

export default ErrorModal
