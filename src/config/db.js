// Database(https://github.com/louischatriot/nedb)
import Datastore from 'nedb-promises'

var db = {}

db.subject = new Datastore({ filename: 'subject.db', autoload: true })
db.student = new Datastore({ filename: 'student.db', autoload: true })
db.attendance = new Datastore({ filename: 'attendance.db', autoload: true })

export default db
