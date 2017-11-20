import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const FOCI_NOTIFICATIONS_KEY="mobile:foci:notifications"

export function clearAllNotifications(){
    return AsyncStorage.removeItem(FOCI_NOTIFICATIONS_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createStudyReminderNotification(){
    return {
        title:"Hi, it's Foci",
        body:"What is your focused practice today?",
        android:{
            sound: true,
            priority:'high',
            sticky:false,
            vibrate:true
        }
    }
}

export function scheduleStudyReminderNotification(){
    AsyncStorage.getItem(FOCI_NOTIFICATIONS_KEY)
        .then((data) => {
            return JSON.parse(data)
        })
        .then(data => {
            if(data===null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status}) => {
                    if(status==='granted'){
                        Notifications.cancelAllScheduledNotificationsAsync()
                        let tomorrow = new Date() 
                        tomorrow.setDate(tomorrow.getDate()+1)
                        tomorrow.setHours(20)
                        tomorrow.setMinutes(20)

                        const studyReminderNotification = createStudyReminderNotification()
                        //console.log(studyReminderNotification)
                        Notifications.scheduleLocalNotificationAsync(
                            studyReminderNotification,
                            {
                                time:tomorrow,
                                repeat:'day'
                            }
                        )
                        .catch( (reason) => {
                            console.log(reason)
                        })
                        AsyncStorage.setItem(FOCI_NOTIFICATIONS_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}