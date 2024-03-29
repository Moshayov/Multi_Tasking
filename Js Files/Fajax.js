
/*כותבת פה הערות כדי שנבין מה לעשות אחר כך
בעקרון אנחנו אמורות ליצור בקשה ולשלוח לה אותו פה כאשר המידע עטוף כגיסון על פי סוג הבקשה הוא יפנה לרשת והרשת תפנה לשרת ולאחר מכן יחזור אלינו צריך לחשוב על פי מה ננתח את ההודעה כדי לדעת מאיפה ואיך לקבל תשובות  */

const fajax = {
    send: function(url, method, data, callback) {
      // Simulate delay to mimic network latency
      setTimeout(() => {
        let response;
        switch (url) {
          case '/api/getAll':
            response = JSON.stringify({ data: BaseData.getAll() });
            break;
          case '/api/getTask':
            response = JSON.stringify({ data: BaseData.get_task(data.task_name, data.user_name) });
            break;
          case '/api/addTask':
            BaseData.post(data.task_name, data.user_name);
            response = JSON.stringify({ message: 'Task added successfully' });
            break;
          // Add other cases for different API endpoints
          default:
            response = JSON.stringify({ error: 'Invalid URL' });
        }
        callback(null, response);
      }, 500); // Simulate 500ms delay
    }
  };