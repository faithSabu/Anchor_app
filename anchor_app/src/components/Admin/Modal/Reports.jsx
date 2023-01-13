import React from 'react'

function Reports({ setReportsModalIsOpen, reportReasons }) {

  
  
  return (
    <>
      <div onClick={() => setReportsModalIsOpen(false)} className='fixed z-20 h-screen w-screen flex justify-center items-center top-0 left-0' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.2)' }}>
        <div onClick={(e) => {
          if (!e) var e = window.event;
          e.cancelBubble = true;
          if (e.stopPropagation) e.stopPropagation();
        }} className='bg-white h-auto w-auto py-4 rounded-2xl flex justify-center items-center overflow-hidden'>
          <div className='w-[400px] h-[400px]'>
            <div className=' border-b border-black px-5 flex justify-center'>
              <span className='font-semibold'>Reported Reasons</span>
            </div>
            <ol>
              <li>
                {reportReasons.map(item => (
                  <div className='px-5 py-1 flex flex-col justify-center items-center pt-5'>
                    <span>{item}</span>
                  </div>
                ))}
              </li>

            </ol>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports