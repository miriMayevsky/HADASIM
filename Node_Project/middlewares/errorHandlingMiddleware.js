// export const errorHandling=((err,req,res,next)=>{
//     let statusCode=res.statusCode||500;
//     let message=res.message|| "sorry there is error in server"
//     res.status(statusCode).send(message)
//  })


/**
 * פונקציה זו מטפלת בשגיאות שעלולות להתרחש בשרת.
 * היא משתמשת בקוד הבא:
 * - השמת ערך ברירת מחדל למשתנה statusCode במקרה שאין קוד סטטוס שנקבע מראש בתשובה.
 * - השמת ערך ברירת מחדל למשתנה message במקרה שאין הודעת שגיאה שנקבעת מראש בתשובה.
 * - שליחת תשובת השגיאה ללקוח עם קוד סטטוס והודעת שגיאה המתקבלים מהמשתנים statusCode ו- message.
 * 
 * @param {Error} err - השגיאה שקיבל השרת.
 * @param {Object} req - הבקשה שנשלחה לשרת.
 * @param {Object} res - התשובה שנשלחת מהשרת.
 * @param {Function} next - פונקציה המסייעת בהמשך תהליך הטיפול בשגיאה במידת הצורך.
 */
 export const errorHandling = (err, req, res, next) => {
    let statusCode = res.statusCode || 500;
    let message = res.message || "שגיאה בשרת";

    if (err.message) {
        message = err.message;
    }

    res.status(statusCode).send(message);
}
