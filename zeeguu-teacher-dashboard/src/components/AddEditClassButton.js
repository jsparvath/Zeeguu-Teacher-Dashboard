import React, { useState } from 'react'
import { Dialog } from '@reach/dialog'
import { MdClear } from 'react-icons/md/'
import '@reach/dialog/styles.css'
import './modal.scss'
import Button from './ui/Button'

const AddEditClassButton = ({ text, children }) => {
  const [displayModal, setDisplayModal] = useState(false)
  return (
    <div>
      <Button onClick={() => setDisplayModal(true)}>{text}</Button>
      {displayModal && (
        <Dialog className="ztd-modal">
          <button
            className="close-button"
            style={{ alignSelf: 'flex-end' }}
            onClick={() => setDisplayModal(false)}
          >
            <MdClear size="24px" />
          </button>
          {children(() => setDisplayModal(false))}
        </Dialog>
      )}
    </div>
  )
}

export default AddEditClassButton
