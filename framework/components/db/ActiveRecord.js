var Model = require('./../../base/Model');
var app = require('./../../app');

class ActiveRecord extends Model {

    static get tableName() {
    }

    static get primaryKey() {
        return 'id';
    }

    static findOne(condition, asArray) {
        let promise = new Promise((resolve, reject) => {
            let sql = this.findByCondition(condition, asArray).limit(1);
            console.log(sql.toString());
            sql
                .then(raws => {
                    resolve(raws.length > 0 ? (new this(raws[0])) : [])
                })
                .catch(error => {
                    reject(error);
                });
        });
        return promise;
    }


    static findByCondition(condition, asArray) {
        let query = {condition: condition};
        if (Number.isInteger(condition)) {
            query.condition = {};
            query.condition[this.primaryKey] = condition;
        }
        return this.find(query, asArray);
    }


    static find(query, asArray) {
        let sql = app.db;
        sql = sql.select(query.select ? query.select : '*');
        sql = sql.from(this.tableName);
        if (query.condition) {
            sql = sql.where(query.condition);
        }
        if (query.limit) {
            sql = sql.limit(query.limit);
        }
        return sql;
    }

    // $isNewRecord	boolean	Whether the record is new and should be inserted when calling save().

    // afterDelete()	This method is invoked after deleting a record.
    // afterFind()	This method is called when the AR object is created and populated with the query result.
    // afterSave()	This method is called at the end of inserting or updating a record.
    // beforeDelete()	This method is invoked before deleting a record.
    // beforeSave()	This method is called at the beginning of inserting or updating a record.
    // delete()	Deletes the table row corresponding to this active record.
    // deleteAll()	Deletes rows in the table using the provided conditions.
    // findAll()	Returns a list of active record models that match the specified primary key value(s) or a set of column values.
    // save()	Saves the current record.
    // update()	Saves the changes to this active record into the associated database table.
    // updateAll()	Updates the whole table using the provided attribute values and conditions.
}

module.exports = ActiveRecord;
