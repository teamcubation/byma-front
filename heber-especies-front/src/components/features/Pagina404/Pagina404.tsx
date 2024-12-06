import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Pagina404() {
    const navigate = useNavigate();
  return (
    <section className='min-h-screen w-full bg-fondo-light-404 bg-no-repeat bg-contain grid grid-cols-6 place-items-start'>
        <div className='col-start-3 col-span-4 w-5/6 h-full text-center flex flex-col justify-center items-center gap-14'>
            <h2 className='text-6xl text-foreground'>Error 404: Página no encontrada</h2>
            <p className='text-2xl text-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corporis excepturi fugit porro sapiente iure debitis minus voluptatum aperiam magni ex, ducimus dicta amet architecto, nulla eius? Qui quo nam neque doloremque est modi excepturi, eum a deleniti illo ipsum!</p>
            <Button className='w-fit' size={'lg'} onClick={() => navigate('/', { replace: true })}>Inicio</Button>
        </div>
    </section>
  )
}

export default Pagina404