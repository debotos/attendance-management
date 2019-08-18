// Database(https://github.com/louischatriot/nedb)
import Datastore from 'nedb'

var db = {};

db.due = new Datastore({ filename: 'due.db', autoload: true });
