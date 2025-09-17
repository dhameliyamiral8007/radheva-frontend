import React from 'react'
import { useTheme } from '../../config/hooks/useTheme'
import BookApoinment from './BookApoinment'

const BookApoinmentIndex = () => {
    const {colors} = useTheme()
    return (
        <div>
           <BookApoinment/>
        </div>
    )
}

export default BookApoinmentIndex
