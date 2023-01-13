import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { reportComment, reportPost } from '../../../api/PostRequests';


function ReportModal({ setReportModalIsOpen, reportValue, postId, commentId }) {

  const [reason, setReason] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    setReportModalIsOpen(false)
    e.preventDefault()
    if (reportValue === 'Comment') {
      reportComment(postId, commentId, reason).catch(()=>navigate('/error'))
    }
    if (reportValue === 'Post') {
      reportPost(postId, reason).catch(()=>navigate('/error'))
    }
  }

  return (

    //custom ReportModal start
    <>
      <div onClick={() => setReportModalIsOpen(false)} className='fixed z-20 h-screen w-screen flex justify-center items-center top-0 left-0' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.2)' }}>
        <div onClick={(e) => {
          if (!e) var e = window.event;
          e.cancelBubble = true;
          if (e.stopPropagation) e.stopPropagation();
        }} className='bg-white h-auto w-auto py-4 rounded-2xl flex justify-center items-center overflow-hidden'>
          <div>
            <div className='font-semibold text-base mb-1 px-10'>
              Report {reportValue}
            </div>
            <div className='h-[.7px] w-full bg-gray-500 my-1'></div>
            <div className='flex flex-col gap-2 '>
              <form onSubmit={handleSubmit}>
                <div className='text-base hover:bg-gray-200 p-1 px-8'>
                  <input type="radio" name='reason' id='1' value='Hateful Content' checked={reason === "Hateful Content"} onChange={(e) => {
                    setReason(e.target.value)
                  }} />
                  <label htmlFor="1" className='ml-5'>Hateful Content</label>
                </div>
                <div className='text-base hover:bg-gray-200 p-1 px-8'>
                  <input type="radio" name='reason' id='2' value='Harassment or bullying' checked={reason === "Harassment or bullying"} onChange={(e) => {
                    setReason(e.target.value)
                  }} />
                  <label htmlFor="2" className='ml-5'>Harassment or bullying</label>
                </div>
                <div className='text-base hover:bg-gray-200 p-1 px-8'>
                  <input type="radio" name='reason' id='3' value='Unwanted commercial content or spam' checked={reason === "Unwanted commercial content or spam"} onChange={(e) => {
                    setReason(e.target.value)
                  }} />
                  <label htmlFor="3" className='ml-5'>Unwanted commercial content or spam</label>
                </div>
                <div className='text-base hover:bg-gray-200 p-1 px-8'>
                  <input type="radio" name='reason' id='4' value='Child Abuse' checked={reason === "Child Abuse"} onChange={(e) => {
                    setReason(e.target.value)
                  }} />
                  <label htmlFor="4" className='ml-5'>Child Abuse</label>
                </div>
                <div className='text-base hover:bg-gray-200 p-1 px-8'>
                  <input type="radio" name='reason' id="mis" value='Misinformation' checked={reason === "Misinformation"} onChange={(e) => {
                    setReason(e.target.value)
                  }} />
                  <label htmlFor="mis" className='ml-5'>Misinformation</label>
                </div>
                <div className='flex justify-end px-8'>
                  {
                    reason.trim() ?
                      <button type='submit' className='font-semibold'>Report</button>
                      :
                      <span className='font-semibold text-gray-300'>Report</span>
                  }
                </div>
              </form>
            </div>
          </div>


        </div>
      </div>
    </>
    //custom ReportModal end
  )
}

export default ReportModal