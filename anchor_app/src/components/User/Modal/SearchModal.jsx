import React, { useContext } from 'react'
import {
    Accordion, AccordionBody, Menu, MenuHandler, MenuList, MenuItem, Button,
  } from "@material-tailwind/react";
import { searchContext } from '../../../context/SearchContext';

function SearchModal() {
    const {searchModalIsopen,setSearchModalIsopen} = useContext(searchContext)
    return (
        // <div className='fixed top-16 h-screen w-screen'>
            <div onClick={() => setSearchModalIsopen(0)} className='fixed top-0 left-0 z-20 h-screen w-screen flex justify-center items-center' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.45 )' }}>
            <Accordion open={searchModalIsopen === 1} >
                <AccordionBody>
                    <div >
                        dsfsdfsdf
                    </div>
                </AccordionBody>
            </Accordion>
            </div>
    )
}

export default SearchModal