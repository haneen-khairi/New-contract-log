import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/navigation'
export default function NotificationItem({
    notificationType,
    notificationMsg,
    notificationDate,
    notificationTitle,
    notificationAction
}: NotificationProps) {
  
  const router = useRouter()
  function onNavigate(){
    if(notificationAction.action === "no_action") return
    router.push(`/en/${notificationAction?.id}`)
  }
  return <div onClick={onNavigate} className='notification__menu--item'>
    <span className='notification__menu--item-type'>{notificationType}</span>
    <Flex justifyContent={'space-between'} alignItems={'center'}>
        <h3 className='notification__menu--item-title'>{notificationTitle}</h3>
        <span className='notification__menu--item-date'>{notificationDate}</span>
    </Flex>
    <p className='notification__menu--item-msg'>{notificationMsg}</p>

    <hr />
  </div>
  
}
