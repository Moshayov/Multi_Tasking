
/*כותבת פה הערות כדי שנבין מה לעשות אחר כך
בעקרון אנחנו אמורות ליצור בקשה ולשלוח לה אותו פה כאשר המידע עטוף כגיסון על פי סוג הבקשה הוא יפנה לרשת והרשת תפנה לשרת ולאחר מכן יחזור אלינו צריך לחשוב על פי מה ננתח את ההודעה כדי לדעת מאיפה ואיך לקבל תשובות  */
class FXMLHttpRequest{
  /* בין 1ל7 המצב של ההועה  זאת אומרת נשלח לשרת התקקבל וכולי */
  readyState=0;
  /*התגובה של השרת  */
  response;
  /*מחזירה מחרוזת המכילה את התגובה לבקשה כטקסט, או null אם הבקשה לא הצליחה או עדיין לא נשלחה.*/
  responseText;
  /*מצין את סוג התגובה */
  responseType;
  /* מחזירה את הכתובת הURL */
  responseURL;
  /*קוד תגובה */
  status;
  statusText;
  data = {};

  open(method, url, isAsync = true, user = null, task=null,task_name="",user_name=" ") {
    this.data = {
        "method": method,
        "url": url,
        "isAsinc": isAsync,
        "user": user,
        "task":task,
        "task_name":task_name,
        "user_name":user_name

    };
}
send(body = "", func = () => { }) {
  //TODO: send the request via network class
  let net = new Network();
  this.readyState=3;
  const d = this.data
  if (this.data["isAsinc"]) {
      net.send_to_server_async(JSON.stringify({ d, body }), func);
  }
  else {
     return net.send_to_server(JSON.stringify({ d, body }));
  }
}
  
}

