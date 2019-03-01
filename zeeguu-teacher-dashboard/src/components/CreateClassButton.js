import React, { useState } from 'react'
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog'
import { MdClear } from 'react-icons/md/'
import '@reach/dialog/styles.css'
import CreateClass from './CreateClass'
import './modal.scss'
import Button from './ui/Button'

const CreateClassButton = () => {
  const [displayModal, setDisplayModal] = useState(false)
  return (
    <div>
      <Button onClick={() => setDisplayModal(true)}>Create new class</Button>
      {displayModal && (
        <Dialog className="ztd-modal">
          <button
            className="close-button"
            style={{ alignSelf: 'flex-end' }}
            onClick={() => setDisplayModal(false)}
          >
            <MdClear size="24px" />
          </button>
          <CreateClass />
        </Dialog>
      )}
    </div>
  )
}

export default CreateClassButton
