var mysql_supersign = require("../../database/mysql_supersign");
var Response = require("../Response");
var log = require("../../utils/log");

function get_app_info(sha1, ret_func){
    if(!sha1 || sha1 == ""){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.get_app_info_by_sha1(sha1, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            ret_func(Response.DB_SEARCH_EMPTY, null);
            return;
        }

        ret_func(Response.OK, sql_result[0]);
    })
}

function get_uinfo_by_udid(udid, model, version, ret_func){
    mysql_supersign.get_uinfo_by_udid(udid, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            mysql_supersign.add_uinfo_by_udid(udid, model, version, function(status, sql_result){
                if(status != Response.OK){
                    ret_func(status, null);
                    return;
                }

                get_uinfo_by_udid(udid, model, version, ret_func);
            });
        }else{
            ret_func(status, sql_result[0]);
        }
    });
}

function get_uinfo_by_id(id, ret_func){
    if(!id){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.get_uinfo_by_id(id, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            // log.warn("該id 不在device_info內 ...");
            ret_func(Response.DB_SEARCH_EMPTY, null);
            return;
        }else{
            // log.info("id 在device_info內, 返回結果 ...");
            ret_func(status, sql_result[0]);
        }
    })
}

function get_valid_account(ret_func){
    mysql_supersign.get_valid_account(function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            // log.info("no valid account ...");
            ret_func(Response.NO_VALID_ACCOUNT, null);
        }else{
            ret_func(status, sql_result[0]);
        }
    })
}

function get_max_devices_accounts(ret_func){
    mysql_supersign.get_max_devices_accounts(function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            // log.info("no valid account ...");
            ret_func(Response.NO_MAX_DEVICES_ACCOUNT, null);
        }else{
            ret_func(status, sql_result);
        }
    })
}

function add_device_count_on_account_info(account, reg_count, ret_func){
    if(!account || account == "" || !reg_count){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }
    mysql_supersign.add_device_count_on_account_info(account, reg_count, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        ret_func(status, null);
    })
}

function clear_appinfo_on_device_info(udid, ret_func){
    if(!udid || udid == ""){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.clear_appinfo_on_device_info(udid, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        ret_func(status, null);
    })
}

function get_downloadApp_url(tag, ret_func){
    if(!tag || tag == ""){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.get_downloadApp_url(tag, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            ret_func(Response.DB_SEARCH_EMPTY, null);
        }else{
            ret_func(status, sql_result[0]);
        }
    })
}

function update_device_count_on_account_info(acc, devices, ret_func){
    if(!acc || acc == "" || !devices){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.update_device_count_on_account_info(acc, devices, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        ret_func(status, null);
    })
}

function add_new_resign_info(tag, path, ret_func){
    if(!tag || tag == "" || !path || path == ""){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.add_new_resign_info(tag, path, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        ret_func(status, null);
    })
}

function add_new_to_app_info(app_info, ret_func){
    if(!app_info){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.add_new_to_app_info(app_info, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        ret_func(status, null);
    });
}

function update_app_to_app_info(app_info, ret_func){
    if(!app_info){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.update_app_to_app_info(app_info, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        ret_func(status, null);
    });
}

function update_device_info_by_udid(udid, jsonstr, time_valid, need_update_time, ret_func){
    if(udid == null || udid == "" || jsonstr == null || jsonstr == "" || time_valid == null || need_update_time == null){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.update_device_info_by_udid(udid, jsonstr, time_valid, need_update_time, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        ret_func(status, null);
    });
}

function get_timestamp_valid_by_udid(udid, ret_func){
    if(!udid || udid == ""){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }

    mysql_supersign.get_timestamp_valid_by_udid(udid, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            ret_func(Response.DB_SEARCH_EMPTY, null);
        }else{
            ret_func(status, sql_result[0]);
        }
    })
}

function get_account_info_by_acc(acc, ret_func){
    if(!acc || acc == ""){
        ret_func(Response.INVAILD_PARAMS, null);
        return;
    }
    
    mysql_supersign.get_account_info_by_acc(acc, function(status, sql_result){
        if(status != Response.OK){
            ret_func(status, null);
            return;
        }

        if(sql_result.length <= 0){
            ret_func(Response.DB_SEARCH_EMPTY, null);
            return;
        }

        ret_func(Response.OK, sql_result[0]);
    })
}

module.exports = {
    get_app_info: get_app_info,
    get_uinfo_by_udid: get_uinfo_by_udid,
    get_valid_account: get_valid_account,
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
    get_max_devices_accounts: get_max_devices_accounts,
}