self.addEventListener("push",t=>{let i=t.data.json();self.registration.showNotification(i.title,{body:i.body,icon:i.icon,vibrate:i.vibrate,data:i.data})}),self.addEventListener("notificationclick",t=>{t.notification.close();let i=t.notification.data.url;t.waitUntil(clients.matchAll({type:"window"}).then(t=>{for(let n=0;n<t.length;n++){let e=t[n];if(e.url===i&&"focus"in e)return e.focus()}if(clients.openWindow)return clients.openWindow(i)}))});