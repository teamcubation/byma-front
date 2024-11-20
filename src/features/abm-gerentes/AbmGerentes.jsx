import React, { useCallback, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { ChevronRight, LucideEdit, LucideTrash2, SearchIcon } from 'lucide-react'
import Input from '../../components/abm-gerentes/Input'
import Table from '../../components/abm-gerentes/Table'
import TableHead from '../../components/abm-gerentes/TableHead'
import axios from 'axios'
import Chip from '../../components/abm-gerentes/Chip'
const AbmGerentes = () => {

    const data = [
        {
            idRegistro: 1,
            idOrganizacion: 1001,
            denominacion: "Gerente General S.A.",
            liquidaEnByma: true,
            habilitado: true,
            observaciones: "Gerente principal de la organización",
            mailGerente: "gerente1@example.com",
            fechaDeAlta: "2023-01-15T09:30:00",
        },
        {
            idRegistro: 2,
            idOrganizacion: 1002,
            denominacion: "Fondos Seguros S.A.",
            liquidaEnByma: false,
            habilitado: true,
            observaciones: "Gerente especializado en fondos comunes",
            mailGerente: "gerente2@example.com",
            fechaDeAlta: "2023-02-20T14:00:00",
        },
        {
            idRegistro: 3,
            idOrganizacion: 1003,
            denominacion: "Inversiones XYZ S.A.",
            liquidaEnByma: true,
            habilitado: false,
            observaciones: "Gerente con más de 10 años de experiencia",
            mailGerente: "gerente3@example.com",
            fechaDeAlta: "2023-03-10T11:45:00",
        },
        {
            idRegistro: 4,
            idOrganizacion: 1004,
            denominacion: "Capital Trust S.A.",
            liquidaEnByma: true,
            habilitado: true,
            observaciones: "Nuevo gerente ingresado en el último trimestre",
            mailGerente: "gerente4@example.com",
            fechaDeAlta: "2023-04-25T16:15:00",
        },
        {
            idRegistro: 5,
            idOrganizacion: 1005,
            denominacion: "ABC Fondos S.A.",
            liquidaEnByma: false,
            habilitado: true,
            observaciones: "Especialista en inversiones conservadoras",
            mailGerente: "gerente5@example.com",
            fechaDeAlta: "2023-05-05T10:00:00",
        },
        {
            idRegistro: 6,
            idOrganizacion: 1006,
            denominacion: "Delta Capital S.A.",
            liquidaEnByma: true,
            habilitado: false,
            observaciones: "Gerente suspendido temporalmente",
            mailGerente: "gerente6@example.com",
            fechaDeAlta: "2023-06-15T12:30:00",
        },
        {
            idRegistro: 7,
            idOrganizacion: 1007,
            denominacion: "Fideicomisos Globales S.A.",
            liquidaEnByma: true,
            habilitado: true,
            observaciones: "Gerente con enfoque en fideicomisos",
            mailGerente: "gerente7@example.com",
            fechaDeAlta: "2023-07-10T09:00:00",
        },
        {
            idRegistro: 8,
            idOrganizacion: 1008,
            denominacion: "Inversiones Sólidas S.A.",
            liquidaEnByma: false,
            habilitado: true,
            observaciones: "Enfocado en inversiones de alto rendimiento",
            mailGerente: "gerente8@example.com",
            fechaDeAlta: "2023-08-22T13:15:00",
        },
        {
            idRegistro: 9,
            idOrganizacion: 1009,
            denominacion: "Activos Capitales S.A.",
            liquidaEnByma: true,
            habilitado: true,
            observaciones: "Gerente destacado en el área de activos",
            mailGerente: "gerente9@example.com",
            fechaDeAlta: "2023-09-18T10:30:00",
        },
        {
            idRegistro: 10,
            idOrganizacion: 1010,
            denominacion: "Patrimonios Seguros S.A.",
            liquidaEnByma: false,
            habilitado: false,
            observaciones: "Gerente retirado recientemente",
            mailGerente: "gerente10@example.com",
            fechaDeAlta: "2023-10-05T15:45:00",
        },
    ];

    const columnas = [
        {
            label: "Id Registro",
            key: "idRegistro"
        },
        {
            label: "Id Organizacion",
            key: "idOrganizacion"
        },
        {
            label: "Denominacion",
            key: "denominacion"
        },
        {
            label: "Liquida En Byma",
            key: "liquidaEnByma"
        },
        {
            label: "Habilitado",
            key: "habilitado"
        },
        {
            label: "Observaciones",
            key: "observaciones"
        },
        {
            label: "Mail Gerente",
            key: "mailGerente"
        },
        {
            label: "Fecha De Alta",
            key: "fechaDeAlta"
        },
        {
            label: "Acciones",
            key: "acciones"
        }
    ];

    const renderCell = useCallback((row, columnKey) => {
        const cellValue = row[columnKey];
        switch (columnKey) {
            case "idRegistro":
                return <p className="text-center">{cellValue}</p>;
            case "idOrganizacion":
                return <p className="text-center">{cellValue}</p>;
            case "denominacion":
                return <p className="text-center">{cellValue}</p>;
            case "liquidaEnByma":
                return <Chip className={cellValue ? "bg-green-500 text-white" : "bg-red-500 text-white"}><div className=' text-white'>{cellValue ? "Si" : "No"}</div></Chip>;
            case "habilitado":
                return <Chip className={cellValue ? "bg-green-500 text-white" : "bg-red-500 text-white"}><div className=' text-white'>{cellValue ? "Habilitado" : "Deshablitado"}</div></Chip>;
            case "observaciones":
                return <p className="text-center">{cellValue}</p>;
            case "mailGerente":
                return <p className="text-center">{cellValue}</p>;
            case "fechaDeAlta":
                return <p className="text-center">{cellValue}</p>;
            case "acciones":
                return <div className="text-center flex gap-2 justify-center items-center">
                    <LucideEdit size={20} />
                    <LucideTrash2 size={20} />
                </div>;
            default:
                return cellValue;
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/gerentes");
            const data = response.data;
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        fetchData();
    }, [])

    return (
        <section className='px-12'>
            <div className='flex gap-2 items-center my-4'>
                <Breadcrumb text={'home'} href={'/'} className="text-base text-byma-acento" />
                <ChevronRight size={24} />
                <Breadcrumb text={'ABM Gerentes'} href={'/abm-gerentes'} className="text-base text-byma-acento" />
            </div>

            <h1 className='text-5xl font-bold text-gray-400 my-4'>ABM Gerentes</h1>

            <Input className="w-full p-2 border-2 border-black rounded-xl my-4" type='search' placeholder='Buscar' endContent={<SearchIcon size={18} />} />
            <Table>
                <TableHead columnas={columnas} />
                {/* <thead>
                    <tr>

                        {
                            data.map((gerente, index) => {
                                return (
                                    <td>{Object.keys(gerente)[index]}</td>
                                )
                            })
                        }
                    </tr>
                </thead> */}
                <tbody>
                    {
                        data.map((gerente) => {
                            console.log(gerente);
                            return (<tr key={gerente.id}>
                                {
                                    columnas.map((columna) => {
                                        return (
                                            <td key={columna.key} align='center'>{renderCell(gerente, columna.key)}</td>
                                        )
                                    })
                                }
                            </tr>)
                            // const values = Object.values(gerente);

                            // return (
                            //     <tr>
                            //         {values.map((value) => <td align='center'>{value}</td>)}
                            //     </tr>
                            // )
                        })
                    }
                </tbody>
            </Table>
        </section>
    )
}

export default AbmGerentes