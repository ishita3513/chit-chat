import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'

const MessageContainer = () => {
	const {selectedConversation, setSelectedConversation}=useConversation();

	useEffect(()=>{
		//cleanup function(unmouts)
		return()=> setSelectedConversation(null)
	},[setSelectedConversation]);
	
	return (
	<>
	<div className='sm:h-[450px] md:min-w-[450px] flex flex-col rounded-md'>
		{!selectedConversation ? (<NoChatSelected/>):
		(
			<>
				{/*header*/}
				<div className='p-1 bg-slate-600 flex gap-2 items-center'>
					<div className='w-12 rounded-full'>
						<img src={selectedConversation.profilePic} alt='user avatar' />
					</div>
					<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
				</div>
				<Messages/>
				<MessageInput/>
			</>
		)}		
	</div>
	</>
  )
}

export default MessageContainer;

const NoChatSelected=()=>{
	const { authUser } = useAuthContext();

	return(
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p> 👋 {authUser.fullName}, Welcome</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center'/>
			</div>

		</div>
	)
}