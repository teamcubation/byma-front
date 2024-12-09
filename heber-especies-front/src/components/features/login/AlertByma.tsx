import { Button } from '@/components/ui/button'
import { InfoIcon, X } from 'lucide-react'

type Props = {
    message: string
    onClose: () => void
}

function AlertByma({ message, onClose }: Props) {
    return (
        <>
            <div className='fixed min-w-96 backdrop-blur-xl top-0 left-1/2 transform translate-y-1/4 -translate-x-1/2 text-white border-2 border-l-8 border-red-500 rounded-e-lg ps-2 pe-4 py-2 flex flex-row justify-between gap-3 z-10'>
                <div className='flex gap-8'>
                    <div className='h-9 w-9 flex items-center justify-center'>
                        <InfoIcon className="text-red-500" strokeWidth={2} size={24} />
                    </div>
                    <div>
                        <h3 className='text-base font-bold'>Error al iniciar sesión</h3>
                        <p className='text-sm'>{message}</p>
                    </div>
                </div>
                <Button className='' variant="ghost" size="icon" onClick={() => onClose()}>
                    <X strokeWidth={2} size={24} />
                </Button>
            </div>
        </>
    )
}

export default AlertByma