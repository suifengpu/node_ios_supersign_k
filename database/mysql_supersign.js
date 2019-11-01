var mysql = require("mysql");
var util = require("util");

var Response = require("../apps/Response");
var log = require("../utils/log");

var conn_pool = null;
function connect_to_server(host, port, db_name, user, password){
    conn_pool = mysql.createPool({
        host: host,
        port: port,
        database: db_name,
        user: user,
        password: password
    });
}

function mysql_exec(sql, callback) {
	conn_pool.getConnection(function(err, conn) {
		if (err) {
			if(callback) {
				callback(err, null, null);
			}
			return;
        }
        
		conn.query(sql, function(sql_err, sql_result, fields_desic) {
            conn.release();

			if (sql_err) {
				if (callback) {
					callback(sql_err, null, null);
				}
				return;
            }
            
			if (callback) {
				callback(null, sql_result, fields_desic);
			}
		});
	});
}

function get_app_info_by_sha1(sha1, callback){
    var sql = "select * from app_info where sha1_name = \"%s\"";
    var sql_cmd = util.format(sql, sha1);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }
        callback(Response.OK, sql_result);
    });
}

function get_uinfo_by_udid(udid, callback){
    var sql = "select * from device_info where udid = \"%s\"";
    var sql_cmd = util.format(sql, udid);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, sql_result);
    })
}

function get_uinfo_by_id(id, callback){
    var sql = "select * from device_info where id = %d";
    var sql_cmd = util.format(sql, id);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, sql_result);
    })
}

function add_uinfo_by_udid(udid, model, version, callback){
    var sql = "insert into device_info (`model`, `udid`, `version`) values (\"%s\", \"%s\", \"%s\")";
    var sql_cmd = util.format(sql, model, udid, version);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, null);
    })
}

function get_valid_accounts_by_devices(callback){
    var sql_cmd = "select * from account_info where devices != 100 and is_enable != 0 limit 1";
    // var sql_cmd = util.format(sql, udid);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, sql_result);
    })
}

function add_device_count_on_account_info(account, reg_count, callback){
    var sql = "update account_info set devices = devices+%d where account = \"%s\"";
    var sql_cmd = util.format(sql, reg_count, account);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, null);
    })
}

function clear_appinfo_on_device_info(udid, callback){
    var sql = "update device_info set jsonstr = \"''\", time_valid = 0 where udid = \"%s\"";
    var sql_cmd = util.format(sql, udid);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, null);
    })
}

function get_downloadApp_url(tag, callback){
    var sql = "select download_path from resign_ipa_info where ipa_name = \"%s\"";
    var sql_cmd = util.format(sql, tag);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, sql_result);
    })
}

function update_device_count_on_account_info(acc, devices, callback){
    var sql = "update account_info set devices = %d where account = \"%s\"";
    var sql_cmd = util.format(sql, devices, acc);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, null);
    })
}

function add_new_resign_info(tag, path, callback){
    var sql = "insert into resign_ipa_info (`ipa_name`, `download_path`) values (\"%s\", \"%s\")";
    var sql_cmd = util.format(sql, tag, path);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, null);
    })
}

function add_new_to_app_info(info, callback){
    var sql = "insert into app_info (`app_name`, `upload_name`, `version`, `sha1_name`, `md5_name`) values (\"%s\", \"%s\", \"%s\", \"%s\", \"%s\")";
    var sql_cmd = util.format(sql, info.app, info.name, info.ver, info.sha1, info.md5);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, null);
    })
}

function update_app_to_app_info(info, callback){
    var sql = "update app_info set upload_name = \"%s\", version = \"%s\" where md5_name = \"%s\"";
    var sql_cmd = util.format(sql, info.name, info.ver, info.md5);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, null);
    })
}

function update_device_info_by_udid(udid, jsonstr, time_valid, callback){
    var sql = "update device_info set jsonstr = \'%s\', time_valid = %d where udid = \"%s\" ";
    var sql_cmd = util.format(sql, jsonstr, time_valid, udid);
    log.info(sql_cmd);

    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }
    })

    callback(Response.OK, null);
}

function get_timestamp_valid_by_udid(udid, callback){
    var sql = "select time_valid from device_info where udid = \"%s\"";
    var sql_cmd = util.format(sql, udid);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }

        callback(Response.OK, sql_result);
    })
}

function get_account_info_by_acc(acc, callback){
    var sql = "select * from account_info where account = \"%s\"";
    var sql_cmd = util.format(sql, acc);
    log.info(sql_cmd);
    mysql_exec(sql_cmd, function(sql_err, sql_result, field_desc){
        if(sql_err){
            callback(Response.SYS_ERROR, null);
            return;
        }
        callback(Response.OK, sql_result);
    });
}

module.exports = {
    connect: connect_to_server,
    get_app_info_by_sha1: get_app_info_by_sha1,
    get_uinfo_by_udid: get_uinfo_by_udid,
    add_uinfo_by_udid: add_uinfo_by_udid,
    get_valid_accounts_by_devices: get_valid_accounts_by_devices,
    add_device_count_on_account_info: add_device_count_on_account_info,
    clear_appinfo_on_device_info: clear_appinfo_on_device_info,
    get_downloadApp_url: get_downloadApp_url,
    update_device_count_on_account_info: update_device_count_on_account_info,
    add_new_resign_info: add_new_resign_info,
    add_new_to_app_info: add_new_to_app_info,
    update_app_to_app_info: update_app_to_app_info,
    update_device_info_by_udid: update_device_info_by_udid,
    get_timestamp_valid_by_udid: get_timestamp_valid_by_udid,
    get_account_info_by_acc: get_account_info_by_acc,
    get_uinfo_by_id: get_uinfo_by_id,
}