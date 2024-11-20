import React from 'react'

const TableHead = ({ columnas }) => {
    return (
        <thead className='border-b-2'>
            <tr>
                {
                    columnas.map((columna, index) => (
                        <th key={columna.key}>{columna.label}</th>
                    ))
                }
            </tr>

        </thead>
    )
}

export default TableHead