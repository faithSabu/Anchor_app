import React, { useEffect, useState } from 'react'
import {
    Accordion, AccordionBody, Menu, MenuHandler, MenuList, MenuItem, Button,
  } from "@material-tailwind/react";
  import {format} from 'timeago.js'
  import { AiOutlineEllipsis } from "react-icons/ai";

function PostComments({item,accordionOpen,setAccordionOpen,change}) {
     // Accordion session

  const handleAccordionOpen = (value) => {
    setAccordionOpen(accordionOpen === value ? 0 : value);
  };
  // Accordion session
  useEffect(() => {
    
  
  }, [change])
  return (
    
    <div>
        <div className='px-4 bg-blue-200'>
                  <Accordion open={accordionOpen === item._id} >
                    <AccordionBody>
                      <div className='accordion max-h-[20vh] overflow-y-scroll'>
                        {item.comments.length ? (item.comments.slice(0).reverse()).map(elem => {
                          return <div key={elem._id} className='p-2'>
                            <div className='flex items-center justify-between'>
                              <div className='flex gap-3 items-center'>
                                <div>
                                  <img className='w-7 h-7 rounded-full outline outline-offset-2 outline-2 outline-[#0e1efb] cursor-pointer' src={elem.refUserProfileImg} alt="" />
                                </div>
                                <span className='text-base font-semibold'>{elem.refUsername}</span>
                                <span onClick={()=>console.log(elem)}>{elem.comment}</span>
                              </div>
                              <span>{format(elem.time)}</span>
                              <AiOutlineEllipsis className='text-lg cursor-pointer' />
                            </div>
                          </div>
                        })
                          :
                          <span>Be the first one to Comment...</span>
                        }
                      </div>
                    </AccordionBody>
                  </Accordion>
                </div>
    </div>
  )
}

export default PostComments