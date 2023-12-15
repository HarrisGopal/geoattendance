
import { openDatabase } from 'react-native-sqlite-storage';
ExecuteQuery = (sql, params = [], lsmodlname, lsdbname) => new Promise((resolve, reject) => {
    var db = openDatabase({ name: lsdbname + '.db' });
    db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
                reject(error);
            });
    });
})
const Sqliteengine = {


    async CreateTable(lsmodelstructure, lsmodlname, lsdbname) {

        var lscreatequery = await this.SqliteCreatetable(lsmodelstructure, lsmodlname);



        let Table = await ExecuteQuery(lscreatequery, [], lsmodlname, lsdbname);
        // alert("Table"+JSON.stringify(Table));

    },

    async SqliteCreatetable(lsmodelstructure, lsmodlname) {





        // var lscreatequery = 'CREATE TABLE IF NOT EXISTS ' + lsmodlname + '(ore_id INTEGER PRIMARY KEY AUTOINCREMENT,';
        var lscreatequery = 'CREATE TABLE IF NOT EXISTS ' + lsmodlname + '(';

        var i = 0;
        lsmodelstructure.filter(function (obj) {
            // $.each(lsmodelstructure, function (index, obj) {

            //  if (i == 0) {
            // for (var key in obj) {
            //console.log(typeof (obj["datatype"]))
            var lsdatatype = obj["datatype"];
            switch (lsdatatype.toLowerCase()) {
                case 'string':
                    lscreatequery += obj["name"] + " VARCHAR(255),"
                    break;
                case 'integer':
                    if (obj["mode"] == "auto") {
                        lscreatequery += obj["name"] + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                    }
                    else
                        lscreatequery += obj["name"] + " INT(20),"
                    break;
                case 'number':
                    if (obj["mode"] == "auto") {
                        lscreatequery += obj["name"] + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                    }
                    else
                        lscreatequery += obj["name"] + " INT(20),"
                    break;
                case 'bool':
                    lscreatequery += obj["name"] + " VARCHAR(255),"
                    break;
                case 'date':
                    lscreatequery += obj["name"] + " VARCHAR(255),"
                    break;                 // }

            }

            i = i + 1;
            //}
        });
        lscreatequery = lscreatequery.substring(0, lscreatequery.length - 1);
        lscreatequery = lscreatequery + ")";
        console.log(lscreatequery);
        return lscreatequery;
    },


    async SqliteInsert(lsdata, lsmodlname, lsdbname) {


        let countryQuery = "INSERT INTO " + lsmodlname + " ("
        var i = 0;
        lsdata.filter(function (obj) {
            //if (i == 0) {
            for (var key in obj) {
                countryQuery = countryQuery + key + ","
                i = i + 1;
            }
            //}
        });
        countryQuery = countryQuery.substring(0, countryQuery.length - 1);
        countryQuery = countryQuery + ")VALUES";
        debugger
        var lsinit = 0;
        lsdata.filter(function (obj) {

            countryQuery = countryQuery + "("
            for (var key in obj) {

                if (lsinit == 0) {
                    if (obj[key] == null || obj[key] == 0)
                        countryQuery += "NULL,";
                    else
                        countryQuery += "'" + obj[key] + "',"
                    lsinit = lsinit + 1;
                }
                else
                    countryQuery += "'" + obj[key] + "'," //id


            }
            countryQuery = countryQuery.substring(0, countryQuery.length - 2);
            countryQuery += "'),";

        });
        countryQuery = countryQuery.substring(0, countryQuery.length - 1);

        countryQuery = countryQuery + ";";
        console.log(countryQuery);
        let countryMultipleInsert = await ExecuteQuery(countryQuery, [], lsmodlname, lsdbname);
        console.log(countryMultipleInsert);
        if (countryMultipleInsert.rowsAffected == 1) {
            return { status: true, message: "Success", data: countryMultipleInsert };
        }
        else {
            return { status: false, message: "SelectQuery: Data not found ", data: "" };
        }
    },

    //Sqlite enhancement works[OLS-I934 30-11-22 ORE025]
    async UpdateQuery(lsmoddata, lsmodlname, lsdbname, key, keyValue) {
        let lsupdateQury = "UPDATE " + lsmodlname + " SET "
        lsmoddata.filter(function (obj) {
            for (var key in obj) {
                lsupdateQury = lsupdateQury + key + "='" + obj[key] + "',"

            }
        });
        lsupdateQury = lsupdateQury.substring(0, lsupdateQury.length - 1);
        if (typeof (lsmoddata[0][key]) == "string")
            lsupdateQury = lsupdateQury + " where " + key + "='" + keyValue + "'";
        else
            lsupdateQury = lsupdateQury + " where " + key + "=" + keyValue;
        let updateQuery = await ExecuteQuery(lsupdateQury, [], lsmodlname, lsdbname);
        return { status: true, message: "Success", data: updateQuery };
    },
    //End[OLS-I934 30-11-22 ORE025]
    //Model Update Single Value Method to binding SQLite Database[OLS-I990 ORE025 16-2-23]
    async UpdateSingleColumnQuery(lsmodlname, lsdbname, key, keyValue, colName, colValue) {
        if (typeof (keyValue) == "string")
            var lsupdateQury = "UPDATE " + lsmodlname + " SET " + colName + "='" + colValue + "' where " + key + "='" + keyValue + "'"
        else
            var lsupdateQury = "UPDATE " + lsmodlname + " SET " + colName + "='" + colValue + "' where " + key + "=" + keyValue
        let updateQuery = await ExecuteQuery(lsupdateQury, [], lsmodlname, lsdbname);
        return { status: true, message: "Success", data: updateQuery };
    },
    //End[OLS-I990 ORE025 16-2-23]
    async DeleteQuery(lsmoddata, lsmodlname, lsdbname, key, keyValue) {
        let lsupdateQury = "Delete from " + lsmodlname;
        //Delete removed first row only [17-11-2022 ORE025]
        if (typeof (lsmoddata[0][key]) == "string")
            lsupdateQury = lsupdateQury + " where " + key + "='" + keyValue + "'";
        //lsupdateQury = lsupdateQury + " where " + key + "='" + lsmoddata[0][key] + "'";
        else
            lsupdateQury = lsupdateQury + " where " + key + "=" + keyValue;
        // lsupdateQury = lsupdateQury + " where " + key + "=" + lsmoddata[0][key];
        //End[17-11-2022 ORE025]
        let DeleteQuery = await ExecuteQuery(lsupdateQury, [], lsmodlname, lsdbname);
        return { status: true, message: "Success", data: DeleteQuery };
    },

    async DeleteAll(lsmodlname, lsdbname) {
        try {
            let lsupdateQury = "Delete from " + lsmodlname;
            let DeleteQuery = await ExecuteQuery(lsupdateQury, [], lsmodlname, lsdbname);
            console.log("Sqlite succe DeleteAll:");
            return { status: true, message: "Success", data: DeleteQuery };
        }
        catch {
            console.log("Sqlite failed DeleteAll: ");
            return { status: false, message: "SQLite Delete Issue ", data: "" };

        }
    },


    async FilterQuery(lsquery, lsmodelname, lsdbname, lsfilter) {
        try {
            var lsquery = "select * from " + lsmodelname + " where " + lsfilter;

            let selectQuery = await ExecuteQuery(lsquery, [], lsmodelname, lsdbname);
            var rows = selectQuery.rows;
            console.log("rows" + JSON.stringify(rows.raw()))


            if (rows.raw().length > 0) {
                return { status: true, message: "Success", data: rows.raw() };
            }
            else {
                return { status: false, message: "FilterQuery: Data not found ", data: "" };
            }

        }
        catch {
            return { status: false, message: "FilterQuery: Data not found ", data: "" };

        }

    },
    async FilterQueryIf(lsquery, lsmodelname, lsdbname, lsfilter) {
        try {
            var lsquery = "select " + lsfilter + " from " + lsmodelname;
            //var lsquery="select * from "+lsmodelname;

            let selectQuery = await ExecuteQuery(lsquery, [], lsmodelname, lsdbname);
            var rows = selectQuery.rows;
            console.log("rows" + JSON.stringify(rows.raw()))


            if (rows.raw().length > 0) {
                return { status: true, message: "Success", data: rows.raw() };
            }
            else {
                return { status: false, message: "FilterQuery: Data not found ", data: "" };
            }

        }
        catch {
            return { status: false, message: "FilterQuery: Data not found ", data: "" };

        }

    },
    async SelectQuery(lsquery, lsmodelname, lsdbname) {

        var lsquery = "select * from " + lsmodelname;

        let selectQuery = await ExecuteQuery(lsquery, [], lsmodelname, lsdbname);
        var rows = selectQuery.rows;
        console.log("rows" + JSON.stringify(rows.raw()))


        if (rows.raw().length > 0) {
            return { status: true, message: "Success", data: rows.raw() };
        }
        else {
            return { status: false, message: "SelectQuery: Data not found ", data: "" };
        }



    },

    async SelectsingleQuery(lsmoddata, lsmolsquery, lsmodelname, lsdbname, key) {

        var lsquery = "select * from " + lsmodelname + " where " + key + "='" + lsmoddata + "'";
        console.log(lsquery)
        let selectQuery = await ExecuteQuery(lsquery, [], lsmodelname, lsdbname);
        var rows = selectQuery.rows;
        console.log("rows" + JSON.stringify(rows.raw()))


        if (rows.raw().length > 0) {
            return { status: true, message: "Success", data: rows.raw() };
        }
        else {
            return { status: false, message: "SelectQuery: Data not found ", data: "" };
        }



    }


}
export default Sqliteengine;