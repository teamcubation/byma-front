import React from 'react'

const Table = ({ children }) => {
    return (
        <>
            <table className='table-auto w-full'>
                {children}
            </table>
        </>
    )
}

export default Table